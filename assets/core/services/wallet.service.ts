import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoinSymbol } from '../data/class/coin';
import { Dashboard, Stats, Wallet } from '../data/class/dashboard.class';
import { ResponseModel } from '../data/class/generic.class';
import { User } from '../data/class/user.class';
import { StorageConstant } from '../data/constant/constant';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  environment = environment;
  totalBalance?: number;
  public walletActive?: Wallet[];
  public walletDeleted?: Wallet[];
  public coinSymbol?: string;

  //Used for WalletDetails
  public walletDetails: Wallet[] = [];
  public statsList?: Stats[];

  // Used for History
  public walletHistory?: Wallet;

  user?: User;
  constructor(private http: HttpClient) {}

  getWallet(): Observable<ResponseModel> {
    if (this.user?.mockedUser) {
      return this.http.get<ResponseModel>(environment.getWalletDataUrl);
    } else {
      const authToken = localStorage.getItem(StorageConstant.ACCESSTOKEN);
      const headers = new HttpHeaders({ Authorization: authToken! });
      return this.http.get<ResponseModel>(environment.listWalletDataurl, {
        headers: headers,
      });
    }
  }

  addUpdateWallet(wallet: Wallet): Observable<ResponseModel> {
    if (this.user?.mockedUser) {
      let response: ResponseModel = new ResponseModel();
      response.data = wallet;
      return of(response);
    } else {
      const authToken = localStorage.getItem(StorageConstant.ACCESSTOKEN);
      const headers = new HttpHeaders({
        Authorization: authToken!,
      });
      return this.http.post<ResponseModel>(
        environment.addUpdateWalletDataUrl,
        wallet,
        { headers: headers }
      );
    }
  }
}
