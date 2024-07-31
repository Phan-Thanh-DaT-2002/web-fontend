import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Peer from 'peerjs';
import { UserManagementService } from '../user-management/user-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

interface Question {
  question: any;
}
@Component({
  selector: 'app-call-for-test2',
  templateUrl: './call-for-test2.component.html',
  styleUrls: ['./call-for-test2.component.scss']
})
export class CallForTest2Component implements OnInit {
  @ViewChild('patientVideo', { static: true }) patientVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('doctorVideo', { static: true }) doctorVideo: ElementRef<HTMLVideoElement>;
  public currentQuestionIndex: number = 0;
  public question: string;
  public currentPage
  public isCheckSnap = 1
  public otherCamera = 0
  public perPage = 10
  public CameraTogge = true;
  public localStream = null;
  public  isCameraOn = true;
  public isMicOn = false;
  public now = new Date();
  public questions: Question[] = [
    { question:  { 
      id: 3,
      ans: "",
      que:' Một năm thường sẽ có mấy mùa',
      ans1: "1",
      ans2: "3",
      ans3: "2",
      ans4: "4"
    }  },]

    
  public peer= new Peer();
  public conn;
  public data;
  public idRemote;
  public startTime;
  public endTime ;
  public currentQuestion: Question;
  public videoTrack = null;

  public PRE = "DELTA"
  public SUF = "MEET"
  public local_stream;
  public screenStream;
  public currentPeer = null
  public screenSharing = false
public userId;
  constructor( private service: UserManagementService,private modalService: NgbModal,) {  this.currentQuestion = this.questions[this.currentQuestionIndex]; }

  ngOnInit(): void {
    this.userId =window.sessionStorage.getItem("userId" );
    console.log("this.userId ",this.userId);
    console.log("hihi ");
    this.getUserDetail();

      // Receive messages
      this.peer.on("connection", (conn) => {
     
        conn.on("data", (data) => {
          // Will print 'hi!'
          console.log(data);
  
          switch(data)
          {
            // case "pre" :  this.previousQuestionPatient(); break;
            // case "next":  this.nextQuestionPatient(); break;
            // case"toggleVideo": 
            //   if(this.otherCamera == 1) { this.otherCamera =0;  }  else {this.otherCamera =1} break;
            // case "1" :  this.selectBtnPatient(1); break;
            // case "2" :  this.selectBtnPatient(2); break;
            // case "3" :  this.selectBtnPatient(3); break;
            // case "4" :  this.selectBtnPatient(4); break;
            // case "toggleCameraPatient" :  this.toggleCameraPatient(); break;
          }
        });
        conn.on("open", () => {
          conn.send("hello!");
        });
      });
  
       this.startTime = performance.now();
  
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
                
              this.conn = this.peer.connect(this.idRemote);
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
            this.conn = this.peer.connect(this.idRemote);
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
            this.conn = this.peer.connect(this.idRemote);
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
            this.conn = this.peer.connect(this.idRemote);
            this.conn.on("open", () => {
              this.conn.send("4");
            });
          }
          break;
        } 
      
      }
    console.log("this.currentQuestion",this.currentQuestion);
    
    
  } 
  
  selectBtnPatient(number){
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
                
      

          }
          break;
        } 
        case  2: {
          const selectedButton = document.getElementById("btn2");
          if (selectedButton) {
            selectedButton.classList.add('selected');
            this.currentQuestion.question.ans = 2;
       
          }
          break;
        } 
        case  3: {
          const selectedButton = document.getElementById("btn3");
          if (selectedButton) {
            selectedButton.classList.add('selected');
            this.currentQuestion.question.ans = 3;
      
          }
          break;
        } 
        case  4: {
          const selectedButton = document.getElementById("btn4");
          if (selectedButton) {
            selectedButton.classList.add('selected');
            this.currentQuestion.question.ans = 4;
       
          }
          break;
        } 
      
      }
    console.log("this.currentQuestion",this.currentQuestion);
    
    
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

          //  join zoom 
           var room_id = this.PRE + this.idRemote + this.SUF;
            console.log("room_id",room_id);
            this.peer.on('open', (id) => {
              console.log("Connected with Id: " + id);
              this.conn = this.peer.connect(this.idRemote);
              this.conn.on("open", () => {
                this.conn.send(`id :${id}`);
              });
              navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                  .then((stream) => {
                      this.local_stream = stream;
                      this.setLocalStream(this.local_stream);
                      
                      let call = this.peer.call(room_id, stream);
                      call.on('stream', (stream) => {
                          this.setRemoteStream(stream);
                      });
                      this.currentPeer = call;
                      console.log("end");
                      
                     
                  
                  })
                  .catch((err) => {
                      console.error(err);
                  });
            });


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

  setLocalStream(stream) {
    let video = document.getElementById("doctorVideo");
    
    if (video instanceof HTMLVideoElement) {
      video.srcObject = stream;
    video.muted = true;
    video.play();
    }else {
      console.error(`Element with id ${video} not found or is not a video element.`);
    }
    
}

setRemoteStream(stream) {
  let video = document.getElementById("patientVideo");
  if (video instanceof HTMLVideoElement) {
    video.srcObject = stream;
    video.play();
  }else {
      console.error(`Element with id ${video} not found or is not a video element.`);
    }

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
recordScreen() {
  // Implement screen recording functionality
  this.conn = this.peer.connect(this.idRemote);
  this.conn.on("open", () => {
    this.conn.send("record");
  });
}
countMatchingElements(arr1: number[], arr2: number[]): number {
  if (arr1.length !== arr2.length) {
    throw new Error("Hai mảng phải có cùng độ dài.");
  }

  let count = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      count++;
    }
  }

  return count;
}


   // modal Open Small
   openModalResultsUser( modalSM) {
    var correctAns =[3,3,4,1,2,1,3,4,4,4,3,2,4,2,3,4,1,1,1,1,1,1,1,1]
    var Ans = this.questions.map(q => q.question.ans);
// console.log("Ans",Anns);

    const matchingCount = this.countMatchingElements(correctAns, Ans);
    // console.log("ansssss",  matchingCount);
    
    this.conn = this.peer.connect(this.idRemote);
    this.conn.on("open", () => {
      this.conn.send("StopRecord");
    });
    this.endTime = performance.now();
    const timeTaken = this.endTime - this.startTime;

// console.log(`Thời gian thực hiện: ${Math.floor(timeTaken/1000/60)} milliseconds`);
localStorage.setItem('timeTaken', `${Math.floor(timeTaken/1000/60)}`);      
localStorage.setItem('matchingCount', `${matchingCount}`);      
this.modalService.open(modalSM, {
      centered: true,
      backdrop: 'static',
      size: 'sm' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }

  toggleCameraPatient(){
    const videoElement = this.patientVideo.nativeElement as HTMLVideoElement;
    if (videoElement.style.display === 'none') {
      videoElement.style.display = 'block';
    } else {
      videoElement.style.display = 'none';
    }
  }

  async  toggleCamera() {
    this.CameraTogge = !this.CameraTogge;
        this.conn = this.peer.connect(this.idRemote);
        this.conn.on("open", () => {
          this.conn.send("toggleCameraDoctor");
        });
        const videoElement = this.doctorVideo.nativeElement as HTMLVideoElement;
        if (videoElement.style.display === 'none') {
          videoElement.style.display = 'block';
        } else {
          videoElement.style.display = 'none';
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
}
