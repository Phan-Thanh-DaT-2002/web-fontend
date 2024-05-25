import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/services/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class GenCodeService {

  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/gen-code";

  constructor(
    private httpUtilService: HttpUtilService
  ) { }

  public async genCode(params: any){
    return await this.httpUtilService.callAPI(this.API_URL , params).toPromise();
  }
}
