import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Peer from 'peerjs';
import { UserManagementService } from '../user-management/user-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  // public  questions: Question[] = [
  //   { question:  { 
  //     id: 1,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/1.jpg"width="50" height="100" alt="">`,//
    
  //   } },
  
  //   { question:  { 
  //     id: 2,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/6.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/1.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/49.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/42.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 3,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/11.jpg"width="50" height="100" alt="">`,//
    
  //   } },
  
  //   { question:  { 
  //     id: 4,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/26.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/17.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/11.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/19.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 5,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/20.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 6,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/20.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/2.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/5.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/28.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 7,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/31.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 8,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/33.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/3.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/37.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/31.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 9,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/64.jpg"width="50" height="100" alt="">`,//
    
  //   } },
  
  //   { question:  { 
  //     id: 10,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/65.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/64.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/26.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/2.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 11,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/47.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 12,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/48.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/17.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/28.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/47.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 13,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/83.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 14,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/83.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/26.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/42.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/47.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 15,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/42.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 16,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/42.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/28.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/14.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/70.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 17,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/65.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 18,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/51.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/37.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/65.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/79.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 19,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/48.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 20,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/62.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/76.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/46.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/6.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 21,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/45.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 22,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/59.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/73.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/3.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/45.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 23,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/58.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 24,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/72.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/31.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/3.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/58.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 25,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/6.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 26,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/12.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/17.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/6.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/21.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 27,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/32.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 28,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/71.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/27.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/28.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/32.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 29,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/53.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 30,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/53.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/54.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/52.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/55.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 31,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/70.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 32,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/82.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/79.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/70.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/74.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 33,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/36.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 34,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/24.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/13.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/16.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/36.jpg"width="50" height="100" alt="">`,
  //   } },
  //   { question:  { 
  //     id: 35,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/75.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  
  //   { question:  { 
  //     id: 36,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/78.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/80.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/75.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/69.jpg"width="50" height="100" alt="">`,
  //   } },
  
  //   { question:  { 
  //     id: 37,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/83.jpg"width="50" height="100" alt="">`,//
     
  //   } },

  //   { question:  { 
  //     id: 38,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/81.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/71.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/83.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/73.jpg"width="50" height="100" alt="">`,
  //   } },

  //   { question:  { 
  //     id: 39,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/17.jpg"width="50" height="100" alt="">`,//
     
  //   } },

  //   { question:  { 
  //     id: 40,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/12.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/17.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/6.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/48.jpg"width="50" height="100" alt="">`,
  //   } },

  //   { question:  { 
  //     id: 41,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/4.jpg"width="50" height="100" alt="">`,//
     
  //   } },

  //   { question:  { 
  //     id: 42,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/8.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/70.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/4.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/74.jpg"width="50" height="100" alt="">`,
  //   } },

  //   { question:  { 
  //     id: 43,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/13.jpg"width="50" height="100" alt="">`,//
   
  //   } },

  //   { question:  { 
  //     id: 44,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/47.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/13.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/16.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/36.jpg"width="50" height="100" alt="">`,
  //   } },

  //    { question:  { 
  //     id: 45,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/68.jpg"width="50" height="100" alt="">`,//
     
  //   } },

  //   { question:  { 
  //     id: 46,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/83.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/1.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/68.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/76.jpg"width="50" height="100" alt="">`,
  //   } },
  //   { question:  { 
  //     id: 47,
  //     ans: "",
  //     que:'Hãy nhớ cánh cửa sau đây :',
  //     ans1: `<img src="../../../../assets/images/portes/28.jpg"width="50" height="100" alt="">`,//
     
  //   } },
  //   { question:  { 
  //     id: 48,
  //     ans: "",
  //     que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
  //     ans1: `<img src="../../../../assets/images/portes/27.jpg"width="50" height="100" alt="">`,//
  //     ans2: `<img src="../../../../assets/images/portes/29.jpg"width="50" height="100" alt="">`,
  //     ans3: `<img src="../../../../assets/images/portes/28.jpg"width="50" height="100" alt="">`,
  //     ans4: `<img src="../../../../assets/images/portes/67.jpg"width="50" height="100" alt="">`,
  //   } },];
  public  questions: Question[] = [
    { question:  { 
      id: 1,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A1A.jpg" width="150" height="250" alt="">`,//
    
    } },
    { question:  { 
      id: 2,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A2C.jpg" width="150" height="250" alt="">`,//
    
    } },
    
    { question:  { 
      id: 3,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A3B.jpg" width="150" height="250" alt="">`,//
     
    } },
    { question:  { 
      id: 4,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A4B.jpg" width="150" height="250" alt="">`,//
     
    } },
    { question:  { 
      id: 5,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A5A.jpg" width="150" height="250" alt="">`,//
    
    } },
    { question:  { 
      id: 6,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A6D.jpg" width="150" height="250" alt="">`,//
     
    } },
    { question:  { 
      id: 7,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A7D.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 8,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A8D.jpg" width="150" height="250" alt="">`,//
     
    } },
    { question:  { 
      id: 9,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A9A.jpg" width="150" height="250" alt="">`,//
     
    } },
    { question:  { 
      id: 10,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A10D.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 11,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A11C.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 12,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/A12A.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 1,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A1A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A1B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A1C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A1D.jpg" width="150" height="250" alt="">`,
    } },
  
   
  
    { question:  { 
      id: 2,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A2A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A2B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A2C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A2D.jpg" width="150" height="250" alt="">`,
    } },
  
  
    { question:  { 
      id: 3,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A3A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A3B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A3C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A3D.jpg" width="150" height="250" alt="">`,
    } },
  
   
  
    { question:  { 
      id: 4,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A4A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A4B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A4C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A4D.jpg" width="150" height="250" alt="">`,
    } },
  
    
  
    { question:  { 
      id: 5,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A5A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A5B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A5C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A5D.jpg" width="150" height="250" alt="">`,
    } },
  
 
  
    { question:  { 
      id: 6,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A6A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A6B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A6C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A6D.jpg" width="150" height="250" alt="">`,
    } },
  
   
  
    { question:  { 
      id: 7,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A7A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A7B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A7C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A7D.jpg" width="150" height="250" alt="">`,
    } },
  
   
  
    { question:  { 
      id: 8,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A8A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A8B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A8C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A8D.jpg" width="150" height="250" alt="">`,
    } },
  
   
  
    { question:  { 
      id: 9,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A9A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A9B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A9C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A9D.jpg" width="150" height="250" alt="">`,
    } },
  
   
  
    { question:  { 
      id: 10,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A10A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A10B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A10C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A10D.jpg" width="150" height="250" alt="">`,
    } },
  
   
  
    { question:  { 
      id: 11,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A11A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A11B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A11C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A11D.jpg" width="150" height="250" alt="">`,
    } },
  
   
  
    { question:  { 
      id: 12,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/A12A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/A12B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/A12C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/A12D.jpg" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 13,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B1A.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 14,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B2C.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 15,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B3C.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 16,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B4D.jpg" width="150" height="250" alt="">`,//
     
    } },
    { question:  { 
      id: 17,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B5D.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 18,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B6A.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 19,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B7A.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 20,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B8B.jpg" width="150" height="250" alt="">`,//
     
    } },
    { question:  { 
      id: 21,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B9A.jpg" width="150" height="250" alt="">`,//
     
    } },


    { question:  { 
      id: 22,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B10C.jpg" width="150" height="250" alt="">`,//
   
    } },

    { question:  { 
      id: 23,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B11A.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 24,
      ans: "",
      que:'Hãy nhớ cánh cửa sau đây :',
      ans1: `<img src="../../../../assets/images/portes/B12D.jpg" width="150" height="250" alt="">`,//
     
    } },

    { question:  { 
      id: 13,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B1A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B1B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B1C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B1D.jpg" width="150" height="250" alt="">`,
    } },
  
 
  
    { question:  { 
      id: 14,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B2A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B2B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B2C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B2D.jpg" width="150" height="250" alt="">`,
    } },
  
  
  
    { question:  { 
      id: 15,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B3A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B3B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B3C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B3D.jpg" width="150" height="250" alt="">`,
    } },
  
   
  
    { question:  { 
      id: 16,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B4A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B4B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B4C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B4D.jpg" width="150" height="250" alt="">`,
    } },
  
    
  
    { question:  { 
      id: 17,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B5A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B5B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B5C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B5D.jpg" width="150" height="250" alt="">`,
    } },
   
  
    { question:  { 
      id: 18,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B6A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B6B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B6C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B6D.jpg" width="150" height="250" alt="">`,
    } },
  
   

    { question:  { 
      id: 19,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B7A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B7B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B7C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B7D.jpg" width="150" height="250" alt="">`,
    } },

   

    { question:  { 
      id: 20,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B8A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B8B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B8C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B8D.jpg" width="150" height="250" alt="">`,
    } },

   

    { question:  { 
      id: 21,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B9A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B9B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B9C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B9D.jpg" width="150" height="250" alt="">`,
    } },

  

    { question:  { 
      id: 22,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B10A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B10B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B10C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B10D.jpg" width="150" height="250" alt="">`,
    } },

  

    { question:  { 
      id: 23,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B11A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B11B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B11C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B11D.jpg" width="150" height="250" alt="">`,
    } },
  
    { question:  { 
      id: 24,
      ans: "",
      que:'Cánh cửa nào trong số này là cánh cửa tôi đã chỉ cho bạn trước đó?',
      ans1: `<img src="../../../../assets/images/portes/B12A.jpg" width="150" height="250" alt="">`,//
      ans2: `<img src="../../../../assets/images/portes/B12B.jpg" width="150" height="250" alt="">`,
      ans3: `<img src="../../../../assets/images/portes/B12C.jpg" width="150" height="250" alt="">`,
      ans4: `<img src="../../../../assets/images/portes/B12D.jpg" width="150" height="250" alt="">`,
    } },
    { question:  { 
      id: "",
      ans: "",
      que:'Hết',
    } }
  ];
    
  public peer= new Peer();
  public conn;
  public data;
  public idRemote;
  public startTime;
  public endTime ;
  public questCount = 0;
  public currentQuestion: Question;
  public videoTrack = null;

  public PRE = "DELTA"
  public SUF = "MEET"
  public local_stream;
  public screenStream;
  public currentPeer = null
  public screenSharing = false
  public answer
public userId;
  constructor( private service: UserManagementService,private modalService: NgbModal,
    private sanitizer: DomSanitizer,
  ) {  this.currentQuestion = this.questions[this.currentQuestionIndex]; }
  getSanitizedHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
   string_to_array(comma_string) {
    if (typeof comma_string !== 'string') {
      return []; // Trả về mảng rỗng nếu input không phải là chuỗi
    }
    return comma_string.split(',').map(item => item === '' ? '' : Number(item.trim()));
  }
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
          const idPrefix = "answer :"
          const idPrefixEnd = "endAnswer :"
          const dataStr = String(data);
          console.log("dataStr.substring(0, 9):",dataStr.substring(0, 9));
          
          if (dataStr.substring(0, 6) === "answer") {
            this.answer =  this.string_to_array(dataStr.split(idPrefix)[1]);
            // string_to_array(this.answer)
            console.log(" this.answer:", this.answer);
            // this.nextQuestionPatient();

            //kiem tra ket qua phase A
            // var correctAns =[,2,,3,,1,,4,,2,,4,,1,,1,,3,,3,,4,,4,,3,,4,,1,,3,,4,,3,,3,,2,,3,,2,,3,,3]
            var correctAns =[,,,,,,,,,,,,1,3,2,2,1,4,4,4,1,4,3,1,,,,,,,,,,,,,1,3,3,4,4,1,1,2,1,3,1,4]
            console.log(" this.correctAns:", correctAns);
            console.log(" this.correctAns:", correctAns.length);
            const matchingCount = this.countMatchingElements(correctAns,  this.answer);
            // var matchingCount = this.countMatchingElements(correctAns,  correctAns);
            console.log("matchingCount",matchingCount);
            if(matchingCount >= 9){
              this.conn = this.peer.connect(this.idRemote);
              this.conn.on("open", () => {
                this.conn.send("continute");
              });
            }
            else{
              this.conn = this.peer.connect(this.idRemote);
              this.conn.on("open", () => {
                this.conn.send("stop");
              });
            }
            
          }
          else if(dataStr.substring(0, 9) === "endAnswer"){
            console.log("dataStr.split(idPrefixEnd)[1]",dataStr);
            console.log("dataStr.split(idPrefixEnd)[1]",dataStr.split(idPrefixEnd)[1]);
            
            this.answer =  this.string_to_array(dataStr.split(idPrefixEnd)[1]);
            console.log(" this.answer:", this.answer);
            // console.log(" sao k nhay vao luon nay the");
            //kiem tra ket qua phase B
            // var correctAns =[,2,,3,,1,,4,,2,,4,,1,,1,,3,,3,,4,,4,,3,,4,,1,,3,,4,,3,,3,,2,,3,,2,,3,,3]
            var correctAns =[,,,,,,,,,,,,1,3,2,2,1,4,4,4,1,4,3,1,,,,,,,,,,,,,1,3,3,4,4,1,1,2,1,3,1,4]
             console.log(" this.correctAns:", correctAns);
            const matchingCount = this.countMatchingElements(correctAns,  this.answer);
            // var matchingCount = this.countMatchingElements(correctAns,   correctAns);
            localStorage.setItem('matchingCount', `${matchingCount}`);  
            console.log("matchingCount",matchingCount);


          } else{
            switch(data)
            {
              case "pre" :  this.previousQuestionPatient(); break;
              case "next":  this.nextQuestionPatient(); break;
              // case"toggleVideo": 
              //   if(this.otherCamera == 1) { this.otherCamera =0;  }  else {this.otherCamera =1} break;
              case "1" :  this.selectBtnPatient(1); break;
              case "2" :  this.selectBtnPatient(2); break;
              case "3" :  this.selectBtnPatient(3); break;
              case "4" :  this.selectBtnPatient(4); break;
              // case "toggleCameraPatient" :  this.toggleCameraPatient(); break;
            }
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
  // if (arr1.length !== arr2.length) {
  //   throw new Error("Hai mảng phải có cùng độ dài.");
  // }

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
    this.endTime = performance.now();
    const timeTaken = this.endTime - this.startTime;
    localStorage.setItem('timeTaken', `${Math.floor(timeTaken/1000/60)}`);  
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

    previousQuestion() {
      console.log(" this.currentQuestion", this.questions);
      const buttons = document.querySelectorAll('.question-container button');
      buttons.forEach(button => {
        button.classList.remove('selected');
      });
      // const idRemote = (document.getElementById('remoteIdVideo') as HTMLInputElement).value;
      // console.log("idRemote",idRemote);
      
      // this.conn = this.peer.connect(this.idRemote);
      // this.conn.on("open", () => {
      //   this.conn.send("pre");
      // });
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

    console.log(" this.currentQuestion", this.currentQuestion);

    const buttons = document.querySelectorAll('.question-container button');
    buttons.forEach(button => {
      button.classList.remove('selected');
    });

   
    // const idRemote = (document.getElementById('remoteIdVideo') as HTMLInputElement).value;
    // console.log("idRemote",idRemote);
    
    // this.conn = this.peer.connect(this.idRemote);
    // this.conn.on("open", () => {
    //   this.conn.send("next");
    // });


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
  checkScore(): boolean{
    var check = true
// asdasdas
    return check
  }
  nextQuestionPatient() {
// console.log("questCount",this.questCount);
// if(this.questCount >= 22 && this.checkScore())
// {
//   this.conn = this.peer.connect(this.idRemote);
//   this.conn.on("open", () => {
//     this.conn.send("stop");
//   });
// } 
// else{


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
        this.questCount++
      }
// }


  closeModal() {
    this.conn = this.peer.connect(this.idRemote);
    this.conn.on("open", () => {
      this.conn.send("start");
    });
    (document.getElementById('modal') as HTMLElement).style.display = 'none';
    (document.getElementById('overlay') as HTMLElement).style.display = 'none';

   
  }
}
