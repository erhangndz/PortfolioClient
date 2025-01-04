import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
              private jwtHelper:JwtHelperService
  ) { }
baseUrl = "https://localhost:7100/api/users/"
decodedToken:any;


login(model:any){

  return this.http.post(this.baseUrl+'login',model).pipe(

    map((response:any) => {
      if(response){

        localStorage.setItem("token",response.token);
        this.decodedToken= this.jwtHelper.decodeToken(response.token);

      }

    })

  )

}





}
