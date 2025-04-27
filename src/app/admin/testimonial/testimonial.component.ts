import { Component } from '@angular/core';
import { Testimonial } from '../../_models/testimonial';
import { ApiService } from '../../_services/api.service';
import Swal from 'sweetalert2'
declare const alertify:any;

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {
testimonials :Testimonial[];
testimonial: Testimonial = new Testimonial();
editTestimonial:any = {};



constructor(private apiService: ApiService){
  this.getTestimonials()
}



getTestimonials(){
this.apiService.getAll('testimonials').subscribe({
  next: values=> this.testimonials=values,
  error: err => alertify.error(err.error)
})
}

deleteTestimonial(id:number){
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
      this.apiService.delete("testimonials",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Testimonial Deleted"),
        this.testimonials = this.testimonials.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Testimonial has been deleted.",
        icon: "success"
      });
    }
  });

}

onSelected(testimonial:Testimonial) {
  this.editTestimonial = testimonial;
}

updateTestimonial(){
  this.apiService.update("testimonials",this.editTestimonial.id,this.editTestimonial).subscribe({
    error: err => alertify.error(err.error),
    complete: ()=> alertify.success('Testimonial Updated')
  })

}

createTestimonial(){
  this.apiService.create('testimonials',this.testimonial).subscribe({
    next: value => this.testimonials.push(value),
    error: err=> alertify.error(err.error),
    complete: ()=> alertify.success('New Testimonial Created')
  })
}
}
