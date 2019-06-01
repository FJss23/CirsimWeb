import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RequestMethod } from '../model/requestMethod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  post(path: string, args: any): Observable<any> {
    const options = {
      header: this.getHeader()º,
      withCredentials: true
    }
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-type': 'application/json'
    });  
  }
}
