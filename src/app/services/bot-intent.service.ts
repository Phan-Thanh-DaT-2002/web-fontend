import { Injectable } from '@angular/core';
import { HttpUtilService } from './http-util.service';

@Injectable({
  providedIn: 'root'
})
export class BotIntentService {

  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/bot-intent";

  constructor(
    private httpUtilService: HttpUtilService
  ) { }

  public async getAllBotIntent(params: any) {
    return await this.httpUtilService.callAPI(this.API_URL + `/get-all`, params).toPromise();
  }
}
