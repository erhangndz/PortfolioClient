import { Component } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { Category } from '../../_models/category';
import Swal from 'sweetalert2'
declare const alertify:any;


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

categories :Category[];
category: Category = new Category();
editCategory:Category = {id:0,name:''};



constructor(private apiService: ApiService){
  this.getCategories()
}



getCategories(){
this.apiService.getAll('categories').subscribe({
  next: values=> this.categories=values,
  error: err => alertify.error(err.error)
})
}

deleteCategory(id:number){
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
      this.apiService.delete("categories",id).subscribe({
        error: err => alertify.error(err.error),
        complete: () => {alertify.error("Category Deleted"),
        this.categories = this.categories.filter(x=>x.id!=id) }
      });
      Swal.fire({
        title: "Deleted!",
        text: "Category has been deleted.",
        icon: "success"
      });
    }
  });

}

onSelected(category:Category) {
  this.editCategory = category;
}

updateCategory(){
  this.apiService.update("categories",this.editCategory.id,this.editCategory).subscribe({
    error: err => alertify.error(err.error),
    complete: ()=> alertify.success('Category Updated')
  })

}

createCategory(){
  this.apiService.create('categories',this.category).subscribe({
    next: value => this.categories.push(value),
    error: err=> alertify.error(err.error),
    complete: ()=> alertify.success('New Category Created')
  })
}

}
