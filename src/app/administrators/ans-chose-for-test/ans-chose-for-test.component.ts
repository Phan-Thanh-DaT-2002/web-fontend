import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ans-chose-for-test',
  templateUrl: './ans-chose-for-test.component.html',
  styleUrls: ['./ans-chose-for-test.component.scss']
})
export class AnsChoseForTestComponent implements OnInit {

  constructor( private _router: Router,) { }

  ngOnInit(): void {
  }
  CallForAns(number){
   switch (number){
    case 1 : {
      this._router.navigate(['/admin/user-answer/Answer'])
      .then(() => {
  
        window.location.reload();
      });
      break
    }

    case 2 : {
      this._router.navigate(['/admin/user-answer/Answer2'])
      .then(() => {
  
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
}
