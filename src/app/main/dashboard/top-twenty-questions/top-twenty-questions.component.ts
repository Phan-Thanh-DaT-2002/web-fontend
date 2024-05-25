import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'app/administrators/user-management/user-management.service';
import { DashboardService } from '../dashboard.service';
import { WebSocketService } from 'app/main/websocket/websocket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-top-twenty-questions',
  templateUrl: './top-twenty-questions.component.html',
  styleUrls: ['./top-twenty-questions.component.scss']
})
export class TopTwentyQuestionsComponent implements OnInit {

  public listTrainer = [];

  public listTrainerQuestion = [];

  public top20Question = [
    {id: 1,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 2,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Facebook", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 3,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 4,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 5,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Facebook", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 6,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "App EVNHN", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 7,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "web", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 8,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 9,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "App EVNHN", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 10,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 11,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 12,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 13,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "web", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 14,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 15,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 16,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 17,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "web", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 18,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 19,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
    {id: 20,quesTions: "Cau hoi 1", bot:"bot 1", channelName: "Zalo", dateChat:"30/07/2022", cusName: "Nguyen Van Tien"},
  ]

  constructor(private userService: UserManagementService, private dashboardService: DashboardService, private websocket: WebSocketService) { }

  ngOnInit(): void {
    this.getListTrainer();
    this.getQuestionsNoanswer();
    // this.websocket.connect();
  }

  getListTrainer(){
    let params = {
      method: "GET",
      roleId: 2 //trainer
    };
    this.userService
      .getListUserByRole(params)
      .then((data) => {
        let response = data;
        if (response.code === 0) {
          this.listTrainer = response.content;
        } else {
          this.listTrainer = [];
        }
      })
      .catch((error) => {
        this.listTrainer = [];
      });
  }

  chooseTrainer(rowId, event){
    let isAdded = false;
    this.listTrainerQuestion.forEach(element => {
      if(element.questionId == rowId){
        element.username = event.username;
        isAdded = true;
      }
    });
    if(!isAdded){
      this.listTrainerQuestion.push({questionId: rowId, username: event.username});
    }
  }

  notifyTrainer(rowId, question){
    Swal.showLoading();
    let chosenTrainer = '';
    this.listTrainerQuestion.forEach(element => {
      if(element.questionId == rowId){
        chosenTrainer = element.username;
      }
    });
    if(chosenTrainer === ''){
      Swal.fire({
        icon: "error",
        title: "Bạn phải chọn người Training.",
      }).then((result) => {
      });
    } else{
      Swal.fire({
        title: 'Bạn có chắc chắn muốn chuyển câu hỏi cho người Training?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ml-1'
        }
      }).then((result) => {
        if (result.value) {
          let params = {
            method: 'POST',
            content: {
              questionId: rowId,
              notifyType: 4, //Câu hỏi chưa được xử lý
              username: chosenTrainer,
              questionContent: question
            }
          }
          this.dashboardService.notifyTrainer(params).then((data) => {
            let response = data;
            if (response.code === 0) {
              Swal.close();
              Swal.fire({
                icon: "success",
                title: "Chuyển câu hỏi cho người Training thành công.",
              }).then((result) => {
                this.websocket.sendMessage("Bạn vừa nhận được một câu hỏi cần training, hãy vào phần thông báo để xem chi tiết nhé.", chosenTrainer);
                this.getQuestionsNoanswer();
              });
            } else {
              Swal.close();
              Swal.fire({
                icon: "error",
                title: response.errorMessages,
              });
            }
          })
          .catch((error) => {
            Swal.close();
            Swal.fire({
              icon: "error",
              title: "Không kết nối được tới hệ thống.",
              confirmButtonText: "OK",
            });
          });
        }
      });
    }
  }

  getQuestionsNoanswer(){
    let params = {
      method: "GET"
    };
    Swal.showLoading();
    this.dashboardService
      .getQuestionsNoanswer(params)
      .then((data) => {
        Swal.close();
        let response = data;
        if (response.code === 0) {
          this.top20Question = response.content;
        } else {
          this.top20Question = []
        }
      })
      .catch((error) => {
        Swal.close();
        this.top20Question = []
      });
  }
}
