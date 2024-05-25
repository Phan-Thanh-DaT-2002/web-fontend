import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-four-bot',
  templateUrl: './top-four-bot.component.html',
  styleUrls: ['./top-four-bot.component.scss']
})
export class TopFourBotComponent implements OnInit {

  public top4Bot = [
    {botName:"bot 1", sessionCount: 250, onlineSession: 5, intentName: "Tra cứu điện", storyName: "Scrip1", zalo: 50, facebook:100, website: 25, app:75},
    {botName:"bot 2", sessionCount: 100, onlineSession: 10, intentName: "Thanh toán tiền điện", storyName: "Scrip1", zalo: 47, facebook:25, website: 16, app:44},
    {botName:"bot 3", sessionCount: 85, onlineSession: 8, intentName: "Tra cứu hóa đơn", storyName: "Scrip1", zalo: 60, facebook:52, website: 17, app:88},
    {botName:"bot 4", sessionCount: 75, onlineSession: 22, intentName: "Hỏi đáp", storyName: "Scrip1", zalo: 52, facebook:45, website: 999, app:888},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
