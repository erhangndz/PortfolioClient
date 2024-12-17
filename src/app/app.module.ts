import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { BannerComponent } from './admin/banner/banner.component';
import { FormsModule } from '@angular/forms';
import { EducationComponent } from './admin/education/education.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MainLayoutComponent,
    BannerComponent,
    EducationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
