import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpHeaders, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BannerComponent } from './admin/banner/banner.component';
import { FormsModule } from '@angular/forms';
import { EducationComponent } from './admin/education/education.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProjectComponent } from './admin/project/project.component';
import { ContactComponent } from './admin/contact/contact.component';
import { ExperienceComponent } from './admin/experience/experience.component';
import { InterestComponent } from './admin/interest/interest.component';
import { MessageComponent } from './admin/message/message.component';
import { LoginComponent } from './home/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './_guards/auth-guard';
import { TokenInterceptor } from './_interceptors/token-interceptor';


export function tokenGetter(){
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MainLayoutComponent,
    BannerComponent,
    EducationComponent,
    CategoryComponent,
    ProjectComponent,
    ContactComponent,
    ExperienceComponent,
    InterestComponent,
    MessageComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [BrowserModule,
     AppRoutingModule,
     FormsModule,

  ],
  providers: [

   provideHttpClient(withInterceptorsFromDi()),
              AuthGuard,
              { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {



}
