import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Peer from 'peerjs';
import Swal from 'sweetalert2';
import { AnswerForTestManagementService } from '../answer-for-test-management.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
interface Question {
  question: any;
}
@Component({
  selector: 'app-answer2',
  templateUrl: './answer2.component.html',
  styleUrls: ['./answer2.component.scss']
})

export class Answer2Component implements OnInit {
  @ViewChild('patientVideo', { static: false }) patientVideo: ElementRef;
  @ViewChild('doctorVideo', { static: false }) doctorVideo: ElementRef;
  public currentQuestionIndex: number = 0;
  public question: string;
  public currentPage
  public perPage = 10;
  public peer  ;
  public recordedChunks: Blob[] = [];
  public isRecording = false;
  public conn;
  public peerJsDoctor;
  public peer1  = new Peer();
  public isCheck = true;
  public mediaRecorder;
  public navigator = <any>navigator;
  public videoTrack = null;
  public answerArray : any ;
  public countQuest = 0;
  public  questions: Question[] = [
    { question:  { 
      id: 1,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/1.png" width="150" height="250" alt="">`,//
    
    } },
  
    { question:  { 
      id: 1,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/6.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/1.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/49.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/42.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 2,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/11.png" width="150" height="250" alt="">`,//
    
    } },
  
    { question:  { 
      id: 2,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/26.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/17.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/11.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/19.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 3,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/20.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 3,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/20.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/2.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/5.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/28.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 4,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/31.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 4,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/33.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/3.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/37.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/31.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 5,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/64.png" width="150" height="250" alt="">`,//
    
    } },
  
    { question:  { 
      id: 5,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/65.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/64.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/26.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/2.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 6,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/47.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 6,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/48.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/17.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/28.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/47.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 7,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/83.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 7,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/83.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/26.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/42.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/47.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 8,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/42.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 8,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/42.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/28.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/14.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/70.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 9,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/65.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 9,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/51.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/37.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/65.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/79.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 10,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/48.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 10,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/62.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/76.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/46.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/6.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 11,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/45.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 11,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/59.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/73.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/3.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/45.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 12,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/58.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 12,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/72.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/31.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/3.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/58.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 13,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/6.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 13,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/12.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/17.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/6.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/21.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 14,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/32.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 14,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/71.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/27.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/28.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/32.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 15,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/53.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 15,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/53.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/54.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/52.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/55.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 16,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/70.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 16,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/82.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/79.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/70.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/74.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 17,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/36.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 17,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/24.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/13.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/16.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/36.png" width="150" height="250" alt="">`,
    } },
    { question:  { 
      id: 18,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/75.png" width="150" height="250" alt="">`,//
     
    } },
  
    { question:  { 
      id: 18,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/78.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/80.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/75.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/69.png" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 19,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/83.png" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 19,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/81.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/71.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/83.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/73.png" width="150" height="250" alt="">`,
    } },

    { question:  { 
      id: 20,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/17.png" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 20,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/12.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/17.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/6.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/48.png" width="150" height="250" alt="">`,
    } },

    { question:  { 
      id: 21,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/4.png" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 21,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/8.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/70.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/4.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/74.png" width="150" height="250" alt="">`,
    } },

    { question:  { 
      id: 22,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/13.png" width="150" height="250" alt="">`,//
   
    } },

    { question:  { 
      id: 22,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/47.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/13.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/16.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/36.png" width="150" height="250" alt="">`,
    } },

     { question:  { 
      id: 23,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/68.png" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 23,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/83.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/1.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/68.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/76.png" width="150" height="250" alt="">`,
    } },
    { question:  { 
      id: 24,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/imageForTest2/28.png" width="150" height="250" alt="">`,//
     
    } },
    { question:  { 
      id: 24,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/imageForTest2/27.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/29.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/28.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/67.png" width="150" height="250" alt="">`,
    } },
    { question:  { 
      id: "",
      ans: "",
      que:'Hết',
    } }
  ];
  public currentPeer = null;
  public PRE = "DELTA";
  public SUF = "MEET";
  public idPeerjs;
  public CameraTogge = true;
  public local_stream;
  public currentQuestion: Question;
  public userId : number;
  constructor( private service: AnswerForTestManagementService, private _router: Router, private sanitizer: DomSanitizer,) {     this.currentQuestion = this.questions[this.currentQuestionIndex]; }

  ngOnInit(): void {

   
    this.userId = Number(window.localStorage.getItem("currentLoginId"));
    console.log("this.userId ", this.userId);
    this.putPeerJsUser();
   
      // Receive messages
      this.peer1.on("connection", (conn) => {
        conn.on("data", (data) => {
          // Will print 'hi!'
          // console.log(data);
          const idPrefix = "id :"
          const dataStr = String(data);
          
          if (dataStr.substring(0, 2) === "id") {
            this.peerJsDoctor =  dataStr.split(idPrefix)[1];
            console.log(" this.peerJsDoctor", this.peerJsDoctor);
            
          } 
          else {
              switch(data)
              {
                // case "pre" :  this.previousQuestionDoctor(); break;
                // case "next":  this.nextQuestionDoctor(); break;
                case"toggle": this.openVideosDoctor(); break;
                case"start": this.closeModal(); break;
                case"continute": this.startQuiz1(); break;
                case"stop": { 
                    Swal.fire({
                      icon: "error",
                      title: " Bạn không đủ điều kiện để hoàn thành phần kiểm tra này",
                      confirmButtonText: "Đồng ý",
                    }).then((result) => {
                      this._router.navigate(['/admin/user-answer/AnsChoseForTest'])
                      .then(() => {
                  
                        window.location.reload();
                        }); 
                    });
                  break;}
                // case"toggleCameraDoctor": this.toggleCameraDoctor(); break;
                // case "1" :  this.selectBtnDoctor(1); break;
                // case "2" :  this.selectBtnDoctor(2); break;
                // case "3" :  this.selectBtnDoctor(3); break;
                // case "4" :  this.selectBtnDoctor(4); break;
                // case "record" :  this.startRecording(); break;
                // case "StopRecord" :  this.stopRecording(); break;
              }}
        });

      });


  }
  openVideosDoctor() {
    
    const patientVideoElement = this.patientVideo.nativeElement;
    const doctorVideoElement = this.doctorVideo.nativeElement;

    // Swap the srcObject of the videos
    // const tempSrc = patientVideoElement.srcObject;
    // patientVideoElement.srcObject = doctorVideoElement.srcObject;
    // doctorVideoElement.srcObject = tempSrc;

    // Swap sizes

    var leftPanel = document.querySelector('.left-panel') as HTMLDivElement;
    // console.log("leftPanel",leftPanel);

    



    var doctorVideo = document.querySelector('.doctor-video') as HTMLDivElement;
    if(doctorVideo){
    console.log("doctorVideo",doctorVideo);

      // doctorVideo.style.flex = '5';
    }

    if (doctorVideoElement.classList.contains('doctor-video') && this.isCheck == true) {
      if(leftPanel){
        leftPanel.style.flex = '5';
      }
      // doctorVideoElement.style.position = 'static';
      doctorVideoElement.style.width = '100%';
      doctorVideoElement.style.height = '70%';
      this.isCheck = false;
    } else {
      if(leftPanel){
        leftPanel.style.flex = '1';
      }
      doctorVideoElement.style.width = '80%';
      doctorVideoElement.style.height = '40%';
      this.isCheck = true;
    }
  }
  startQuiz() {
    
    for (let index = 0; index < 24; index++) {
      setTimeout(() => {
        this.nextQuestion();
      }, index * 5000); //  thời gian chờ mỗi lần lặp
    
    }
  } 
  startQuiz1() {
    this.countQuest++
    for (let index = 0; index < 25; index++) {
      setTimeout(() => {
        this.nextQuestion();
      }, index * 5000); //  thời gian chờ mỗi lần lặp
    
    }
  }

  async putPeerJsUser(){
    var idPeer
    await this.peer1.on('open', function (id) {
      idPeer = id;
        
      console.log('My peer ID is: ' + id);

    });

    setTimeout(() => {
    var content = idPeer
    this.idPeerjs = idPeer;
console.log("idPeerjs",this.idPeerjs);

      let params = {
        method: "POST",
       content:content
      };
      console.log("paramsparams",params);
      
      Swal.showLoading();
      this.service
        .putPeerJsUser(params,)
        .then((data) => {
          Swal.close();
          let response = data;
      
        })
        .catch((error) => {
          Swal.close();
         
        });

        //create zoom
        var room_id = this.PRE + this.idPeerjs + this.SUF;
        console.log("room_id", room_id);
        this.peer = new Peer(room_id)

        this.peer.on('open', (id) => {
          console.log("Peer Connected with ID: ", id)
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream)  => {

              this.local_stream = stream;
              this.setLocalStream(this.local_stream)

          }, (err) => {
              console.log(err)
          })
          this.peer.on('call', (call) => {
            call.answer(this.local_stream);
            call.on('stream', (stream) => {
              this.setRemoteStream(stream)
            })
            this.currentPeer = call;

            
          
           
        })
      })
    //   this.peer.listAllPeers((peers) => {
    //     console.log('All peers:', peers);
    // });
    // this.startQuiz()
      }, 7000);// thời gian này nó sẽ thay đổi dựa theo tốc độ mạng 3-7s

  }

  setLocalStream(stream) {
    let video = document.getElementById("patientVideo");
    
    if (video instanceof HTMLVideoElement) {
      video.srcObject = stream;
    video.muted = true;
    video.play();
    }else {
      console.error(`Element with id ${video} not found or is not a video element.`);
    }
    
}
getSanitizedHtml(html: string): SafeHtml {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}

setRemoteStream(stream) {
  let video = document.getElementById("doctorVideo");
  if (video instanceof HTMLVideoElement) {
    video.srcObject = stream;
    video.play();
  }else {
      console.error(`Element with id ${video} not found or is not a video element.`);
    }

}


async  toggleCamera() {
  this.CameraTogge = !this.CameraTogge;
  this.conn = this.peer.connect(this.peerJsDoctor);
  this.conn.on("open", () => {
    this.conn.send("toggleCameraPatient");
  });
}
openVideos() {
    
  const patientVideoElement = this.patientVideo.nativeElement;
  const doctorVideoElement = this.doctorVideo.nativeElement;

  // Swap the srcObject of the videos
  // const tempSrc = patientVideoElement.srcObject;
  // patientVideoElement.srcObject = doctorVideoElement.srcObject;
  // doctorVideoElement.srcObject = tempSrc;

  // Swap sizes

  var leftPanel = document.querySelector('.left-panel') as HTMLDivElement;
  // console.log("leftPanel",leftPanel);

  this.conn = this.peer.connect(this.peerJsDoctor);
  this.conn.on("open", () => {
    this.conn.send("toggleVideo");
  });
  
  var doctorVideo = document.querySelector('.doctor-video') as HTMLDivElement;
  if(doctorVideo){
  console.log("doctorVideo",doctorVideo);

    // doctorVideo.style.flex = '5';
  }

  if (doctorVideoElement.classList.contains('doctor-video') && this.isCheck == true) {
    if(leftPanel){
      leftPanel.style.flex = '5';
    }
    // doctorVideoElement.style.position = 'static';
    doctorVideoElement.style.width = '100%';
    doctorVideoElement.style.height = '70%';
    this.isCheck = false;
  } else {
    if(leftPanel){
      leftPanel.style.flex = '1';
    }
    doctorVideoElement.style.width = '80%';
    doctorVideoElement.style.height = '40%';
    this.isCheck = true;
  }
}

previousQuestion() {
  console.log(" this.currentQuestion", this.questions);
  const buttons = document.querySelectorAll('.question-container button');
  buttons.forEach(button => {
    button.classList.remove('selected');
  });
  // const idRemote = (document.getElementById('remoteIdVideo') as HTMLInputElement).value;
  // console.log("idRemote",idRemote);
  
  this.conn = this.peer.connect(this.peerJsDoctor);
  this.conn.on("open", () => {
    this.conn.send("pre");
  });
  if (this.currentQuestionIndex > 0) {
    this.currentQuestionIndex--;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }


  if(this.currentQuestion.question.ans){
    const selectedButton = document.getElementById(`btn${this.currentQuestion.question.ans}`);
  
    console.log("selectedButton",selectedButton);
    
  selectedButton.classList.add('selected');
  }
  else{
    const buttons = document.querySelectorAll('.question-container button');
    buttons.forEach(button => {
      button.classList.remove('selected');
    });
  }
}

nextQuestion() {
  this.conn = this.peer.connect(this.peerJsDoctor);

  if(this.countQuest == 23){
    this.answerArray  = this.questions.map(q => q.question.ans);
    console.log(" this.currentQuestion", this.answerArray);
    // console.log(" this.currentQuestion", this.currentQuestion);

    this.conn = this.peer.connect(this.peerJsDoctor);
    this.conn.on("open", () => {
      this.conn.send(`answer :${this.answerArray}`);
    });
  }else if(this.countQuest == 48){
    this.answerArray  = this.questions.map(q => q.question.ans);
    console.log(" this.currentQuestion", this.answerArray);
    // console.log(" this.currentQuestion", this.currentQuestion);

    this.conn = this.peer.connect(this.peerJsDoctor);
    this.conn.on("open", () => {
      this.conn.send(`endAnswer :${this.answerArray}`);
    });
  }
  
  else {
    const buttons = document.querySelectorAll('.question-container button');
    buttons.forEach(button => {
      button.classList.remove('selected');
    });
  
    this.conn = this.peer.connect(this.peerJsDoctor);
    this.conn.on("open", () => {
      this.conn.send("next");
    });
    // const idRemote = (document.getElementById('remoteIdVideo') as HTMLInputElement).value;
    // console.log("idRemote",idRemote);
  
  
  
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
    
    if(this.currentQuestion.question.ans){
      const selectedButton = document.getElementById(`btn${this.currentQuestion.question.ans}`);
      console.log("this.selectedButton",selectedButton);
   
    selectedButton.classList.add('selected');
    }
    else{
      const buttons = document.querySelectorAll('.question-container button');
      buttons.forEach(button => {
        button.classList.remove('selected');
      });
    }
    this.countQuest++
  }

}


selectBtn(number){
  const buttons = document.querySelectorAll('.question-container button');
  buttons.forEach(button => {
    button.classList.remove('selected');
  });
  switch(number) 
    {
      case  1: {
        const selectedButton = document.getElementById("btn1");
        if (selectedButton) {
          selectedButton.classList.add('selected');
          this.currentQuestion.question.ans = 1;
          this.conn = this.peer.connect(this.peerJsDoctor);
          this.conn.on("open", () => {
            this.conn.send("1");
          });
        }
        break;
      } 
      case  2: {
        const selectedButton = document.getElementById("btn2");
        if (selectedButton) {
          selectedButton.classList.add('selected');
          this.currentQuestion.question.ans = 2;
          this.conn = this.peer.connect(this.peerJsDoctor);
          this.conn.on("open", () => {
            this.conn.send("2");
          });
        }
        break;
      } 
      case  3: {
        const selectedButton = document.getElementById("btn3");
        if (selectedButton) {
          selectedButton.classList.add('selected');
          this.currentQuestion.question.ans = 3;
          this.conn = this.peer.connect(this.peerJsDoctor);
          this.conn.on("open", () => {
            this.conn.send("3");
          });
        }
        break;
      } 
      case  4: {
        const selectedButton = document.getElementById("btn4");
        if (selectedButton) {
          selectedButton.classList.add('selected');
          this.currentQuestion.question.ans = 4;
          this.conn = this.peer.connect(this.peerJsDoctor);
          this.conn.on("open", () => {
            this.conn.send("4");
          });
        }
        break;
      } 
    
    }
  console.log("this.currentQuestion",this.currentQuestion);
 
}

closeModal() {

  (document.getElementById('modal') as HTMLElement).style.display = 'none';
  (document.getElementById('overlay') as HTMLElement).style.display = 'none';
 setTimeout(() => {
  this.startQuiz();

  
}, 5000);
}
showModal() {
  (document.getElementById('overlay') as HTMLElement).style.display = 'flex';
}


}
