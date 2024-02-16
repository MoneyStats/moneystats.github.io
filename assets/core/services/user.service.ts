import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Coin, CoinSymbol } from '../data/class/coin';
import { ResponseModel } from '../data/class/generic.class';
import { MockUser, User } from '../data/class/user.class';
import { StorageConstant } from '../data/constant/constant';
import { SwalService } from '../utils/swal.service';
import { DashboardService } from './dashboard.service';
import { StatsService } from './stats.service';
import { WalletService } from './wallet.service';
import { AppService } from './app.service';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  environment = environment;
  public user: User = new User();
  public coinSymbol: string = CoinSymbol.USD;

  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    private walletService: WalletService,
    public swalService: SwalService,
    private router: Router,
    private statsService: StatsService,
    private appService: AppService,
    private cache: CacheService
  ) {}

  setValue() {
    switch (this.user?.settings.currency) {
      case Coin.EUR:
        this.coinSymbol = CoinSymbol.EUR;
        break;
      case Coin.USD:
        this.coinSymbol = CoinSymbol.USD;
        break;
      case Coin.GBP:
        this.coinSymbol = CoinSymbol.GBP;
        break;
      default:
        this.coinSymbol = CoinSymbol.USD;
        break;
    }

    this.dashboardService.coinSymbol = this.coinSymbol;
    this.walletService.coinSymbol = this.coinSymbol;
  }

  setUserGlobally() {
    this.walletService.user = this.user;
    this.dashboardService.user = this.user;
    this.statsService.user = this.user;
    this.appService.user = this.user;
  }

  syncGithubUser(user: string) {
    this.swalService.syncGithubUser(user);
    this.updateGithubData();
  }

  updateGithubUser() {
    this.user.settings.github = this.swalService.githubAccount;
  }

  updateGithubData() {
    this.updateGithubUser();
    if (this.user.settings.github === undefined) {
      setTimeout(() => {
        this.updateGithubData();
      }, 100 * 10);
    } else {
      this.user!.profilePhoto = this.user.settings.github.avatar_url!;
      this.user.settings.githubUser = JSON.stringify(this.user.settings.github);
      this.updateUserData(this.user).subscribe((res) => {
        this.user = res.data;
        this.user.settings.github = JSON.parse(this.user.settings.githubUser!);
      });
    }
  }

  logout() {
    this.cache.clearCache();
    localStorage.removeItem(StorageConstant.ACCESSTOKEN);
    this.router.navigate(['auth/login']);
  }

  register(user: User, invitationCode: string): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(
      environment.registerDataUrl + '?invitationCode=' + invitationCode,
      user
    );
  }

  login(username: string, password: string): Observable<ResponseModel> {
    this.cache.clearCache();
    const url =
      environment.loginDataUrl +
      '?username=' +
      username +
      '&password=' +
      password;
    if (username === MockUser.USERNAME && password === MockUser.PASSWORD) {
      return this.http.get<ResponseModel>(environment.getUserUrl);
    } else {
      return this.http.post<ResponseModel>(url, {});
    }
  }

  forgotPassword(email: string): Observable<ResponseModel> {
    const url = environment.forgotPasswordUrl + '?email=' + email;
    return this.http.post<ResponseModel>(url, {});
  }

  resetPassword(password: string, token: string): Observable<ResponseModel> {
    const url =
      environment.resetPasswordUrl +
      '?password=' +
      password +
      '&token=' +
      token;
    return this.http.post<ResponseModel>(url, {});
  }

  checkLogin(authToken: string): Observable<ResponseModel> {
    if (this.user?.mockedUser) {
      return this.http.get<ResponseModel>(environment.getUserUrl);
    } else {
      const headers = new HttpHeaders({ Authorization: authToken! });
      return this.http.get<ResponseModel>(environment.checkLoginDataUrl, {
        headers: headers,
      });
    }
  }

  updateUserData(user: User): Observable<ResponseModel> {
    this.cache.clearCache();
    const authToken = localStorage.getItem(StorageConstant.ACCESSTOKEN);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authToken!,
    });
    if (this.user?.mockedUser) {
      let response: ResponseModel = new ResponseModel();
      response.data = user;
      return of(response);
    } else {
      return this.http.post<ResponseModel>(
        environment.updateUserDataUrl,
        user,
        {
          headers: headers,
        }
      );
    }
  }

  uploadImage(file: File): Observable<ResponseModel> {
    if (this.user?.mockedUser) {
      let response: ResponseModel = new ResponseModel();
      return of(response);
    } else {
      const authToken = localStorage.getItem(StorageConstant.ACCESSTOKEN);
      const headers = new HttpHeaders({
        Authorization: authToken!,
        'Content-Type': 'multipart/form-data',
      });
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post<ResponseModel>(environment.uploadImage, formData);
    }
  }
}
