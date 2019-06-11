import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { SharedModule } from './global-modules/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HttpErrorInterceptor } from './interceptors/httpError.interceptor';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin/admin.component';
import { StudentComponent } from './student/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    TeacherModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
