import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
declare const alertify:any;
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

model:any;
constructor(private authService:AuthService,
            private router: Router
) {


}

  login(){

    this.authService.login(this.model).subscribe(response=>{
      alertify.success("Login Success!");
      this.router.navigate(['/admin']);
    }, error=>{
      alertify.error(error.error);
    });

}
}
