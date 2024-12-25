import { Component } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Experience } from '../../_models/experience';
import Swal from 'sweetalert2'
declare const alertify:any;

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {

  experiences:Experience[];
  experience:Experience= new Experience();
  editExperience:Experience= {id:0,company:'',endYear:'',startYear:'',title:''}

constructor(private apiService:ApiService) {
this.getExperiences();
}


getExperiences(){
this.apiService.getAll('experiences').subscribe({
  next: values=> this.experiences=values,
  error: err => alertify.error(err.error)
})
}

deleteExperience(id:number){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.apiService.delete("experiences",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Experience Deleted"),
        this.experiences = this.experiences.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Experience has been deleted.",
        icon: "success"
      });
    }
  });

}

onSelected(experience:Experience) {
  this.editExperience = experience;
}

updateExperience(){
  this.apiService.update("experiences",this.editExperience.id,this.editExperience).subscribe({
    error: err => alertify.error(err.error),
    complete: ()=> alertify.success('Experience Updated')
  })

}

createExperience(){
  this.apiService.create('experiences',this.experience).subscribe({
    next: value => this.experiences.push(value),
    error: err=> alertify.error(err.error),
    complete: ()=> alertify.success('New Experience Created')
  })
}

}
