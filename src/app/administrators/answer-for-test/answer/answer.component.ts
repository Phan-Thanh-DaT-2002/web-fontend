import { User } from './../../../auth/models/user';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AnswerForTestManagementService } from '../answer-for-test-management.service';
import { Peer } from "peerjs";
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { timeout } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MediaRecorder } from 'extendable-media-recorder';

// declare const MediaRecorder: {
//   prototype: MediaRecorder;
//   new (stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder;
//   isTypeSupported(type: string): boolean;
// };


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
  @ViewChild('doctorVideo', { static: false }) doctorVideo: ElementRef;
  // @ViewChild('doctorVideo') doctorVideo: ElementRef;
  // @ViewChild('patientVideo', { static: true }) patientVideo: ElementRef<HTMLVideoElement>;
  // @ViewChild('doctorVideo', { static: true }) doctorVideo: ElementRef<HTMLVideoElement>;
  public currentQuestionIndex: number = 0;
  public question: string;
  public currentPage
  public perPage = 10;
  public peer  ;
  recordedChunks: Blob[] = [];
  
  public conn;
  public peerJsDoctor;
  public peer1  = new Peer();
  isCheck = true;
  public mediaRecorder;
  navigator = <any>navigator;
  videoTrack = null;
  
// Lấy từng phần của ngày giờ hiện tại
now = new Date();
year = this.now.getFullYear();
month =  this.now.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
day =  this.now.getDate();
hours =  this.now.getHours();
minutes =  this.now.getMinutes();
seconds =  this.now.getSeconds();
isRecording = false;
  questions: Question[] = [
    { question: { 
      id: 1,
      ans: "",
          que:'Hôm nay là ngày bao nhiêu?',
          ans1: `${this.day-2}/${this.month}/${this.year}`,
          ans2: `${this.day-1}/${this.month+1}/${this.year}`,
          ans3: `${this.day}/${this.month}/${this.year}`,
          ans4: `${this.day}/${this.month-1}/${this.year}`
        } 
    },
    { question:  { 
      id: 2,
      ans: "",
      que:'Bây giờ là mấy giờ?',
      ans1: `${this.hours-2}  giờ  `,
      ans2: `${this.hours-1} giờ `,
      ans3: `${this.hours} giờ`,
      ans4: `${this.hours+1} giờ `
    }  },
    { question:  { 
      id: 3,
      ans: "",
      que:'Mùa này đang là mùa nào?',
      ans1: "Xuân",
      ans2: "Hạ",
      ans3: "Đông",
      ans4: "Thu"
    }  },
    { question:  { 
      id: 4,
      ans: "",
      que:'100-7= bao nhiêu?',
      ans1: "93",
      ans2: "92",
      ans3: "83",
    } },
    { question:  { 
      id: 5,
      ans: "",
      que:'Hãy cho biết đây là đất nước nào?',
      ans1: "Hà Nội",
      ans2: "Việt Nam",
      ans3: "Trung Quốc",
      ans4: "Hồ Chí Minh"
    }  },
    { question:  { 
      id: 6,
      ans: "",
      que:'Hãy cho biết đây là tỉnh nào nào?',
      ans1: "Hà Nội",
      ans2: "Hoàng xa",
      ans3: "Tất cả đều không phải",
      ans4: "Phú Thọ"
    }  },
    { question:  { 
      id: 7,
      ans: "",
      que:'Hãy chọn tên đồ vật được nhìn thấy',
      ans1: `<img src="https://img.icons8.com/?size=200&id=67393&format=png" alt="Hình ảnh">`,
      ans2: "Cái tẩy",
      ans3: "Cái bút",
      ans4: "Bàn là"
    }  },
    { question:  { 
      id: 8,
      ans: "",
      que:'Hãy chọn tên đồ vật được nhìn thấy',
      ans1: `<img src="https://img.icons8.com/?size=100&id=jNy3SExnbCAp&format=png" alt="Hình ảnh">`,
      ans2: "Ô tô",
      ans3: "Cái bút",
      ans4: "Xe đạp"
    }  },
    { question:  { 
      id: 9,
      ans: "",
      que:'Hãy chọn tên đồ vật được nhìn thấy?',
      ans1: `<img src="https://img.icons8.com/?size=100&id=115370&format=png" alt="Hình ảnh">`,
      ans2: "Ô tô",
      ans3: "Cái bút",
      ans4: "Ti vi"
    }  },
    { question:  { 
      id: 10,
      ans: "",
      que:'100-7 = bao nhiêu?',
      ans1: "63",
      ans2: "73",
      ans3: "83",
      ans4: "93"
    }  },
    { question:  { 
      id: 11,
      ans: "",
      que:'93-7 = bao nhiêu?',
      ans1: "66",
      ans2: "76",
      ans3: "86",
      ans4: "96"
    }  },
    { question:  { 
      id: 12,
      ans: "",
      que:'86-7 = bao nhiêu?',
      ans1: "69",
      ans2: "79",
      ans3: "89",
      ans4: "99"
    }  },
    { question:  { 
      id: 13,
      ans: "",
      que:'79-5 = bao nhiêu?',
      ans1: "44",
      ans2: "54",
      ans3: "64",
      ans4: "74"
    }  },
    { question:  { 
      id: 14,
      ans: "",
      que:'74-7 = bao nhiêu?',
      ans1: "47",
      ans2: "57",
      ans3: "57",
      ans4: "77"
    }  },
    { question:  { 
      id: 15,
      ans: "",
      que:'Hãy chọn 1 trong 3 đồ vật ban nãy đã nhìn thấy( không quay lại nhìn)',
      ans1: "xe đạp",
      ans2: "xe máy",
      ans3: "bút chì",
      ans4: "tẩy"
    }  },
    { question:  { 
      id: 16,
      ans: "",
      que: 'Quốc gia nào có diện tích lớn nhất thế giới?',
      ans1: "Canada",
      ans2: "Trung Quốc",
      ans3: "Hoa Kỳ",
      ans4: "Nga"
    }  },
    { question:  { 
      id: 17,
      ans: "",
      que: 'Tác giả của tác phẩm "Truyện Kiều" là ai?',
      ans1: "Nguyễn Du",
      ans2: "Nguyễn Trãi",
      ans3: "Nguyễn Bỉnh Khiêm",
      ans4: "Nguyễn Đình Chiểu"
    }  },
    { question:  { 
      id: 18,
      ans: "",
      que: 'Hà Nội là thủ đô của nước nào?',
      ans1: "Việt Nam",
      ans2: "Thái Lan",
      ans3: "Campuchia",
      ans4: "Lào"
    }  },
    { question:  { 
      id: 19,
      ans: "",
      que: 'Lễ hội đền Hùng được tổ chức vào ngày nào?',
      ans1: "10/3 âm lịch",
      ans2: "15/8 âm lịch",
      ans3: "5/5 âm lịch",
      ans4: "12/12 âm lịch"
    }  },
    { question:  { 
      id: 20,
      ans: "",
      que: 'Ngày quốc khánh của Việt Nam là ngày nào?',
      ans1: "2/9",
      ans2: "30/4",
      ans3: "1/1",
      ans4: "15/8"
    }  },
    { question:  {
      id: 21,
      ans: "", 
      que: 'Quốc hoa của Việt Nam là gì?',
      ans1: "Sen",
      ans2: "Hồng",
      ans3: "Cúc",
      ans4: "Mai"
    }  },
    { question:  { 
      id: 22,
      ans: "",
      que: 'Ngày Tết Nguyên Đán của Việt Nam rơi vào tháng nào?',
      ans1: "Tháng 1",
      ans2: "Tháng 2",
      ans3: "Tháng 3",
      ans4: "Tháng 4"
    }  },
    { question:  { 
      id: 23,
      ans: "",
      que: 'Tên gọi cũ của thành phố Hồ Chí Minh là gì?',
      ans1: "Sài Gòn",
      ans2: "Gia Định",
      ans3: "Cần Thơ",
      ans4: "Hải Phòng"
    }  },
    { question:  { 
      id: 24,
      ans: "",
      que: 'Biểu tượng quốc gia của Việt Nam là gì?',
      ans1: "Sao vàng trên nền đỏ",
      ans2: "Cờ đỏ sao vàng",
      ans3: "Chùa Một Cột",
      ans4: "Rồng"
    }  }
  ]; 
  currentPeer = null
  PRE = "DELTA"
 SUF = "MEET"
  idPeerjs
   local_stream;
  // @ViewChild("doctorVideo")  doctorVideo: any;
  currentQuestion: Question;
  public userId : number;
  constructor(  private sanitizer: DomSanitizer,   private service: AnswerForTestManagementService, private modalService: NgbModal,) {  this.currentQuestion = this.questions[this.currentQuestionIndex]; }

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
          // console.log(" this.peerJsDoctor", this.peerJsDoctor);
          
        } 
        else {
            switch(data)
            {
              case "pre" :  this.previousQuestionDoctor(); break;
              case "next":  this.nextQuestionDoctor(); break;
              case"toggle": this.openVideosDoctor(); break;
              case "1" :  this.selectBtn(1); break;
              case "2" :  this.selectBtn(2); break;
              case "3" :  this.selectBtn(3); break;
              case "4" :  this.selectBtn(4); break;
              case "record" :  this.startRecording(); break;
              case "StopRecord" :  this.stopRecording(); break;
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
  
  async  toggleCamera() {
    if (this.videoTrack) {
        // Camera is on, so we need to turn it off
        this.videoTrack.enabled = !this.videoTrack.enabled;
        console.log(`Camera ${this.videoTrack.enabled ? 'enabled' : 'disabled'}`);
    } else {
        // Camera is off, so we need to turn it on
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            this.videoTrack = stream.getVideoTracks()[0];
            this.setLocalStream(stream); // Update the video element with the new stream
            console.log('Camera enabled');
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }
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

  nextQuestionDoctor() {

    console.log(" this.currentQuestion", this.currentQuestion);

    const buttons = document.querySelectorAll('.question-container button');
    buttons.forEach(button => {
      button.classList.remove('selected');
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
    
  }


  nextQuestion() {

    console.log(" this.currentQuestion", this.currentQuestion);

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
    
  }


  previousQuestionDoctor() {
    console.log(" this.currentQuestion", this.questions);
    const buttons = document.querySelectorAll('.question-container button');
    buttons.forEach(button => {
      button.classList.remove('selected');
    });
    // const idRemote = (document.getElementById('remoteIdVideo') as HTMLInputElement).value;
    // console.log("idRemote",idRemote);
    

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



    // startCapture() {
    //   // Lưu ngữ cảnh hiện tại của `this` để sử dụng trong các callback
    //   const self = this;
      
    //   try {
    //     // Yêu cầu quyền truy cập vào màn hình của người dùng
    //     this.navigator.mediaDevices
    //       .getDisplayMedia({
    //         video: true // Chỉ yêu cầu quyền truy cập vào video (màn hình)
    //       })
    //       .then(stream => {
    //         // Khi người dùng cho phép, `stream` chứa luồng video màn hình
    
    //         // Lấy phần tử video từ DOM để hiển thị luồng video màn hình
    //         let video = document.querySelector("video");
    //         video.srcObject = stream; // Gán luồng video vào phần tử video
    
    //         // Tạo một đối tượng MediaRecorder để ghi lại luồng video
    //         this.mediaRecorder = new MediaRecorder(stream);
    //         console.log(MediaRecorder); // In ra đối tượng MediaRecorder để kiểm tra
    //         console.log(this.mediaRecorder); // In ra thể hiện của MediaRecorder để kiểm tra
    
    //         // Định nghĩa hàm xử lý khi có dữ liệu mới từ MediaRecorder
    //         this.mediaRecorder.ondataavailable = event => {
    //           // Tạo một URL blob từ dữ liệu video đã ghi và in ra console
    //           const url = URL.createObjectURL(event.data);
    //           console.log(url);
    //         };
    
    //         // Bắt đầu ghi lại luồng video (tùy chọn, nếu cần)
    //         // this.mediaRecorder.start();
    //       })
    //       .catch(err => {
    //         // Bắt lỗi nếu người dùng từ chối quyền truy cập vào màn hình
    //         console.error("Error accessing display media: " + err);
    //       });
    //   } catch (err) {
    //     // Bắt lỗi nếu có lỗi khác xảy ra trong quá trình yêu cầu quyền truy cập hoặc ghi lại video
    //     console.error("Error: " + err);
    //   }
    // }


    @ViewChild('patientVideo', { static: true }) videoElementRef: ElementRef<HTMLVideoElement>;

    get videoElement(): HTMLVideoElement {
      return this.videoElementRef.nativeElement;
    }
    async startRecording() {
      try {
        // Yêu cầu quyền truy cập vào màn hình của người dùng
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log(stream);
  
        // Gán luồng video vào phần tử video
        this.videoElement.srcObject = stream;
  
        // Khởi tạo MediaRecorder để ghi lại luồng video
        this.mediaRecorder = new MediaRecorder(stream);
        this.recordedChunks = [];
  
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };
  
        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          this.videoElement.srcObject = null; // Stop displaying live stream
          this.videoElement.src = url; // Display recorded video
  
          // Auto-download video
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'recorded-video.webm';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url); // Clean up URL
          document.body.removeChild(a);
        };
  
        // Bắt đầu ghi lại
        this.mediaRecorder.start();
        this.isRecording = true;
      } catch (err) {
        // Bắt lỗi nếu người dùng từ chối quyền truy cập hoặc có lỗi xảy ra
        console.error('Error accessing display media: ', err);
      }
    }
  
    stopRecording() {
      this.isRecording= false;
      if (this.mediaRecorder && this.isRecording) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    }
  
}
