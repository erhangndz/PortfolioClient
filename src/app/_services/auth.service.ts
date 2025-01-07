import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../_models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
              private jwtHelper:JwtHelperService
  ) { }
baseUrl = "https://localhost:7100/api/Users/login"
decodedToken:any;


login(model:any){

  return this.http.post<any>(this.baseUrl,model)

}




decodeToken(){

 let token =  localStorage.getItem("token");
  this.decodedToken = this.jwtHelper.decodeToken(token)
  return this.decodedToken;
}


loggedIn(){
  const token = localStorage.getItem("token");
  return !this.jwtHelper.isTokenExpired(token);
}





}
