import { Component } from '@angular/core';
import { Interest } from '../../_models/interest';
import { ApiService } from '../../_services/api.service';
import Swal from 'sweetalert2'
declare const alertify:any;


@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.css'
})
export class InterestComponent {
interests :Interest[];
interest: Interest = new Interest();
editInterest:Interest = {id:0,name:'',description:''};



constructor(private apiService: ApiService){
  this.getInterests()
}



getInterests(){
this.apiService.getAll('interests').subscribe({
  next: values=> this.interests=values,
  error: err => alertify.error(err.error)
})
}

deleteInterest(id:number){
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
      this.apiService.delete("interests",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Interest Deleted"),
        this.interests = this.interests.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Interest has been deleted.",
        icon: "success"
      });
    }
  });

}

onSelected(interest:Interest) {
  this.editInterest = interest;
}

updateInterest(){
  this.apiService.update("interests",this.editInterest.id,this.editInterest).subscribe({
    error: err => alertify.error(err.error),
    complete: ()=> alertify.success('Interest Updated')
  })

}

createInterest(){
  this.apiService.create('interests',this.interest).subscribe({
    next: value => this.interests.push(value),
    error: err=> alertify.error(err.error),
    complete: ()=> alertify.success('New Interest Created')
  })
}
}
