import { Component } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Banner } from '../../_models/banner';
import { Router } from '@angular/router';
declare const alertify:any;
import Swal from 'sweetalert2'


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
banners: Banner[];
banner:Banner= new Banner();

editBanner:Banner={id:0,name:'',title:'',imageUrl:''};

constructor(private apiService:ApiService,
            private router: Router


){
  this.getBanners();

}


getBanners(){
  this.apiService.getAll('banners').subscribe({
    next: result=> this.banners= result,
    error: err=> alertify.error(err),

  })
}




deleteBanner(id:number){
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
      this.apiService.delete("banners",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Banner Deleted"),
        this.banners = this.banners.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Banner has been deleted.",
        icon: "success"
      });
    }
  });

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
