import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { ApiContext } from './api-context';
import { TokenStorage } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService extends ApiContext {

  constructor(
    public http: HttpClient, private tokenStorage: TokenStorage) {
    super();
  }

  public handleError(error) {
    return throwError(error);
  }

  public callAPI(url: string, data: any): Observable<any> {
    let method: any;
    if (data.method) {
      method = data.method;
      delete data.method;
    }

    let responseType: any = 'json';

    let headers: any;
    // truyen authorization len phuong thuc get
    if (data && data.authorizationParams) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + data.authorizationParams });
      headers.append('Content-Type', 'application/json; charset=utf-8');

    } else if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');

    }
    const requestParam = Object.assign({}, data);
    const fullDate = new Date();
    const datePipe = new DatePipe('en-US');
    const currentDate = datePipe.transform(fullDate, 'dd/MM/yyyy');
    let signature = '';
    const param = Object.keys(requestParam);
    for (let i = 0; i < param.length; i++) {
      if (requestParam[param[i]] || requestParam[param[i]] === 0) {
        signature = signature + requestParam[param[i]];
      }
    }
    signature = signature + 'web' + 'EJVsEmpnoqStUZbTSnEwdCpZsoGgIm' + currentDate;
    let params = {};
    let body = {};
    if (method === 'GET') {
      params = requestParam;
    } else {
      body = requestParam.content;
    }
    const ops = {
      body,
      headers,
      params,
      responseType
    };
    return this.http.request(method, url, ops).pipe(catchError(this.handleError)
    );
  }

  public callAPIUploadFilesAndData(url: string, files: File[], param: any): Observable<any> {
    let method = 'POST';
    let responseType: any = 'json';
    let headers: any;
    if (param.method) {
      method = param.method;
      delete param.method;
    }

    // truyen authorization len phuong thuc get
    if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    const requestParam = Object.assign({}, param);
    let body = requestParam;
    const ops = {
      headers,
      body,
      responseType
    };
    const formData: FormData = new FormData();
    if (files) {
      for (var i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
    }
    if (param.content) {
      Object.keys(param.content).forEach(key => formData.append(key, param.content[key]));
    }
    const req = new HttpRequest(method, url, formData, ops);
    return this.http.request(req).pipe(catchError(this.handleError));
  }

  public downloadFile(url: string, fileName: string): void {
    let headers: any;
    if (this.tokenStorage.getTokenStr()) {
      headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenStorage.getTokenStr() });
      headers.append('Content-Type', 'application/json; charset=utf-8');
    }
    this.http.get(this.BASE_URL + url, { headers, responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        console.log(response);
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        document.body.appendChild(downloadLink);
        downloadLink.setAttribute('download', fileName);
        downloadLink.click();
      }
    )
  }
}
