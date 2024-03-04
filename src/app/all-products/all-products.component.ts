import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  allProducts:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(){
    this.api.getAllProductsAPI().subscribe({
      next:(res:any)=>{
        this.allProducts=res
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }
}
