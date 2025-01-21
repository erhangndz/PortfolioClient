import { Component } from '@angular/core';
import { Service } from '../../_models/service';
import { ApiService } from '../../_services/api.service';
import Swal from 'sweetalert2'
declare const alertify:any;

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {
services :Service[];
service: Service = new Service();
editService:any = {};



constructor(private apiService: ApiService){
  this.getServices()
}



getServices(){
this.apiService.getAll('services').subscribe({
  next: values=> this.services=values,
  error: err => alertify.error(err.error)
})
}

deleteService(id:number){
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
      this.apiService.delete("services",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Service Deleted"),
        this.services = this.services.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Service has been deleted.",
        icon: "success"
      });
    }
  });

}

onSelected(service:Service) {
  this.editService = service;
}

updateService(){
  this.apiService.update("services",this.editService.id,this.editService).subscribe({
    error: err => alertify.error(err.error),
    complete: ()=> alertify.success('Service Updated')
  })

}

createService(){
  this.apiService.create('services',this.service).subscribe({
    next: value => this.services.push(value),
    error: err=> alertify.error(err.error),
    complete: ()=> alertify.success('New Service Created')
  })
}
}
