import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { RequestMethod } from '../model/HTTPMethod';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  defaultHeader: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-type': 'application/json'
  });  

  constructor(
    private http: HttpClient
  ) { }

  /**
   * GET method that gets information from the API
   * @param path - with the call url
   */
  get(url: string): Observable<any> {
    return null;
  }

  /**
   * POST method that creates a new resource in the API
   * @param path - with the call url
   * @param body - with the proper information
   */
  post(url: string, body: any):  Observable<any>{
    return null;
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('error'); 
      return of(result as T);
    };
  }
}
