import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { RequestMethod } from '../model/requestMethod';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(
    private http: HttpClient
  ) { }

  get(path: string, args?: any): Observable<any> {
    const options = {
      header: this.getHeader(),
      withCredentials: true
    }

    return this.http.get(path)
      .pipe(catchError(this.handleError('get method', [])));
  }

  post(path: string, ):  Observable<any>{
    return null;
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-type': 'application/json'
    });  
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}
