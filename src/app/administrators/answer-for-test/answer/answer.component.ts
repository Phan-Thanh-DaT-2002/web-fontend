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
  @ViewChild('patientVideo', { static: false }) patientVideo: ElementRef;
  // @ViewChild('doctorVideo') doctorVideo: ElementRef;
  // @ViewChild('patientVideo', { static: true }) patientVideo: ElementRef<HTMLVideoElement>;
  // @ViewChild('doctorVideo', { static: true }) doctorVideo: ElementRef<HTMLVideoElement>;
  public currentQuestionIndex: number = 0;
  public question: string;
  public currentPage
  public perPage = 10;
  public peer = new Peer();;
  isCheck = true;

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
  @ViewChild("doctorVideo")  doctorVideo: any;
  currentQuestion: Question;
  public userId : number;
  constructor(     private service: AnswerForTestManagementService, private modalService: NgbModal,) {  this.currentQuestion = this.questions[this.currentQuestionIndex]; }

  ngOnInit(): void {
    this.userId = Number(window.localStorage.getItem("currentLoginId"));
    console.log("this.userId ", this.userId);
    this.putPeerJsUser();
  
    // Answer call
    this.peer.on("call", (call) => {
      this.openStream()
      .then((stream) => {
        debugger
        call.answer(stream); // Answer the call with an A/V stream.
        this.playStream("doctorVideo", stream)
        call.on("stream", (doctorVideo) => {
          this.playStream("doctorVideo", doctorVideo); // Play the remote video stream.
        });
      });
    });


    // let video = this.doctorVideo.nativeElement;
    // var n = <any>navigator;

    // n.getUserMedia =
    //   n.getUserMedia ||
    //   n.webkitGetUserMedia ||
    //   n.mozGetUserMedia ||
    //   n.msGetUserMedia;

    // this.peer.on("call", function(call) {
    //   n.getUserMedia(
    //     { video: true, audio: true },
    //     function(stream) {
    //       call.answer(stream);
    //       call.on("stream", function(remotestream) {
    //         video.src = URL.createObjectURL(remotestream);
    //         video.play();
    //       });
    //     },
    //     function(err) {
    //       console.log("Failed to get stream", err);
    //     }
    //   );
    // });


    // Receive messages
    this.peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
        if (data == "pre") {
          this.previousQuestion();
        }
        if (data == "next") {
          this.nextQuestion();
        }
        if (data == "toggle") {
          this.openVideos(); 
          console.log("send again data");
          
          // conn.on('open', function() {
            conn.send('Hello from B!');
          // });
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
      }, 7000);// thời gian này nó sẽ thay đổi dựa theo tốc độ mạng 3-7s

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

  openVideos() {
    
    const patientVideoElement = this.patientVideo.nativeElement;
    const doctorVideoElement = this.doctorVideo.nativeElement;

    // Swap the srcObject of the videos
    const tempSrc = patientVideoElement.srcObject;
    patientVideoElement.srcObject = doctorVideoElement.srcObject;
    doctorVideoElement.srcObject = tempSrc;

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
      doctorVideoElement.style.width = '90%';
      doctorVideoElement.style.height = '60%';
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

         // run stream local
    async  openStream() {
      const config = { audio: true, video: true };
      return await navigator.mediaDevices.getUserMedia(config);
    }


    // async  openVideoStream() {
    //   const config = { video: true };
    //   return await navigator.mediaDevices.getUserMedia(config);
    // }
    
    // async  openAudioStream() {
    //   const config = { audio: true };
    //   return await navigator.mediaDevices.getUserMedia(config);
    // }

    


     playStream(idVideo, stream) {
      const video = document.getElementById(idVideo) ;
      if (video instanceof HTMLVideoElement) {
        console.log("video", video);
        video.srcObject = stream;
        video.play();
      } else {
        console.log(`Element with id ${idVideo} not found or is not a video element.`);
      }
    }



}
