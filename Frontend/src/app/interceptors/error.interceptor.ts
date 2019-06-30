import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthServiceApi } from '../services/api/auth-api.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthServiceApi
    ) { }

    intercept(req: HttpRequest<any>, 
        next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if([401,403].indexOf(err.status) !== -1){
                //this.authService.logout();
                //location.reload(true);
            }
            console.log(`Error receive from API response`);
            return throwError(err.error.message || err.statusText);
        }));
    }

}