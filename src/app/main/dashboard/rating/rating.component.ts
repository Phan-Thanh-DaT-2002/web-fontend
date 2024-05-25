import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  public rating = [50, 26, 11, 5, 0]

  constructor() { }

  ngOnInit(): void {
  }

}
