import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit{
  allProducts:any=[]

  constructor(private api:ApiService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist(){
    this.api.getWishlistAPI().subscribe((res:any)=>{
      this.allProducts=res
      console.log(res);
      this.api.getWishlistCount()
      
    })
  }

  removeItem(id:any){
    this.api.removeWishlistItemAPI(id).subscribe((res:any)=>{
      this.getWishlist()
    })
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
        product.quantity=1
        this.api.addToCartAPI(product).subscribe({
          next:(res:any)=>{
            this.toaster.success(res)
            this.api.getCartCount()
            this.removeItem(product._id)
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
