import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/services/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerForTestManagementService {
  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/Results";
  
  private readonly API = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/user-info";


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

}
