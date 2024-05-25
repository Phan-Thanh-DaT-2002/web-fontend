import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import Swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';
import { Console } from 'console';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Output() afterCreateUser = new EventEmitter<string>();

  public contentHeader: object;
  public listRole = [];
  public roleLoading = false;
  public addUserForm: FormGroup;
  public addUserFormSubmitted = false;
  public mergedPwdShow = false;
  public currentLang = this._translateService.currentLang
  constructor(private formBuilder: FormBuilder, private service: UserManagementService, public _translateService: TranslateService) { 
  }

  ngOnInit(): void {
    this.initForm();
    this.getListRole();
  }

  initForm(){
    this.addUserForm = this.formBuilder.group(
      {
        username: ['',[Validators.required]],
        password: ['', [Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
        fullname: ['',[Validators.required]],
        phoneNumber: ['',[Validators.pattern('^(0?)([1-9][2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]],
        email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
        role: [null, Validators.required],
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
  
  getListRole(){
    let params = {
      method: "GET"
    };
    this.service
      .getListRole(params)
      .then((data) => {
        let response = data;
        if (response.code === 0) {
          this.listRole = response.content;
          console.log(this.listRole);
          
        } else {
          Swal.fire({
            icon: "error",
            title: response.errorMessages,
          });
          if(response.code === 2){
            this.listRole = [];
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

  addUser(){
    this.addUserFormSubmitted = true;
    if(this.addUserForm.value.username !== ''){
      this.addUserForm.patchValue({
        username: this.addUserForm.value.username.trim()
      })
    }
    if(this.addUserForm.value.fullname !== ''){
      this.addUserForm.patchValue({
        fullname: this.addUserForm.value.fullname.trim()
      })
    }
    if (this.addUserForm.invalid) {
      return;
    }

    let content= this.addUserForm.value;
    content.roleId = this.addUserForm.value.role.id;

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
            title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.ADD_SUCCESS'),
            confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
          }).then((result) => {
            // this.initForm();
            this.afterCreateUser.emit('completed');
          });
        } else if(response.code ===3){
          Swal.fire({
            icon: "error",
            title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.USERNAME_EXISTED'),
            confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
          }).then((result) => {
          });
        } else if(response.code ===6){
          Swal.fire({
            icon: "error",
            title: this._translateService.instant('MESSAGE.USER_MANAGEMENT.EMAIL_EXISTED'),
            confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
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
            title: this._translateService.instant('MESSAGE.COMMON.NOT_AUTHORIZE'),
            confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
          });
        }else{
          Swal.fire({
            icon: "error",
            title: this._translateService.instant('MESSAGE.COMMON.CONNECT_FAIL'),
            confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
          });
        }
      });

  }

}
