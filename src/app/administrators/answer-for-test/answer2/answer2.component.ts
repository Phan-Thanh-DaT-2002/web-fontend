import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Peer from 'peerjs';
import Swal from 'sweetalert2';
import { AnswerForTestManagementService } from '../answer-for-test-management.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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


  public  questions: Question[] = [
    { question:  { 
      id: 4,
      ans: "",
      que:'100-7= bao nhiêu?',
      ans1: `<img src="../../../../assets/images/imageForTest2/6.png" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/imageForTest2/1.png" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/imageForTest2/49.png" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/imageForTest2/42.png" width="150" height="250" alt="">`,
    } },];
  public currentPeer = null;
  public PRE = "DELTA";
  public SUF = "MEET";
  public idPeerjs;
  public CameraTogge = true;
  public local_stream;
  public currentQuestion: Question;
  public userId : number;
  constructor( private service: AnswerForTestManagementService,  private sanitizer: DomSanitizer,) {     this.currentQuestion = this.questions[this.currentQuestionIndex]; }

  ngOnInit(): void {
    this.userId = Number(window.localStorage.getItem("currentLoginId"));
    console.log("this.userId ", this.userId);
    this.putPeerJsUser();

      // Receive messages
      this.peer1.on("connection", (conn) => {
        conn.on("data", (data) => {
          // Will print 'hi!'
          console.log(data);
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
                // case"toggle": this.openVideosDoctor(); break;
                // case"toggleCameraDoctor": this.toggleCameraDoctor(); break;
                // case "1" :  this.selectBtnDoctor(1); break;
                // case "2" :  this.selectBtnDoctor(2); break;
                // case "3" :  this.selectBtnDoctor(3); break;
                // case "4" :  this.selectBtnDoctor(4); break;
                // case "record" :  this.startRecording(); break;
                // case "StopRecord" :  this.stopRecording(); break;
              }}
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
}
