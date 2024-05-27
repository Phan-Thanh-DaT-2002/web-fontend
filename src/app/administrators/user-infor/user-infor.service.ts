import { Injectable } from '@angular/core';
import { HttpUtilService } from 'app/services/http-util.service';

@Injectable({
  providedIn: 'root'
})
export class resultsManagementService {
  private readonly API_URL = this.httpUtilService.BASE_URL + this.httpUtilService.api.base + "/Results";


  public readonly usernameMaxLength = 100;
  constructor(
    private httpUtilService: HttpUtilService
  ) { }
  public async getListResults(params: any) {
    return await this.httpUtilService.callAPI(this.API_URL , params).toPromise();
  }

}
