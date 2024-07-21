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
   isCheckSnap = 1
  otherCamera = 0
  perPage = 10
  CameraTogge = false;
  localStream = null;
  isCameraOn = true;
  isMicOn = false;
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
  public startTime;
  public endTime ;
  public currentQuestion: Question;
public userId;
  constructor(     private service: UserManagementService,private modalService: NgbModal,) {  this.currentQuestion = this.questions[this.currentQuestionIndex]; }

  ngOnInit(): void {
    this.peer = new Peer();
    // Receive messages
    this.peer.on("connection", (conn) => {
      // conn.on("data", (data) => {
      //   // Will print 'hi!'
      //   console.log(data);
      //   if(data == "pre"){
      //     this.previousQuestion() 
      //   }     
        
      //   if(data == "next"){
      //     this.nextQuestion() 
      //   }
      // });
      conn.on('data', function(data) {
        console.log('Received', data);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });

     this.startTime = performance.now();


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

            this.openStream()
            .then(stream => {
              this.playStream("doctorVideo", stream);
              const call = this.peer.call(this.idRemote, stream);
              call.on("stream", doctorVideo => this.playStream("doctorVideo", doctorVideo));
            })
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
  
  async  toggleCamera() {
    this.CameraTogge = !this.CameraTogge
    
    if (this.isCameraOn) {
      // Dừng tất cả các video track
      // console.log("this.localStream",this.playStream);
    // console.log("this.isCameraOn",this.isCameraOn);

      
      if (this.playStream) {
        this.isCameraOn = false;
        // this.localStream.getVideoTracks().forEach(track => track.stop());
        const video = document.getElementById('doctorVideo');
        if (video instanceof HTMLVideoElement) {
          video.srcObject = null;
        } else {
          console.error('Element with id localVideo not found or is not a video element.');
        }
        
      }
    } else {
      // Bật camera
      try {
        this.localStream = await this.openStream();
        this.playStream('doctorVideo', this.localStream);
        this.isCameraOn =  true;
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    }

  }

  async  toggleMic() {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => track.enabled = !this.isMicOn);
      this.isMicOn = !this.isMicOn;
    } else {
      try {
        this.localStream = await this.openStream();
        this.playStream('doctorVideo', this.localStream);
        this.localStream.getAudioTracks().forEach(track => track.enabled = this.isMicOn);
        this.isMicOn = true;
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    }
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


  openCamera() {
    this.conn = this.peer.connect(this.idRemote);
    this.conn.on("open", () => {
      this.conn.send("toggle");
      this.otherCamera = 1
    });

  }

  closeCamera() {
    this.conn = this.peer.connect(this.idRemote);
    this.conn.on("open", () => {
      this.conn.send("toggle");
      this.otherCamera = 0
    });

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
    if (doctorVideoElement.classList.contains('doctorVideo') && this.isCheckSnap == 1) {
      doctorVideoElement.classList.remove('doctorVideo');
      // doctorVideoElement.style.position = 'static';
      doctorVideoElement.style.width = '90%';
      doctorVideoElement.style.height = '60%';
      this.isCheckSnap = 0
    }
  }

    // modal Open Small
    openModalResultsUser( modalSM) {
      this.endTime = performance.now();
      const timeTaken = this.endTime - this.startTime;

// console.log(`Thời gian thực hiện: ${Math.floor(timeTaken/1000/60)} milliseconds`);
localStorage.setItem('timeTaken', `${Math.floor(timeTaken/1000/60)}`);      
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
      const video = document.getElementById(idVideo);
      if (video instanceof HTMLVideoElement) {
        console.log("video", video);
        video.srcObject = stream;
        video.play();
      } else {
        console.error(`Element with id ${idVideo} not found or is not a video element.`);
      }
    }


}
