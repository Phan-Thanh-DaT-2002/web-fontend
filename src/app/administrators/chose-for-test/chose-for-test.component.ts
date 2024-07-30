import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ListUserComponent} from "../user-management/list-user/list-user.component";

@Component({
  selector: 'app-chose-for-test',
  templateUrl: './chose-for-test.component.html',
  styleUrls: ['./chose-for-test.component.scss']
})
export class ChoseForTestComponent implements OnInit {

  constructor(private modalService: NgbModal, private ListUserComponent: ListUserComponent) { }
  public currentPage = 0;
  userId = window.sessionStorage.getItem("userId");
    ngOnInit(): void {

    console.log("userId",this.userId);
    
  }

  afterTestResultsUser(){
    this.modalService.dismissAll();
    this.currentPage = 0
    this.ListUserComponent.searchUser();
  }  


  CallForTest(userId, modalSM) {

    window.sessionStorage.setItem("userId", userId);
    this.modalService.open(modalSM, {
      centered: true,
      backdrop: 'static',
      size: 'xl' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  } 
}
