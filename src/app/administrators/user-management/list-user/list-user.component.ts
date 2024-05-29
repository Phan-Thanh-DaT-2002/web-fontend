import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, Injectable } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { UserManagementService } from '../user-management.service';
import {    
  NgbDateParserFormatter,
  NgbDateStruct,NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CoreTranslationService } from '@core/services/translation.service';

import { ChangeLanguageService } from 'app/services/change-language.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { log } from 'util';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import { AuthenticationService } from 'app/auth/service';
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';


  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }
  format(date: NgbDateStruct | null): string {
    return date
      ? (date.day < 10 ? '0' + date.day : date.day) + this.DELIMITER + (date.month < 10 ? '0' + date.month : date.month) + this.DELIMITER + date.year
      : '';
  }
}
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class ListUserComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // public listRole = [{id:"1", name: "Admin"}, {id:"2", name: "Normal User"}];
  public keyword = "";
  nulll = "    "
  private stompClient = null;
  disabled = true;
  public temp = [];
  public rows = [];
  public tempData = this.rows;
  public ColumnMode = ColumnMode;
  public currentPage = 0;
  public perPage = 10;
  public totalPage = 0;
  public totalRows = 0;
  public contentHeader: object;
  public listRole = [];
  public idDoctor;
  public username ="";
  public phoneNumber;
  public isInvalidPhoneNumber: boolean = false;
  public isInvalidLength: boolean = false;
  public expandSearch = false;
  public fullName;
  public fromDatePre;
  public toDatePre;
  public score;
  public scoreFrom;
  public scoreTo;
  public statusOnline;
  public email;
  public dateError = false;
  public messages;
  public currentLoginRole;
  public selectedRole = -1;
  public selectedUnit = -1;
  public selected = [];
    public chkBoxSelected = [];
    public SelectionType = SelectionType;
public deleted=true;
public roleAdmin = window.localStorage.getItem("ADM");
public listStatus = [
  { id: 1, label: 'Online' },
  { id: 2, label: 'Offline' }
];
public StatusUser = [
  { id: 1, label: 'Đang hoạt động' },
  { id: 2, label: 'Đã xóa' }
];
public listScore = [
  { id: 1, label: '0 --> 20 điểm' },
  { id: 2, label: '21 --> 40 điểm' },
  { id: 3, label: '41 --> 60 điểm' },
  { id: 4, label: '61 --> 80 điểm' },
  { id: 5, label: '81 --> 100 điểm' }
];

  public currentLang = this._translateService.currentLang;
  public dateFormat = window.localStorage.getItem("dateFormat");
  public proForm: FormGroup;
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
     private service: UserManagementService,
      private modalService: NgbModal,
    private _coreTranslationService: CoreTranslationService, 
    public _translateService: TranslateService,
    private _changeLanguageService: ChangeLanguageService) { 
      this._changeLanguageService.componentMethodCalled$.subscribe(() => {
        this.currentLang = this._translateService.currentLang;
        document.getElementsByClassName("page-count")[0].textContent = this._translateService.instant('LABEL.TOTAL') + this.totalRows;
        this.messages = {
          emptyMessage: this._translateService.instant('LABEL.NO_DATA'),
          totalMessage: this._translateService.instant('LABEL.TOTAL')
        };
      });
  } 

  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Quản lý người dùng',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
        
        ]
      }
    };
    this.proForm = this.formBuilder.group({
      UserInfo: ['']
    })
    this.searchUser();
     this.currentLoginRole = localStorage.getItem('currentLoginRole')
    // console.log("currentLoginRole",this.currentLoginRole);
    // this.getListRole();
    this.connect();
    this.messages = {
      emptyMessage: this._translateService.instant('LABEL.NO_DATA'),
      totalMessage: this._translateService.instant('LABEL.TOTAL')
    };
  }

  convertDate(date: any) {
    return {
      year: date.year,
      month: (date.month < 10 ? "0" + date.month : date.month),
      day: (date.day < 10 ? "0" + date.day : date.day)
    }
  }

  addUser(){
    this.router.navigate(["/admin/user/add-user"]);
  }

  editUser(userId, modalSM){
    window.localStorage.removeItem("userId");
    window.localStorage.setItem("userId", userId);
    this.modalService.open(modalSM, {
      centered: true,
      backdrop: 'static',
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  } 
  callForTest(userId, modalSM){
    window.localStorage.removeItem("userId");
    window.localStorage.setItem("userId", userId);
    this.modalService.open(modalSM, {
      centered: true,
      backdrop: 'static',
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  } 


  deleteUser(id:number){
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result) => {
      if (result.value) {
        let params = {
          method: 'DELETE'
        }
        this.service.deleteUser(params, id).then((data) => {
          let response = data;
          if (response.code === 0) {
            Swal.fire({
              icon: "success",
              title: "Đã xóa thành công",
              confirmButtonText: "Đóng",
            }).then((result) => {
              //load lại trang kết quả
              this.searchUser();
            });
          }  else if (response.code === 45) {
            Swal.fire("Xóa không thành công");
          }else {
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
              // title: this._translateService.instant('MESSAGE.COMMON.CONNECT_FAIL'),
              title: "Chưa được xóa",

              confirmButtonText: "Lỗi kết nối hệ thống",
            });
          });
      }
    });
  }

  detailUser(userId, modalSM){
    window.localStorage.removeItem("userId");
    window.localStorage.setItem("userId", userId);
    this.modalService.open(modalSM, {
      centered: true,
      backdrop: 'static',
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }


  lockUser(id:number){
    Swal.fire({
      title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.LOCK_CONFIRM'),
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
          method: 'PUT'
        }
        this.service.lockUser(params, id).then((data) => {
          let response = data;
          if (response.code === 0) {
            Swal.fire({
              icon: "success",
              title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.LOCK_SUCCESS'),
              confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
            }).then((result) => {
              //load lại trang kết quả
              this.searchUser();
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

  unlockUser(id:number){
    Swal.fire({
      title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.UNLOCK_CONFIRM'),
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
          method: 'PUT'
        }
        this.service.unLockUser(params, id).then((data) => {
          let response = data;
          if (response.code === 0) {
            Swal.fire({
              icon: "success",
              title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.UNLOCK_SUCCESS'),
              confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
            }).then((result) => {
              //load lại trang kết quả
              this.searchUser();
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

  convertDateToString(date: any, toDate: boolean = false) {
    if (date && !toDate) {
      return date.year + "-" + (date.month < 10 ? "0" + date.month : date.month) + "-" + (date.day < 10 ? "0" + date.day : date.day) + "T00:00:00";
    } else if (date && toDate) {
      return date.year + "-" + (date.month < 10 ? "0" + date.month : date.month) + "-" + (date.day < 10 ? "0" + date.day : date.day) + "T23:59:59";
    }
    return "";
  }


  searchUser(){

    var scoreFrom, scoreTo;
 switch (this.score) {
  case 1:{ scoreFrom = 0; scoreTo = 20; break;}
  case 2:{ scoreFrom = 21; scoreTo = 40; break;}
  case 3:{ scoreFrom = 41; scoreTo = 60; break;}
  case 4:{ scoreFrom = 61; scoreTo = 80; break;}
  case 5:{ scoreFrom = 81; scoreTo = 100; break;}
 

 }
    
    let params = {
      method: "GET",
      username: this.username ? this.username :"", 
      phone: this.phoneNumber ?this.phoneNumber:"",
      fullName:  this.fullName ? this.fullName :"", 
      email: this.email ? this.email:"", 
      statusOnline: this.statusOnline ? this.statusOnline.join() : "",
      scoreFrom : scoreFrom ?scoreFrom :"",
      scoreTo : scoreTo ?scoreTo :"",
      fromDatePre: this.convertDateToString(this.fromDatePre), 
      toDatePre: this.convertDateToString(this.toDatePre), 


      currentPage: this.currentPage, 
      perPage: this.perPage
    };
    console.log("paramsparams",params);
    
    Swal.showLoading();
    this.service
      .searchUser(params)
      .then((data) => {
        Swal.close();
        let response = data;
        if (response.code === 0) {
          this.rows = response.content["items"];
          console.log(this.rows);
          
          this.idDoctor = this.rows[0].idDoctor;

          this.totalRows = response.content["total"];
          this.totalPage = Math.ceil(this.totalRows / this.perPage);
          
        } else {
          if (response.code === 2) {
            this.rows = [];
            this.totalRows = 0;
          }
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

  setPage(pageInfo) {
    this.currentPage = pageInfo.offset;
    this.searchUser();
  }

  changePerpage(){
    this.currentPage = 0
    this.searchUser();
  }

  // modal Open Small
  openModalAddUser(modalSM) {
    console.log("this.idDoctor",this.idDoctor);

    window.sessionStorage.setItem("idDoctor", this.idDoctor);
    this.modalService.open(modalSM, {
      centered: true,
      backdrop: 'static',
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }
  
  // editUser(userId, modalSM){
  //   window.localStorage.removeItem("userId");
  //   window.localStorage.setItem("userId", userId);
  //   this.modalService.open(modalSM, {
  //     centered: true,
  //     size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
  //   });
  // }

  // modal Open Small
  openModalTestResultsUser(userId, modalSM) {

    window.sessionStorage.setItem("userId", userId);
    this.modalService.open(modalSM, {
      centered: true,
      backdrop: 'static',
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }


  // modal Open Small
 CallForTest(userId, modalSM) {

    window.sessionStorage.setItem("userId", userId);
    this.modalService.open(modalSM, {
      centered: true,
      backdrop: 'static',
      size: 'xl' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }

  afterTestResultsUser(){
    this.modalService.dismissAll();
    this.currentPage = 0
    this.searchUser();
  }  
  
  afterCreateUser(){
    this.modalService.dismissAll();
    this.currentPage = 0
    this.searchUser();
  }

  afterEditUser(){
    this.modalService.dismissAll();
    this.currentPage = 0
    this.searchUser();
  }

  // getListRole() {
  //   let params = {
  //     method: "GET"
  //   };
  //   this.service
  //     .getListRole(params)
  //     .then((data) => {
  //       let response = data;
  //       if (response.code === 0) {
  //         this.listRole = response.content;
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: response.errorMessages,
  //         });
  //         if (response.code === 2) {
  //           this.listRole = [];
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       Swal.close();
  //       Swal.fire({
  //         icon: "error",
  //         title: this._translateService.instant('MESSAGE.COMMON.CONNECT_FAIL'),
  //         confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
  //       });
  //     });
  // }

  

  onSelectRole(event) {
    if (event != undefined) {
      this.selectedRole = event.id;
    } else{
      this.selectedRole = -1;
    }
    this.searchUser();
  }

  

  onDeleteMulti(){
    Swal.fire({
      title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.DELETE_CONFIRM'),
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
        let arr = [];
        for(let [key, value] of Object.entries(this.selected)){
          arr.push(value['id']);
        }
        let dto = this.proForm.value;
        dto.UserInfo = arr;
        let params = {
          method: 'DELETE', content: dto.UserInfo,
        }
        this.service.deleteMulti(params).then((data) => {
          let response = data;
          if (response.code === 0) {
            Swal.fire({
              icon: "success",
              title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.DELETE_SUCCESS'),
              confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
            }).then((result) => {
              //load lại trang kết quả
              this.searchUser();
            });
          } else if (response.code === 12) {
            Swal.fire(this._translateService.instant('MESSAGE.USER_MANAGEMENT.NOT_DELETED'));
          }else if(response.code === 107){
            Swal.fire({
              icon: "error",
              title: this._translateService.instant('hu'),
              // confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
            });
          } else {
            Swal.fire({
              icon: "error",
              title: this._translateService.instant('MESSAGE.PROGRAM_MANAGEMENT.PROGRAM_CANNOT_DELETE'),
            });
          }
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            icon: "error",
            title: this._translateService.instant('MESSAGE.PROGRAM_MANAGEMENT.PROGRAM_CANNOT_DELETE1'),
            confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
          });
        });
      }
    });
  }
//------------------------------------
//------------------------------------
//------------------------------------
//------------------------------------
//------------------------------------

  onKeyPress(event: KeyboardEvent) {
    const allowedCharacters = /^[a-zA-Z0-9_]*$/;

    if (!allowedCharacters.test(event.key)) {
      event.preventDefault();
    }
  }


  onPhoneNumberInput(event: any): void {
    const inputValue: string = event.target.value;

    // this.isInvalidPhoneNumber = /\D/.test(inputValue);
    if(inputValue){
      this.isInvalidPhoneNumber = !/^((0\d{9})|(84\d{9})|)$/.test(inputValue);  
    // const phoneNumberPattern = /^(84\d{9})|((086|096|097|098|032|033|034|035|036|037|038|039|088|091|094|083|084|085|081|082|089|090|093|070|079|077|076|078|092|056|058|099|059)\d{7})$/;

      // //console.log("this.isInvalidPhoneNumber",this.isInvalidPhoneNumber);
    }
    else this.isInvalidPhoneNumber = false 
}
  
toggleEnhancedSearch() {
  // //console.log(" hoat dong ", this.expandSearch);
  this.expandSearch = !this.expandSearch;
  // this.fullName = "";
  // this.status = null;
  // this.company = null;
  // this.id = null;
  // this.roles = null;
  // this.fromDatePre = null;
  // this.toDatePre = null;
  // this.dateError = null;
  // //console.log("dang hoat dong ", this.expandSearch);
  
//  if(this.rows[2].statusOnline == "2") this.rows[2].statusOnline = 1 
//  else if(this.rows[2].statusOnline == "1") this.rows[2].statusOnline = 2

//  console.log("this.row", this.rows[2]);
  
}
// nhận kết nối từ server để biết được ai đã online
connect()
{
  // nhận kết nối được trả về từ SV khi có người đăng nhâp hay đăng xuất khỏi hệ thống
  const socket = new SockJS('http://localhost:8388/chatbot-endpoint');
  this.stompClient = Stomp.over(socket);

  const _this = this;
  this.stompClient.connect({}, function (frame) {
    _this.stompClient.subscribe ('/topic/log-act/Online', (message) => {
     var data = new TextDecoder().decode(message._binaryBody);
// thay đổi trangj thái online người dùng
      for (let index = 0; index < _this.rows.length; index++) {
        if(_this.rows[index].id == data) _this.rows[index].statusOnline = 1;
        
      }
    });
    _this.stompClient.subscribe ('/topic/log-act/Offline', (message) => {
      var data = new TextDecoder().decode(message._binaryBody);
 // thay đổi trangj thái offline người dùng
       for (let index = 0; index < _this.rows.length; index++) {
         if(_this.rows[index].id == data) _this.rows[index].statusOnline = 2;
         
       }
     });
  });
}

sendThisUserOffline(){
 
  let params = {
    method: "GET", 
  };
  Swal.showLoading();
  this.service
    .sendThisUserOffline(params)
    .then((data) => {
      Swal.close();
      let response = data;
    })
    .catch((error) => {
     
    });
}

parseDateString(dateString: string, path: any): { year: number; month: number; day: number } | null {
  //console.log("dateString",dateString);
  
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[0], 10);

    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      return { year, month, day };
    }
  }
  return null;
}

checkDate() {
  // check fromDate, toDate
  //console.log("fromDate:", this.fromDatePre);

  if (this.fromDatePre && this.toDatePre) {
    let fromDate = new Date(
      this.fromDatePre.year,
      this.fromDatePre.month - 1,
      this.fromDatePre.day
    );
    let toDate = new Date(
      this.toDatePre.year,
      this.toDatePre.month - 1,
      this.toDatePre.day
    );
    if (fromDate > toDate) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
  }
  else{
    this.dateError = false;

  }
}



isValidDate({ year, month, day }) {
  if (month > 12) {
    month = 12;
    }
    let date = new Date(year, month-1, day); // Note: month is zero-based
    //console.log("date",date);
        const maxDay = new Date(year, month, 0).getDate(); // Lấy ngày cuối cùng của tháng
        if (day > maxDay) {
          day = maxDay;
            return  {
              year: year,
              month: month,
              day: maxDay
             }
        }else {
          return {
            year: year,
            month: month,
            day: day
          }
    }
  }


onDateInput(inputValue: string, path: string): void {
  if(path == "fromDatePre"){
    const parsedDate = this.parseDateString(inputValue, path);
    this.fromDatePre = this.isValidDate(parsedDate);
  }
  else if(path == "toDatePre"){
  const parsedDate = this.parseDateString(inputValue, path);
    this.toDatePre = this.isValidDate(parsedDate);}
}


// sự kiện được diễn ra trước khi trình duyệt web bị dỡ bỏ
@HostListener('window:unload', ['$event'])
beforeUnloadHandler(event: Event) {
//   debugger

// this.sendThisUserOffline(); 
// debugger
// localStorage.removeItem('accessToken');
// localStorage.removeItem('currentUser');
}

searchServiceRequest(boolSetPage: boolean = false) {
  //console.log(this.phoneNumber);
  // const pattern = /^(84\d{9})|((086|096|097|098|032|033|034|035|036|037|038|039|088|091|094|083|084|085|081|082|089|090|093|070|079|077|076|078|092|056|058|099|059)\d{7})$/;
  // //console.log(pattern.test('0342611368')); // Kiểm tra với số điện thoại thực
  //console.log("dateError",this.dateError);
  const invalidControls = document.querySelectorAll<HTMLInputElement>('input.is-invalid');

  if(this.isInvalidPhoneNumber || this.isInvalidLength  || invalidControls.length != 0 ){
    return; 
  }
  // if click on search button, keyup.enter
  if (boolSetPage) {
    this.currentPage = 0;
    // this.fromDate = this.fromDatePre;
    // this.toDate = this.toDatePre;
  }
  // this.userGroup = this.id;
  // //console.log("userGroup", this.userGroup);

  this.username = this.username ? this.username.trim() :"";
  this.phoneNumber = this.phoneNumber ? this.phoneNumber.trim():"";
  this.fullName = this.fullName ? this.fullName.trim() :"";
  this.email = this.email ? this.email.trim() :"";

  if (this.username.match('^[a-zA-Z0-9_]*$') || this.username.length === 0) {
    this.totalPage = 0;
    this.searchUser();

    
  } else {
    return;
  }

}



}
