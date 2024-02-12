import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dashboard, Wallet } from '../data/class/dashboard.class';
import { ResponseModel } from '../data/class/generic.class';
import { User } from '../data/class/user.class';
import { StorageConstant } from '../data/constant/constant';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  environment = environment;
  public fullResume?: Map<string, Dashboard>;
  user?: User;
  constructor(private http: HttpClient) {}

  getResume(): Observable<ResponseModel> {
    if (this.user?.mockedUser) {
      return this.http.get<ResponseModel>(environment.getResumeDataUrlMock);
    } else {
      const authToken = localStorage.getItem(StorageConstant.ACCESSTOKEN);
      const headers = new HttpHeaders({ Authorization: authToken! });
      return this.http.get<ResponseModel>(environment.getResumeDataUrl, {
        headers: headers,
      });
    }
  }

  addStats(wallets: Wallet[]): Observable<ResponseModel> {
    const authToken = localStorage.getItem(StorageConstant.ACCESSTOKEN);
    const headers = new HttpHeaders({ Authorization: authToken! });
    if (this.user?.mockedUser) {
      let response: ResponseModel = new ResponseModel();
      response.data = wallets;
      return of(response);
    } else {
      return this.http.post<ResponseModel>(
        environment.addStatsDataUrl,
        wallets,
        {
          headers: headers,
        }
      );
    }
  }
}
