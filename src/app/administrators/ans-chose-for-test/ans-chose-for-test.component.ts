import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserManagementService } from '../user-management/user-management.service';

@Component({
  selector: 'app-ans-chose-for-test',
  templateUrl: './ans-chose-for-test.component.html',
  styleUrls: ['./ans-chose-for-test.component.scss']
})
export class AnsChoseForTestComponent implements OnInit {

  constructor( private _router: Router,private service1: UserManagementService) { }

  ngOnInit(): void {
  }
  CallForAns(number){
   switch (number){
    case 1 : {
      this._router.navigate(['/admin/user-answer/Answer'])
      .then(() => {
        this.sendThisUserOnlined();
        window.location.reload();
      });
      break
    }

    case 2 : {
      this._router.navigate(['/admin/user-answer/Answer2'])
      .then(() => {
        this.sendThisUserOnlined();
        window.location.reload();
      });
      break
    }

    case 3 : {
      this._router.navigate(['/admin/user-answer/Answer3'])
      .then(() => {
  
        window.location.reload();
      });
      break
    }
   }
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
}
