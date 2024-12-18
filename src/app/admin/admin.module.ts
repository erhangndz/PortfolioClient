import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BannerComponent } from './banner/banner.component';
import { AdminComponent } from './admin.component';
import { EducationComponent } from './education/education.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [

    AdminComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    BrowserModule

  ]
})
export class AdminModule { }
