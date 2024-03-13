import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  allProducts:any=[]
  searchKey:string=''

  constructor(private api:ApiService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.getAllProduct()
    this.api.searchTerm.subscribe((res:any)=>{
      this.searchKey=res
    })
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

  addTowishList(product:any){
    if(sessionStorage.getItem("token")){
      //proceed t0 go wishlist
     
      this.api.addtoWishListAPI(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.toaster.success(`product ${res.title} added to your wishlist`)
          this.api.getWishlistCount()
        },
        error:(reason:any)=>{
          console.log(reason);
          this.toaster.warning(reason.error)
        }
      })
    }else{
      this.toaster.info("Pleasing Login!!!")
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
        product.quantity=1
        this.api.addToCartAPI(product).subscribe({
          next:(res:any)=>{
            this.toaster.success(res)
            this.api.getCartCount()
          },
          error:(reason:any)=>{
            this.toaster.warning(reason.error)
          }
        })
    }else{
      this.toaster.info("Pleasing Login!!!")
    }
  }
}
