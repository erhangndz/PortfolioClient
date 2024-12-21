import { Component } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Contact } from '../../_models/contact';
import Swal from 'sweetalert2'
declare const alertify:any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contacts:Contact[];
  contact: Contact= new Contact();
  editContact:Contact= {id:0,address:'',email:'',phone:'',mapUrl:''}
constructor(private apiService:ApiService) {
this.getContacts();

}

getContacts(){
this.apiService.getAll('contacts').subscribe({
  next: values=> this.contacts=values,
  error: err => alertify.error(err.error)
})
}

deleteContact(id:number){
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
      this.apiService.delete("contacts",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Contact Deleted"),
        this.contacts = this.contacts.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success"
      });
    }
  });

}

onSelected(contact:Contact) {
  this.editContact = contact;
}

updateContact(){
  this.apiService.update("contacts",this.editContact.id,this.editContact).subscribe({
    error: err => alertify.error(err.error),
    complete: ()=> alertify.success('Contact Updated')
  })

}

createContact(){
  this.apiService.create('contacts',this.contact).subscribe({
    next: value => this.contacts.push(value),
    error: err=> alertify.error(err.error),
    complete: ()=> alertify.success('New Contact Created')
  })
}
}
