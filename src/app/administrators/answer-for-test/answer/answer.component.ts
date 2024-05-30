import { User } from './../../../auth/models/user';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AnswerForTestManagementService } from '../answer-for-test-management.service';
import { Peer } from "peerjs";
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { timeout } from 'rxjs/operators';


interface Question {
  question: any;
}
@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {


  @ViewChild('patientVideo', { static: true }) patientVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('doctorVideo', { static: true }) doctorVideo: ElementRef<HTMLVideoElement>;
  public currentQuestionIndex: number = 0;
  public question: string;
  public currentPage
  public perPage = 10;
  public peer : any;
  questions: Question[] = [
    { question: { 
          que:'Hôm nay là ngày bao nhiêu?',
          ans1: "29/05/2024",
          ans2: "30/05/2024",
          ans3: "31/05/2024",
          ans4: "32/05/2024"
        } 
    },
    { question:  { 
      que:'Mùa này đang là mùa nào?',
      ans1: "Xuân",
      ans2: "Hạ",
      ans3: "Đông",

    }  },
    { question:  { 
      que:'100-7=?',
      ans1: "93",
      ans2: "92",
      ans3: "83",
    } },
    { question:  { 
      que:'Câu hỏi ??',
      ans1: "Câu trả lời 1",
      ans2: "Câu trả lời 2",
      ans3: "Câu trả lời 3",
      ans4: "Câu trả lời 4"
    }  },
    { question:  { 
      que:'Câu hỏi ?',
      ans1: "Câu trả lời 1",
      ans2: "Câu trả lời 2",
      ans3: "Câu trả lời 3",
      ans4: "Câu trả lời 4"
    }  }
  ];
  currentQuestion: Question;
public userId : number;
  constructor(     private service: AnswerForTestManagementService, private modalService: NgbModal,) {  this.currentQuestion = this.questions[this.currentQuestionIndex]; }

  ngOnInit(): void {
    this.peer = new Peer();
    this.userId =   Number(window.localStorage.getItem("currentLoginId"));
    console.log("this.userId ",this.userId);
    this.putPeerJsUser();

    // Receive messages
    this.peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
        if(data == "pre"){
          this.previousQuestion() 
        }     
        
        if(data == "next"){
          this.nextQuestion() 
        }
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });


  }
  async putPeerJsUser(){
    var idPeerjs
    await this.peer.on('open', function (id) {
      
        idPeerjs = id
      console.log('My peer ID is: ' + id);

    });

    setTimeout(() => {
    var content = idPeerjs

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
      }, 3000);

  }
  onSliderChange(event: any) {
    this.currentQuestionIndex = event.value;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }
  
  toggleCamera() {
    // Implement camera toggle functionality
    alert('Toggling camera');
  }

  toggleMic() {
    // Implement mic toggle functionality
    alert('Toggling microphone');
  }

  recordScreen() {
    // Implement screen recording functionality
    alert('Recording screen');
  }

  endCall() {
    // Implement end call functionality
    alert('Ending call');
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  ngAfterViewInit() {
    // Ensure that the video elements are available
    if (!this.patientVideo || !this.doctorVideo) {
      console.error('Video elements are not available');
    }
  }

  swapVideos() {
    const patientVideoElement = this.patientVideo.nativeElement;
    const doctorVideoElement = this.doctorVideo.nativeElement;

    // Swap the srcObject of the videos
    const tempSrc = patientVideoElement.srcObject;
    patientVideoElement.srcObject = doctorVideoElement.srcObject;
    doctorVideoElement.srcObject = tempSrc;

    // Swap sizes
    if (doctorVideoElement.classList.contains('doctor-video')) {
      doctorVideoElement.classList.remove('doctor-video');
      doctorVideoElement.style.position = 'static';
      doctorVideoElement.style.width = '90%';
    } else {
      doctorVideoElement.classList.add('doctor-video');
      doctorVideoElement.style.position = 'absolute';
      doctorVideoElement.style.width = '20%';
    }
  }

    // modal Open Small
    openModalResultsUser( modalSM) {
      this.modalService.open(modalSM, {
        centered: true,
        backdrop: 'static',
        size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
      });
    }

    afterTestResultsUser(){
      this.modalService.dismissAll();
      this.currentPage = 0
      this.searchUser();
    }  

    searchUser(){


      
      // let params = {
      //   method: "GET",
      //   currentPage: this.currentPage, 
      //   perPage: this.perPage
      // };
      // console.log("paramsparams",params);
      
      // Swal.showLoading();
      // this.service
      //   // .searchUser(params)
      //   .then((data) => {
      //     Swal.close();
      //     let response = data;
      
      //   })
      //   .catch((error) => {
      //     Swal.close();
         
      //   });
    }

     

    
}
