import { Injectable } from '@angular/core';
import { HttpUtilService } from './http-util.service';

@Injectable({
  providedIn: 'root'
})
export class BotActionService {

  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/bot-action-py";

  constructor(
    private httpUtilService: HttpUtilService
  ) { }

  public async getAllApiForApiForm(params: any) {
    return await this.httpUtilService.callAPI(this.API_URL + `/get-all`, params).toPromise();
  }

  
}
