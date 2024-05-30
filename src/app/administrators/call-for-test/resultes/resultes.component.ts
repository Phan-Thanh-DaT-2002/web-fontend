import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Peer } from "peerjs";

@Component({
  selector: 'app-resultes',
  templateUrl: './resultes.component.html',
  styleUrls: ['./resultes.component.scss']
})
export class ResultesComponent implements OnInit {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) { }
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
    this.closeModal.emit();
  }
  
}
