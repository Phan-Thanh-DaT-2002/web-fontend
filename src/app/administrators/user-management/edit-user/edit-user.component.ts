import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import Swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @Output() afterEditUser = new EventEmitter<string>();

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  public currentLoginRole
  public idDoctor
  public contentHeader: object;
  public listStatus = [{id:"0", name: "Deleted"}, {id:"1", name: "Active"}, {id:"2", name: "Locked"}];
  public roleLoading = false;
  public addUserForm: FormGroup;
  public addUserFormSubmitted = false;
  public data;
  public userId;
  public status;
  public mergedPwdShow = false;
  public currentLang = this._translateService.currentLang
public listIdDoctor =[]
  public listRole = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'Bác sĩ' },
    { id: 3, label: 'Bệnh nhân' }
  ]; 
  
  public listGender = [
    { id: 1, label: 'Nam' },
    { id: 2, label: 'Nữ' }
  ];
  constructor(private formBuilder: FormBuilder, private service: UserManagementService,  public _translateService: TranslateService) { }

  ngOnInit(): void {
    this.getIdDoctor();
    this.initForm();
    this.userId = window.localStorage.getItem("userId");
    console.log("userId", this.userId);
    this.currentLoginRole = localStorage.getItem('currentLoginRole')
    // this.idDoctor = window.sessionStorage.getItem("idDoctor");
    
    this.getUserDetail();
  }

  initForm(){
    this.addUserForm = this.formBuilder.group(
      {
        id: ["", Validators.required],
        username: ["", Validators.required],
        // password: ['', [Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
        fullName: ["", Validators.required ],
        phone: ["", Validators.required ],
        idDoctor: [null, ],
        phoneNumber: ['',[Validators.pattern('^(0?)([1-9][2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]],
        email: ["", [Validators.required,  Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
        // roleName: [ "", Validators.required],
        roles: [null, Validators.required],
        address: ["", ],
        gender: [null, ],
        dob: [null, ],
      },
    );
  }

  getIdDoctor(){
    let params = {
      method: "GET",
    };
    this.service
      .getListRole(params)
      .then((data) => {
        let response = data;
        if (response.code === 0) {
          this.listIdDoctor = response.content;
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
        // Swal.fire({
        //   icon: "error",
        //   title: this._translateService.instant('MESSAGE.COMMON.CONNECT_FAIL'),
        //   confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
        // });
      });
  }

  fillForm(){
    this.addUserForm.patchValue(
      {
        id: this.data.id,
        username: this.data.username,
        fullName: this.data.fullName,
        phone: this.data.phone ? this.data.phone :null,
        dob: this.data.dob ? this.formatDateStringToSimple(this.data.dob) :null,
        email: this.data.email,
        status: this.status ,
        roles: this.data.roles ,
        gender : this.data.gender ? this.data.gender :null,
        address : this.data.address ? this.data.address :null,
        idDoctor : this.data.idDoctor ? this.data.idDoctor : null
      },
      
    );

  }

  get AddUserForm(){
    return this.addUserForm.controls;
  }



  async getUserDetail(){
    if(this.userId !== ''){
      let params = {
        method: "GET"
      };
      Swal.showLoading();
      await this.service
        .detailUser(params, this.userId)
        .then((data) => {
          Swal.close();
          let response = data;
          if (response.code === 0) {
            this.data = response.content;
console.log("this data", this.data);


            this.fillForm();
          } else {
            Swal.fire({
              icon: "error",
              title: response.errorMessages,
            });
          }
        })
        .catch((error) => {
          Swal.close();
          // Swal.fire({
          //   icon: "error",
          //   title: this._translateService.instant('MESSAGE.COMMON.CONNECT_FAIL'),
          //   confirmButtonText: this._translateService.instant('ACTION.ACCEPT'),
          // });
        });
    }
  }

   formatDateStringToSimple(dateTimeString) {
    // Tạo đối tượng Date từ chuỗi ngày giờ ban đầu
    const date = new Date(dateTimeString);
  
    // Lấy các thành phần của ngày
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, cần +1
    const day = String(date.getDate()).padStart(2, '0');
  
    // Định dạng lại chuỗi ngày theo yêu cầu
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
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
  editUser(){
    this.addUserFormSubmitted = true;

    if(this.addUserForm.value.fullName !== ''){
      this.addUserForm.patchValue({
        fullName: this.addUserForm.value.fullName?.trim()
      })
    }
    console.log("this.addUserForm.", this.addUserForm);

    if (this.addUserForm.invalid) {
      return;
    }

    let content = this.addUserForm.value;
    content.dob ? content.dob= this.formatDateString(content.dob) : "";

    // content.roleId = this.addUserForm.value.role.form_id;
    // this.roleId=content.roleId;

    let params = {
      method: "PUT",
      content: content
    };
    Swal.showLoading();
    this.service
      .editUser(params)
      .then((data) => {
        Swal.close();
        let response = data;
        if (response.code === 0) {
          Swal.fire({
            icon: "success",
            title: "Câp nhật thành công",
            confirmButtonText: "Đồng ý",
          }).then((result) => {
            this.afterEditUser.emit('completed');
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
          title: "Cập nhật thất bại",
          confirmButtonText: "Đồng ý",
        });
      });

  }

  resetForm(){
    this.fillForm()
  }

  
  closeForm() {
    this.closeModal.emit();
  }
  


}
