import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { AuthServiceApi } from '../services/api/auth-api.service';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthServiceApi
    ) { }

    intercept(req: HttpRequest<any>, 
        next: HttpHandler): Observable<HttpEvent<any>> {
        
        const currentUser = this.authService.currentUserValue;
        if(currentUser && currentUser.token){
            let token = `Bearer ${currentUser.token}`;
            req = req.clone({ 
                setHeaders: {
                    Authorization: token
                }
            });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if([403,401,0].indexOf(error.status) !== -1){
                    this.authService.logout();
                    error.status === 0 ? sessionStorage.setItem('credentials',`Servidor inactivo`):
                    sessionStorage.setItem('credentials',`Credenciales incorrectas`);
                    location.reload(true);
                } 
                return throwError(error.error.message || error.statusText);
            })
        );
    }
}