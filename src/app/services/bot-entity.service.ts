import { Injectable } from '@angular/core';
import { HttpUtilService } from './http-util.service';

@Injectable({
  providedIn: 'root'
})
export class BotEntityService {

  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/bot-entity";

  constructor(
    private httpUtilService: HttpUtilService
  ) { }

  public async getByIntentCode(params: any) {
    return await this.httpUtilService.callAPI(this.API_URL + `/get-by-intent-code`, params).toPromise();
  }

  public async getEntityForFormInBotStory(params: any) {
    return await this.httpUtilService.callAPI(this.API_URL + `/get-entity-for-form-in-bot-story`, params).toPromise();
  }
}
