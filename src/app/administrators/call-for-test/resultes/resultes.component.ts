import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementService } from 'app/administrators/user-management/user-management.service';
import { Peer } from "peerjs";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultes',
  templateUrl: './resultes.component.html',
  styleUrls: ['./resultes.component.scss']
})
export class ResultesComponent implements OnInit {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder,private service: UserManagementService, private modalService: NgbModal) { }
  public addUserForm: FormGroup;
  public addUserFormSubmitted = false;
  public peer : any;
  public matchingCount
  conn;
  userId;
  ngOnInit(): void {
    this.peer = new Peer();
    const idRemote = document.getElementById('remoteIdVideo');
    this.userId =window.sessionStorage.getItem("userId" );
    this.matchingCount = localStorage.getItem("matchingCount" );

    // console.log("idRemote",idRemote);
    // console.log("this.userId",this.userId);
    console.log("this.this.matchingCount",this.matchingCount);
    
    this.conn = this.peer.connect(idRemote);
    this.conn.on('open', function () {
      // Send messages
      this.conn.send("12345");
    });
    this.initForm();
  }
  initForm(){
    this.addUserForm = this.formBuilder.group(
      {
        score: [this.matchingCount, Validators.required],
        note: ["", Validators.required],
      },
    );
  }

  get AddUserForm(){
    return this.addUserForm.controls;
  }
   
  closeForm() {
    this.addUserFormSubmitted = true;
    // console.log("this.addUserForm.value",this.addUserForm.value);
    if(this.addUserForm.value.score !== ''){
      this.addUserForm.patchValue({
        score: this.addUserForm.value.score.trim()
      })
    }
    if(this.addUserForm.value.note !== ''){
      this.addUserForm.patchValue({
        note: this.addUserForm.value.note.trim()
      })
    }

    if (this.addUserForm.invalid) {
      return;
    }
     var timeTaken = localStorage.getItem('timeTaken')
     
     
    let params = {
      method: "POST",
      content: {
        userId : this.userId,
        score : this.addUserForm.value.score.trim(),
        note : this.addUserForm.value.note.trim(),
        time : timeTaken
      }
    };
    console.log("params",params);
    
    Swal.showLoading();
    this.service
      .addPoint(params)
      .then((data) => {
        Swal.close();
        let response = data;
        if (response.code === 0) {
          Swal.fire({
            icon: "success",
            title: "Đã đánh giá",
            confirmButtonText: "Đồng ý",
          }).then((result) => {
            // this.initForm();
           this.closeModal.emit();
           this.searchUser();

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
      localStorage.removeItem('timeTaken');
      localStorage.removeItem('matchingCount');
  }
  
  searchUser(){


      
    let params = {
      method: "GET",
    };
    console.log("paramsparams",params);
    
    Swal.showLoading();
    this.service
      .searchUser(params)
      .then((data) => {
        Swal.close();
        let response = data;
    
      })
      .catch((error) => {
        Swal.close();
       
      });
  }

}
