import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/services/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/dashboard";

  constructor(
    private httpUtilService: HttpUtilService
  ) { }

  public async getListStoryMaxMonth(params: any){
    return await this.httpUtilService.callAPI(this.API_URL + "/getListStoryMaxMonth", params).toPromise();
  }

  public async getQuestionsNoanswer(params: any){
    return await this.httpUtilService.callAPI(this.API_URL + "/getQuestionsUnsolved", params).toPromise();
  }

  public async notifyTrainer(params: any){
    return await this.httpUtilService.callAPI(this.API_URL + "/save-handler", params).toPromise();
  }

}
