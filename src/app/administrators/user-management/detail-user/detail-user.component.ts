import { Component, Input, OnInit, Directive } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { UserManagementService } from '../user-management.service';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  [x: string]: any;

  public contentHeader: object;
  public userId;
  public data: any;

  constructor(private router: Router, private service: UserManagementService,  public _translateService: TranslateService) { }

  ngOnInit(): void {
    this.userId = window.localStorage.getItem("userId");
    this.getUserDetail();
  }

  getUserDetail(){
    if(this.userId !== ''){
      let params = {
        method: "GET"
      };
      Swal.showLoading();
      this.service
        .detailUser(params, this.userId)
        .then((data) => {
          Swal.close();
          let response = data;
          if (response.code === 0) {
            this.data = response.content;
            this.rows = response.content["items"];
          } else {
            Swal.fire({
              icon: "error",
              title: response.errorMessages,
            });
          }
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: this._translateService.instant('MESSAGE.COMMON.CONNECT_FAIL'),
            confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
          });
        });
    }
  }

  resetPassword(){
    Swal.fire({
      title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.CONFIRM_RESET_PASSWORD'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
      cancelButtonText: this._translateService.instant('ACTION.CANCEL'),
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result) => {
      if (result.value) {
        let params = {
          method: 'POST', content: { userId : this.userId}
        }
        this.service.resetPassword(params).then((data) => {
          let response = data;
          if (response.code === 0) {
            Swal.fire({
              icon: "success",
              title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.RESET_PASSWORD_SUCCESS'),
              confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
            }).then((result) => {
            });
          } else {
            Swal.fire({
              icon: "error",
              title: response.errorMessages,
            });
          }
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: this._translateService.instant('MESSAGE.COMMON.CONNECT_FAIL'),
            confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
          });
        });
      }
    });
  }

}
