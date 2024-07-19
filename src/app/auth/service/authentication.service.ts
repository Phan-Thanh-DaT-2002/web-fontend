import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserManagementService } from '../../../app/administrators/user-management/user-management.service'

import jwtDecode from 'jwt-decode';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage } from 'app/services/token-storage.service';
import { HttpUtilService } from 'app/services/http-util.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;
  private readonly BASE_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base;
  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/menu";

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private service1: UserManagementService,private _http: HttpClient, private _toastrService: ToastrService, private httpUtilService: HttpUtilService, private tokenStorage: TokenStorage) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }
 
  sendThisUserOffline(){
    let params = {
      method: "GET", 
    };
    Swal.showLoading();
    this.service1
      .sendThisUserOffline(params)
      .then((data) => {
        Swal.close();
        let response = data;

        
      })
      .catch((error) => {
       
      });
  }
  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(params) {
    return this._http
      .post<any>(`${this.BASE_URL}/login`, params)
      .pipe(
        map(user => {

          let userx = user;
          // if (user && user.token) {
          if (user.code == 0 || user.code == '0') {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            // console.log(user.code)
            // console.log(user)
            // console.log('finish')
            // Display welcome toast!
            // if(user.header.get("authorization")){
            if (user.content['Bearer']) {
              // var token = user.header.get("authorization");
              var token = user.content['Bearer'];
              // console.warn('token: ' + token);
              var decode = jwtDecode(token);
              this.saveAccessData(decode, token);
              console.log(decode);
              this.currentLoginRole = decode
              window.localStorage.setItem("currentLoginRole", this.currentLoginRole.type);
              window.localStorage.setItem("currentLoginId", this.currentLoginRole.id);
              var currentLoginId = localStorage.getItem('loginId')
              var oldLoginId = localStorage.getItem('oldLoginAccount')

              localStorage.removeItem("menu");
              this.sendThisUserOnlined();
              localStorage.setItem('oldLoginAccount', params.username);

              // this.getMenuActsByRoleId()

              if (localStorage.getItem('menu') && currentLoginId == oldLoginId)
                console.warn('===> Not request GET menu')
              else
                console.warn('===> Request GET menu')

              // Get Menus if login with different LoginId or Cache is cleared
              if ((localStorage.getItem('menu') != 'true')
                || (currentLoginId != oldLoginId)) {
                localStorage.setItem('menu', 'true');
                // this.getMenus({method: "GET"})
              //   .then((data) => {
              //   localStorage.setItem("menu", JSON.stringify(data.content))
              // })
              }
            }
            // setTimeout(() => {
            //   this._toastrService.success(
            //     'You have successfully logged in',
            //     '👋 Welcome ' + '!',
            //     { toastClass: 'toast ngx-toastr', closeButton: true }
            //   );
            // }, 2500);
            // notify
            this.currentUserSubject.next(userx);
          }

          return userx;
        })
      );
  }
  private saveAccessData(accessData: any, token: string) {
    if (accessData) {
      var _token = token;
      const tokenArr = token.split(' ');
      if (tokenArr.length > 1) {
        _token = tokenArr[tokenArr.length - 1];
      }
      console.log(JSON.stringify(accessData))
      this.tokenStorage
        .setLoginType(accessData.iss)
        .setAccessToken(_token)
        .setUserType(accessData.type)
        .setUserRoles(accessData.groups)
        .setUsername(accessData.sub)
        // DatND
        .setUserLoginId(accessData.sub)
      // .setUserListPrivilege(accessData.listPrivilege)
    }
  }


  public currentLoginRole;
  /**
   * User logout
   *
   */
  logout() {
    this.sendThisUserOffline();
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    
    this.currentUserSubject.next(null);
  }

  sendThisUserOnlined(){
    let params = {
      method: "GET", 
    };
    Swal.showLoading();
    this.service1
      .sendThisUserOnlined(params)
      .then((data) => {
        Swal.close();

        
        let response = data;
      })
      .catch((error) => {
       
      });
  }
  //api get all menu
  // public async getMenus(params: any){
  //   return await this.httpUtilService.callAPI(this.API_URL + "/get-menu", params).toPromise();
  // }
}
