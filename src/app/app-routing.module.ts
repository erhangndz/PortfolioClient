import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './admin/banner/banner.component';
import { EducationComponent } from './admin/education/education.component';
import { MainComponent } from './main/main.component';

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
    ],
  },

  //Admin Routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'banner',
       component: BannerComponent
      },
      {
        path: 'education',
       component: EducationComponent
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
