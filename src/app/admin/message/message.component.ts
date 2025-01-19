import { Component } from '@angular/core';
import { Message } from '../../_models/message';
import { ApiService } from '../../_services/api.service';
import Swal from 'sweetalert2'
declare const alertify:any;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
messages :Message[];
selectedMessage:Message = {id:0,name:'',email:'',isRead:false,messageContent:''};



constructor(private apiService: ApiService){
  this.getMessages()
}



getMessages(){
this.apiService.getAll('messages').subscribe({
  next: values=> this.messages=values,
  error: err => alertify.error(err.error),
  complete: ()=> this.messages= this.messages.filter(x=>x.isRead==false)
})
}

deleteMessage(id:number){
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
      this.apiService.delete("messages",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Message Deleted"),
        this.messages = this.messages.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Message has been deleted.",
        icon: "success"
      });
    }
  });

}

onSelected(message:Message) {
  this.selectedMessage = message;
}

markAsRead(){
  this.selectedMessage.isRead=true;
  this.apiService.update("messages",this.selectedMessage.id,this.selectedMessage).subscribe({
    error: err => alertify.error(err.error),
    complete: ()=> alertify.success('Message marked as Read').then(this.getMessages())
  })

}


}
