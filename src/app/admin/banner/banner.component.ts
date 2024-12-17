import { Component } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Banner } from '../../_models/banner';
import { Router } from '@angular/router';
declare const alertify:any;


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
banners: Banner[];
bannerCount:number;
banner:Banner= new Banner('','','');

editBanner:Banner={id:0,name:'',title:'',imageUrl:''};

constructor(private apiService:ApiService,
            private router: Router


){
  this.getBanners();

}


getBanners(){
  this.apiService.getAll('banners').subscribe(result=>
this.banners=result,
error=> alertify.error(error.error)
  )
}

deleteBanner(id:number){
  this.apiService.delete('banners',id).subscribe(result=>{
    alertify.error("Banner Deleted");
    this.banners = this.banners.filter(x=>x.id!=id);   },
                                      error=>
  alertify.error(error)
  )
}



createBanner(){
  this.apiService.create("banners",this.banner).subscribe(result=> {
    alertify.success("New Banner Created");
this.banners.push(result); },error=>console.error(error.error)
  )
}


onSelected(banner:Banner){
this.editBanner= banner;

}

updateBanner(){
this.apiService.update("banners",this.editBanner.id,this.editBanner).subscribe(result=> {
  alertify.success("Banner Updated").then(window.location.href='admin/banner') },
  error=> alertify.error(error.error)
)
}

}
