import { Component } from '@angular/core';
import { Education } from '../../_models/education';
import { ApiService } from '../../_services/api.service';
declare const alertify:any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

educations: Education[];
education: Education = new Education();
editEducation: any= {}


constructor(private apiService:ApiService){
  this.getEducations();
}


getEducations(){
  this.apiService.getAll('educations').subscribe(result=>{
    this.educations=result
  },error=>alertify.error(error.error))
}



deleteEducation(id:number){
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
      this.apiService.delete("educations",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Education Deleted"),
        this.educations = this.educations.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Education has been deleted.",
        icon: "success"
      });
    }
  });

}



createEducation(){
  this.apiService.create("educations",this.education).subscribe(result=> {
    alertify.success("New Education Created");
this.educations.push(result); },error=>console.error(error.error)
  )
}


onSelected(education:Education){
this.editEducation= education;

}

updateEducation(){
this.apiService.update("educations",this.editEducation.id,this.editEducation).subscribe(result=> {
  alertify.success("Education Updated").then(window.location.href='admin/education') },
  error=> alertify.error(error.error)
)
}


}
