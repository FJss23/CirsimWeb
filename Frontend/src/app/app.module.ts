import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { SharedModule } from './model/modules/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import localeES from "@angular/common/locales/es";
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeES, "es");


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AdminModule,
    TeacherModule,
    StudentModule,
    SharedModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
