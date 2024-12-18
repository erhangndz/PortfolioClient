import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Project } from '../../_models/project';
import { Category } from '../../_models/category';
import Swal from 'sweetalert2'
declare const alertify:any;


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  projects: Project[];
  categories: Category[];
  project:Project= new Project();
  editProject:Project= {category:new Category(),categoryId:0,description:'',githubUrl:'',imageUrl:'',title:'',id:0}

constructor(private apiService:ApiService){


  this.getProjects();
  this.getCategories();


}



getCategories(){
  this.apiService.getAll('categories').subscribe({
    next: values=> this.categories=values,
    error: err => alertify.error(err.error)
  })
  }

getProjects(){
this.apiService.getAll('projects').subscribe({
  next: values=> this.projects=values,
  error: err => alertify.error(err.error)
})
}

deleteProject(id:number){
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
      this.apiService.delete("projects",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Project Deleted"),
        this.projects = this.projects.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Project has been deleted.",
        icon: "success"
      });
    }
  });

}

onSelected(project:Project) {
  this.editProject = project;
}

updateProject(){
  this.apiService.update("projects",this.editProject.id,this.editProject).subscribe({
    error: err => alertify.error(err.error),
    complete: ()=> alertify.success('Project Updated')
  })

}

createProject(){
  this.apiService.create('projects',this.project).subscribe({
    next: value => this.projects.push(value),
    error: err=> alertify.error(err.error),
    complete: ()=> alertify.success('New Project Created')
  })
}


}
