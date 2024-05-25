import { HttpUtilService } from './http-util.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/channels";

  constructor(
    private httpUtilService: HttpUtilService
  ) { }

  public async getAllActive(params: any) {
    return await this.httpUtilService.callAPI(this.API_URL + `/get-all-active`, params).toPromise();
  }
}
