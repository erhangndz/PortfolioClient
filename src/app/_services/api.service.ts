import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
baseUrl = "https://localhost:7100/api/"

getAll(controller:string) {

return this.http.get<[]>(this.baseUrl+controller);

}


delete(controller:string,id:number) {
  return this.http.delete(this.baseUrl+controller+'/'+id);
}

getById(controller:string,id:number) {
  return this.http.get<any>(this.baseUrl+controller+'/'+id);
}

create(controller:string,model:any) {
  return this.http.post<any>(this.baseUrl+controller,model);
}


update(controller:string,id:number,model:any){
return this.http.put(this.baseUrl+controller+'/'+id,model);
}


}
