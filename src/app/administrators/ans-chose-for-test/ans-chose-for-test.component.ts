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
  CallForAns(){
    this._router.navigate(['/admin/user-answer/Answer'])
    .then(() => {

      window.location.reload();
    });
  }
}
