import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserManagementService } from '../user-management/user-management.service';
import { Peer } from "peerjs";

interface Question {
  question: any;
}
@Component({
  selector: 'app-call-for-test',
  templateUrl: './call-for-test.component.html',
  styleUrls: ['./call-for-test.component.scss']
})
export class CallForTestComponent implements OnInit {
  @ViewChild('patientVideo', { static: true }) patientVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('doctorVideo', { static: true }) doctorVideo: ElementRef<HTMLVideoElement>;
  currentQuestionIndex: number = 0;
  question: string;
  currentPage
  perPage = 10
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

  public peer : any;
  public conn;
  public data;
  public idRemote;
  currentQuestion: Question;
public userId;
  constructor(     private service: UserManagementService,private modalService: NgbModal,) {  this.currentQuestion = this.questions[this.currentQuestionIndex]; }

  ngOnInit(): void {
    this.peer = new Peer();
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
    this.userId =window.sessionStorage.getItem("userId" );
console.log("this.userId ",this.userId);
this.getUserDetail();

  }
  async getUserDetail(){
    if(this.userId !== ''){
      let params = {
        method: "GET"
      };
      Swal.showLoading();
      await this.service
        .detailUser(params, this.userId)
        .then((data) => {
          Swal.close();
          let response = data;
          if (response.code === 0) {
            this.data = response.content;
            this.idRemote =this.data.idPeerjs
console.log("this data", this.data);
          } else {
            Swal.fire({
              icon: "error",
              title: response.errorMessages,
            });
          }
        })
        .catch((error) => {
          Swal.close();
        });
    }
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

    // const idRemote = (document.getElementById('remoteIdVideo') as HTMLInputElement).value;
    // console.log("idRemote",idRemote);
    
    this.conn = this.peer.connect(this.idRemote);
    this.conn.on("open", () => {
      this.conn.send("next");
    });
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  previousQuestion() {

    // const idRemote = (document.getElementById('remoteIdVideo') as HTMLInputElement).value;
    // console.log("idRemote",idRemote);
    
    this.conn = this.peer.connect(this.idRemote);
    this.conn.on("open", () => {
      this.conn.send("pre");
    });
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


      
      let params = {
        method: "GET",
        currentPage: this.currentPage, 
        perPage: this.perPage
      };
      console.log("paramsparams",params);
      
      Swal.showLoading();
      this.service
        .searchUser(params)
        .then((data) => {
          Swal.close();
          let response = data;
      
        })
        .catch((error) => {
          Swal.close();
         
        });
    }
    
}
