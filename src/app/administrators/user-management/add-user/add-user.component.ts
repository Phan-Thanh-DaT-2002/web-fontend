import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import Swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';
import { Console } from 'console';
import { filter } from 'rxjs/operators';
import {  ViewChild, ViewEncapsulation, DebugElement, HostListener, Injectable, ElementRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from "@angular/router";
import { CoreTranslationService } from '@core/services/translation.service';
import { locale as eng } from 'assets/languages/en';
import { locale as vie } from 'assets/languages/vn';
import { ChangeLanguageService } from "../../../services/change-language.service";
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct, NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Output() afterCreateUser = new EventEmitter<string>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() idDoctor  :any;
  public currentLoginRole;
  public contentHeader: object;
  errorLength:boolean = false;
  public listRole = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'Bác sĩ' },
    { id: 3, label: 'Bệnh nhân' }
  ]; 
  
  public listgender = [
    { id: 1, label: 'Nam' },
    { id: 2, label: 'Nữ' }
  ];
  public roleLoading = false;
  public addUserForm: FormGroup;
  public addUserFormSubmitted = false;
  public mergedPwdShow = false;
  public currentLang = this._translateService.currentLang
  constructor(private formBuilder: FormBuilder, private service: UserManagementService, public _translateService: TranslateService) { 
  }

  ngOnInit(): void {
    this.initForm();
    this.currentLoginRole = localStorage.getItem('currentLoginRole')
    this.idDoctor = window.sessionStorage.getItem("idDoctor");
    
    // this.getListRole();
  }

  initForm(){
    this.addUserForm = this.formBuilder.group(
      {
        username: ['',[Validators.required]],
        password: ['', [Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
        fullName: ['',[Validators.required]],
        phone: ['',[Validators.required,Validators.pattern('^(0?)([1-9][2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]],
        email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
        roles: [null, Validators.required],
        address: ["",],
        dob: ["",],
        gender: [null, ],
      },
    );
  }
  removeSpaces(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
  }

  get AddUserForm(){
    return this.addUserForm.controls;
  }
  
  // getListRole(){
  //   let params = {
  //     method: "GET"
  //   };
  //   this.service
  //     .getListRole(params)
  //     .then((data) => {
  //       let response = data;
  //       if (response.code === 0) {
  //         this.listRole = response.content;
  //         console.log(this.listRole);
          
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: response.errorMessages,
  //         });
  //         if(response.code === 2){
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

  addUser(){
    this.addUserFormSubmitted = true;
    if(this.addUserForm.value.username !== ''){
      this.addUserForm.patchValue({
        username: this.addUserForm.value.username.trim()
      })
    }


    if(this.addUserForm.value.fullName !== ''){
      this.addUserForm.patchValue({
        fullName: this.addUserForm.value.fullName.trim()
      })
    }

    if(this.addUserForm.value.email !== ''){
      this.addUserForm.patchValue({
        email: this.addUserForm.value.email.trim()
      })
    }
    if(this.addUserForm.value.phone !== ''){
      this.addUserForm.patchValue({
        phone: this.addUserForm.value.phone.trim()
      })
    }

    if(this.addUserForm.value.address !== ''){
      this.addUserForm.patchValue({
        address: this.addUserForm.value.address.trim()
      })
    }


    if(this.currentLoginRole == "2") {
          this.addUserForm.patchValue({
      roles: 3
    })
    } 
    console.log("this.currentLoginRole",this.currentLoginRole);
    
    if (this.addUserForm.invalid) {
      for (let name in this.addUserForm.controls) {
        if (this.addUserForm.controls[name].invalid) {
          console.error("error fields: ", this.addUserForm);
        }
      }
      return;
    }
    let content= this.addUserForm.value;
    content.dob ? content.dob= this.formatDateString(content.dob) : "";
    console.log("content.dob",content.dob);
    
     if(this.currentLoginRole == "2")  content.idDoctor = this.idDoctor
     


    content.gender ?   content.gender = this.addUserForm.value.gender.id: null;
    delete content.role;  
    console.log("content",content);

    let params = {
      method: "POST",
      content: content,
    };
    Swal.showLoading();
    this.service
      .addUser(params)
      .then((data) => {
        Swal.close();
        let response = data;
        if (response.code === 0) {
          Swal.fire({
            icon: "success",
            title: "Thêm mới thành công",
            confirmButtonText: "Đồng ý",
          }).then((result) => {
            // this.initForm();
            this.afterCreateUser.emit('completed');
          });
        } else if(response.code ===3){
          Swal.fire({
            icon: "error",
            title: " Tài khoản đã tồn tại",
            confirmButtonText: "Đồng ý",
          }).then((result) => {
          });
        } else if(response.code ===6){
          Swal.fire({
            icon: "error",
            title: "Địa chỉ email đã tồn tại",
            confirmButtonText: "Đồng ý",
          }).then((result) => {
          });
        }
        else {
          Swal.fire({
            icon: "error",
            title: response.errorMessages,
          });
        }
      })
      .catch((error) => {
        Swal.close();
        console.log(error);
        if(error == 'Access is denied'){
          Swal.fire({
            icon: "error",
            title: "Không có quyền truy cập",
            confirmButtonText: "Đồng ý",
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "Lỗi hệ thống",
            confirmButtonText: "Đồng ý",
          });
        }
      });

  }

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
  
    if (inputValue.length < 10) {
    this.errorLength = true;
    }else{
      this.errorLength = false;
    }
  }

  closeForm() {
    this.closeModal.emit();
  }

 formatDateString(dateString) {
    // Tạo đối tượng Date từ chuỗi ngày ban đầu
    const date = new Date(dateString);
    // Lấy các thành phần của ngày
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, cần +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = '00';
    const minutes = '00';
    const seconds = '00';
  
    // Định dạng lại chuỗi ngày theo yêu cầu
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  }

}
