import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-five-live-session',
  templateUrl: './top-five-live-session.component.html',
  styleUrls: ['./top-five-live-session.component.scss']
})
export class TopFiveLiveSessionComponent implements OnInit {

  public top5LiveSession = [
    {botName:"bot 1", channelName: "Zalo", cusName: "Nguyen Van Tien"},
    {botName:"bot 1", channelName: "Facebook", cusName: "Nguyen Van Tien"},
    {botName:"bot 1", channelName: "Zalo", cusName: "Nguyen Van Tien"},
    {botName:"bot 1", channelName: "web", cusName: "Nguyen Van Tien"},
    {botName:"bot 1", channelName: "App EVNHN", cusName: "Nguyen Van Tien"},
  ] 

  constructor() { }

  ngOnInit(): void {
  }

}
