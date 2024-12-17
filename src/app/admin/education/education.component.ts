import { Component } from '@angular/core';
import { Education } from '../../_models/education';
import { ApiService } from '../../_services/api.service';
declare const alertify:any;

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {

educations: Education[];
education: Education = new Education('','','','');
editEducation: Education= {id:0,schoolName:'',department:'',startYear:'',endYear:''}


constructor(private apiService:ApiService){
  this.getEducations();
}


getEducations(){
  this.apiService.getAll('educations').subscribe(result=>{
    this.educations=result
  },error=>alertify.error(error.error))
}

deleteEducation(id:number){
  this.apiService.delete('educations',id).subscribe(result=>{
    alertify.error("Education Deleted");
    this.educations = this.educations.filter(x=>x.id!=id);   },
                                      error=>
  alertify.error(error)
  )
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
