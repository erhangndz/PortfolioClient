import { Component } from '@angular/core';
import { Banner } from '../_models/banner';
import { ApiService } from '../_services/api.service';
import { Project } from '../_models/project';
import { Interest } from '../_models/interest';
import { Experience } from '../_models/experience';
import { Education } from '../_models/education';
import { Message } from '../_models/message';
import Swal from 'sweetalert2'
declare const alertify:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
banners:Banner[];
projects:Project[];
interests:Interest[];
experiences:Experience[];
educations:Education[];
message:Message=new Message();


/**
 *
 */
constructor(private apiService:ApiService) {
this.getBanners();
this.getProjects();
this.getInterests();
this.getExperiences();
this.getEducations();
}

getBanners(){
  this.apiService.getAll('banners').subscribe({
    next: result=> this.banners= result

  })
}

getProjects(){
  this.apiService.getAll('projects').subscribe({
    next: values=> this.projects=values

  })
  }

  getInterests(){
    this.apiService.getAll('interests').subscribe({
      next: values=> this.interests=values

    })
    }

    getExperiences(){
      this.apiService.getAll('experiences').subscribe({
        next: values=> this.experiences=values,

      })
      }

      getEducations(){
        this.apiService.getAll('educations').subscribe({
          next: result =>this.educations=result
        })
      }


      sendMessage(){
        this.apiService.create('messages',this.message).subscribe({
          next: v=> Swal.fire({
              title: "Message Sent! ",
              text: "Your message has been sent successfully",
              icon: "success",
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK"
            }),
            error: err=> alertify.error(err.error)
        })
      }





}
