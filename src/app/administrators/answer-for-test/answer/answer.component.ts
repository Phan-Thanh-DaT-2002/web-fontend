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
  public peer  ;
  public peer1  = new Peer();
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
  currentPeer = null
  PRE = "DELTA"
 SUF = "MEET"
  idPeerjs
   local_stream;
  @ViewChild("doctorVideo")  doctorVideo: any;
  currentQuestion: Question;
  public userId : number;
  constructor(     private service: AnswerForTestManagementService, private modalService: NgbModal,) {  this.currentQuestion = this.questions[this.currentQuestionIndex]; }

  ngOnInit(): void {
    this.userId = Number(window.localStorage.getItem("currentLoginId"));
    console.log("this.userId ", this.userId);
    this.putPeerJsUser();

    


    // Receive messages
    this.peer1.on("connection", (conn) => {
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
          
          if (conn.open) {
          console.log("send again data");
          conn.send('Hello from B!');
          } else {
            // If connection is not open, add an event listener to send data when it opens
            conn.on("open", () => {
              conn.send('Hello from B!');
            });
          }
        }
      });
  
      conn.on("open", () => {
        conn.send("hello!");
      });
    });
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
      }, 7000);// thời gian này nó sẽ thay đổi dựa theo tốc độ mạng 3-7s

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
  onSliderChange(event: any) {
    this.currentQuestionIndex = event.value;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }
  
  toggleCamera() {
    // Implement camera toggle functionality
    // alert('Toggling camera');
 
      //  this.service.startRecording();
    
  }

  toggleMic() {
    // Implement mic toggle functionality
    // alert('Toggling microphone');
    // const videoBlob = this.service.stopRecording();

    // // Tạo URL để hiển thị video ghi lại
    // const videoURL = URL.createObjectURL(videoBlob);

    // // Hiển thị hoặc tải video
    // const a = document.createElement('a');
    // a.style.display = 'none';
    // a.href = videoURL;
    // a.download = 'recorded-screen.webm';
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(videoURL);
  
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
