import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit{
  allProducts:any=[]
  couponStatus:boolean=false
  cartTotalPrice:number=0
  couponClickStatus:boolean=false

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getCart()
    }
  }

  getCart(){
    this.api.getCartAPI().subscribe({
      next:(res:any)=>{
        this.allProducts=res
        this.getCartTotal()
        console.log(this.allProducts);
        
      },
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }

  deleteItem(id:any){
    this.api.removeCartItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason.error);
        
      }
    })
  }

  incrementQuantity(id:any){
    this.api.incrementItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason.error);
        
      }
    })
  }

  decrementQuantity(id:any){
    this.api.decrementItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason.error);
        
      }
    })
  }


  emptyCart(){
    this.api.emptyCartAPI().subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason.error);
        
      }
    })
  }


  getCoupon(){
    this.couponStatus=true
  }

  getCartTotal(){
    const total=this.allProducts.map((product:any)=>product.totalPrice).reduce(((p1:any,p2:any)=>p1+p2))
    this.cartTotalPrice = Math.ceil(total)
  }
  
  discount50(){
    this.couponClickStatus=true
    let discount= Math.ceil(this.cartTotalPrice *0.5)
    this.cartTotalPrice-=discount
  }

  discount20(){
    this.couponClickStatus=true
    let discount= Math.ceil(this.cartTotalPrice *0.2)
    this.cartTotalPrice-=discount
  }

  discount5(){
    this.couponClickStatus=true
    let discount= Math.ceil(this.cartTotalPrice *0.05)
    this.cartTotalPrice-=discount
  }

  checkout(){
    sessionStorage.setItem("cartTotalPrice",JSON.stringify(this.cartTotalPrice))
    this.router.navigateByUrl('/checkout')
  }

}
