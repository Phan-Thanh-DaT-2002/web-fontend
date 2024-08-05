import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/services/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerForTestManagementService {
  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/Results";
  
  private readonly API = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/user-info";


  // private mediaRecorder: MediaRecorder;
  // private recordedChunks: Blob[] = [];
  public readonly usernameMaxLength = 100;


  constructor(
    private httpUtilService: HttpUtilService
  ) { }
  public async getListResults(params: any) {
    return await this.httpUtilService.callAPI(this.API_URL , params).toPromise();
  }

  public async putPeerJsUser(params: any) {
    return await this.httpUtilService.callAPI(this.API + "/UpdatePeerJs" , params).toPromise();
  }

  // async startRecording() {
  //   try {
  //     const stream = await (navigator.mediaDevices as any).getDisplayMedia({
  //       video: { mediaSource: 'screen' }
  //     });

  //     this.mediaRecorder = new MediaRecorder(stream);
  //     this.recordedChunks = [];

  //     this.mediaRecorder.ondataavailable = (event) => {
  //       if (event.data.size > 0) {
  //         this.recordedChunks.push(event.data);
  //       }
  //     };

  //     this.mediaRecorder.start();
  //   } catch (err) {
  //     console.error("Error: " + err);
  //   }
  // }

  // stopRecording(): Blob {
  //   this.mediaRecorder.stop();

  //   const blob = new Blob(this.recordedChunks, {
  //     type: 'video/webm'
  //   });

  //   return blob;
  // }


}
