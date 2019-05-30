import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  const headers = new HttpHeaders();

  constructor() { }

  post(path: string, args: any): Observable<any> {
    const options = {
      header: this.
    }
  }
}
