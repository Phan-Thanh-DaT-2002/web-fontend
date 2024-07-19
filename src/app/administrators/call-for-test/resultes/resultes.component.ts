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
  conn
  ngOnInit(): void {
    this.peer = new Peer();
    const idRemote = document.getElementById('remoteIdVideo');
    console.log("idRemote",idRemote);
    
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
        id: ["", Validators.required],
        score: ["", Validators.required],
        note: ["", Validators.required],
      },
    );
  }

  get AddUserForm(){
    return this.addUserForm.controls;
  }
   
  closeForm() {

    let params = {
      method: "POST",
      content: {
        score : this.addUserForm.value.score,
        note : this.addUserForm.value.note,

      }
    };
    Swal.showLoading();
    this.service
      .addPoint(params)
      .then((data) => {
        Swal.close();
        let response = data;
        if (response.code === 0) {
          Swal.fire({
            icon: "success",
            title: "thành công",
            confirmButtonText: "Đồng ý",
          }).then((result) => {
            // this.initForm();
           this.closeModal.emit();

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
  
}
