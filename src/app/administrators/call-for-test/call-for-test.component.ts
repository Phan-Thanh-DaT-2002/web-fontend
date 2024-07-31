import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserManagementService } from '../user-management/user-management.service';
import { Peer } from "peerjs";
import { log } from 'console';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  public currentQuestionIndex: number = 0;
  public question: string;
  public currentPage
  public isCheckSnap = 1
  public otherCamera = 0
  public  perPage = 10
  public  CameraTogge = true;
  public localStream = null;
  public isCameraOn = true;
  public isMicOn = false;
  public now = new Date();
  public imageUrl = 'https://img.icons8.com/?size=200&id=67393&format=png';
  public  imageContainer = document.getElementById('image-container');
// Lấy từng phần của ngày giờ hiện tại
public year = this.now.getFullYear();
public month =  this.now.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
public day =  this.now.getDate();
public hours =  this.now.getHours();
public  minutes =  this.now.getMinutes();
public seconds =  this.now.getSeconds();
public questions: Question[] = [
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
      ans1: `${this.hours-2}  giờ `,
      ans2: `${this.hours-1} giờ`,
      ans3: `${this.hours} giờ`,
      ans4: `${this.hours+1} giờ`
    }  },
    { question:  { 
      id: 3,
      ans: "",
      que:' Một năm thường sẽ có mấy mùa',
      ans1: "1",
      ans2: "3",
      ans3: "2",
      ans4: "4"
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
      que:'Hãy cho biết Việt Nam có giáp biển hay là không?',
      ans1: "Có ",
      ans2: "Không",
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
      que:'1000-7 = bao nhiêu?',
      ans1: "963",
      ans2: "973",
      ans3: "983",
      ans4: "993"
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
      ans2: "67",
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
      ans1: "Tháng 1",//
      ans2: "Tháng 5",
      ans3: "Tháng 6",
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

//  getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
public local_stream;
public screenStream;
 public currentPeer = null
 public screenSharing = false
public userId;
  constructor( private sanitizer: DomSanitizer,    private service: UserManagementService,private modalService: NgbModal,) {  this.currentQuestion = this.questions[this.currentQuestionIndex]; }

  ngOnInit(): void {
    
    // Receive messages
    this.peer.on("connection", (conn) => {
     
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);

        switch(data)
        {
          case "pre" :  this.previousQuestionPatient(); break;
          case "next":  this.nextQuestionPatient(); break;
          case"toggleVideo": 
            if(this.otherCamera == 1) { this.otherCamera =0;  }  else {this.otherCamera =1} break;
          case "1" :  this.selectBtnPatient(1); break;
          case "2" :  this.selectBtnPatient(2); break;
          case "3" :  this.selectBtnPatient(3); break;
          case "4" :  this.selectBtnPatient(4); break;
          case "toggleCameraPatient" :  this.toggleCameraPatient(); break;
        }
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

  toggleCameraPatient(){
    const videoElement = this.patientVideo.nativeElement as HTMLVideoElement;
    if (videoElement.style.display === 'none') {
      videoElement.style.display = 'block';
    } else {
      videoElement.style.display = 'none';
    }
  }


  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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



  onSliderChange(event: any) {
    this.currentQuestionIndex = event.value;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
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
    // if (this.videoTrack) {
    //     // Camera is on, so we need to turn it off
    //     this.videoTrack.enabled = !this.videoTrack.enabled;
    //     console.log(`Camera ${this.videoTrack.enabled ? 'enabled' : 'disabled'}`);
    // } else {
    //     // Camera is off, so we need to turn it on
    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    //         this.videoTrack = stream.getVideoTracks()[0];
    //         this.setLocalStream(stream); // Update the video element with the new stream
    //         console.log('Camera enabled', stream);
    //     } catch (error) {
    //         console.error('Error accessing camera:', error);
    //     }
    // }
}

  async  toggleMic() {
    // if (this.localStream) {
    //   this.localStream.getAudioTracks().forEach(track => track.enabled = !this.isMicOn);
    //   this.isMicOn = !this.isMicOn;
    // } else {
    //   try {
    //     this.localStream = await this.openStream();
    //     this.playStream('doctorVideo', this.localStream);
    //     this.localStream.getAudioTracks().forEach(track => track.enabled = this.isMicOn);
    //     this.isMicOn = true;
    //   } catch (err) {
    //     console.error('Error accessing media devices.', err);
    //   }
    // }
  }

  recordScreen() {
    // Implement screen recording functionality
    this.conn = this.peer.connect(this.idRemote);
    this.conn.on("open", () => {
      this.conn.send("record");
    });
  }

  endCall() {
    // Implement end call functionality
    alert('Ending call');
  }

  nextQuestion() {

    console.log(" this.currentQuestion", this.currentQuestion);

    const buttons = document.querySelectorAll('.question-container button');
    buttons.forEach(button => {
      button.classList.remove('selected');
    });

   
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
  nextQuestionPatient() {

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
    console.log(" this.currentQuestion", this.questions);
    const buttons = document.querySelectorAll('.question-container button');
    buttons.forEach(button => {
      button.classList.remove('selected');
    });
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
  previousQuestionPatient() {
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

}


