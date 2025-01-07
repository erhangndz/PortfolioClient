import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './admin/banner/banner.component';
import { EducationComponent } from './admin/education/education.component';
import { MainComponent } from './main/main.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProjectComponent } from './admin/project/project.component';
import { ContactComponent } from './admin/contact/contact.component';
import { ExperienceComponent } from './admin/experience/experience.component';
import { InterestComponent } from './admin/interest/interest.component';
import { MessageComponent } from './admin/message/message.component';
import { LoginComponent } from './home/login/login.component';
import { AuthGuard } from './_guards/auth-guard';

const routes: Routes = [
  //Main Routes
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },

    ],
  },


  //Admin Routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'banner',
       component: BannerComponent,
       canActivate:[AuthGuard]
      },
      {
        path: 'education',
       component: EducationComponent,
       canActivate:[AuthGuard]
      },
      {
        path: 'category',
       component: CategoryComponent,
       canActivate:[AuthGuard]
      },
      {
        path: 'project',
       component: ProjectComponent,
       canActivate:[AuthGuard]
      },
      {
        path: 'contact',
       component: ContactComponent,
       canActivate:[AuthGuard]
      },
      {
        path: 'experience',
       component: ExperienceComponent,
       canActivate:[AuthGuard]
      },
      {
        path: 'interest',
       component: InterestComponent,
       canActivate:[AuthGuard]
      },
      {
        path: 'message',
       component: MessageComponent,
       canActivate:[AuthGuard]
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
