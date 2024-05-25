import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-ten-customer',
  templateUrl: './top-ten-customer.component.html',
  styleUrls: ['./top-ten-customer.component.scss']
})
export class TopTenCustomerComponent implements OnInit {

  public top10Customer = [
    {bot:"bot 1", channelName: "Zalo", cusName: "Nguyen Van Tien", amount:"200"},
    {bot:"bot 1", channelName: "Facebook", cusName: "Lionel Messi", amount:"195"},
    {bot:"bot 1", channelName: "Zalo", cusName: "Cristiano Ronaldo", amount:"100"},
    {bot:"bot 1", channelName: "web", cusName: "Luka Modric", amount:"80"},
    {bot:"bot 1", channelName: "Zalo", cusName: "Harry Maguire", amount:"75"},
    {bot:"bot 1", channelName: "Facebook", cusName: "Harry Potter", amount:"60"},
    {bot:"bot 1", channelName: "web", cusName: "Hermione Granger", amount:"58"},
    {bot:"bot 1", channelName: "Zalo", cusName: "Ronal Wesley", amount:"47"},
    {bot:"bot 1", channelName: "App EVNHN", cusName: "Albus Dumberdore", amount:"20"},
    {bot:"bot 1", channelName: "Zalo", cusName: "Batman", amount:"10"},
  ] 

  constructor() { }

  ngOnInit(): void {
  }

}
