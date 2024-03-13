import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL='https://dailycart-server.onrender.com'

  searchTerm= new BehaviorSubject('')

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
      this.getCartCount()
    }
   }

  getAllProductsAPI(){
    return this.http.get(`${this.SERVER_URL}/all-products`)
  }

  //register
  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }
  
   //login
   loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
   }

   //get product
   viewProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/view-product/${id}`)
   }

   appendTokenToHeader(){
    const token = sessionStorage.getItem("token")
    // console.log(token);
    let headers= new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
      // console.log("Result of the header: ",headers);  
    }
    return {headers} //return statmnt given in {} since we neww header as object 
   }

   //add to wishlist
   addtoWishListAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-wishlist`,product,this.appendTokenToHeader())

   }

   //getwishlist
   getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/get-wishlist`,this.appendTokenToHeader())

   }

   getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
   }

   //remove product from wishlist
   removeWishlistItemAPI(id:any){
      return this.http.delete(`${this.SERVER_URL}/wishlist-remove/${id}`,this.appendTokenToHeader())
   }

   //add to cart
   addToCartAPI(product:any){
      return this.http.post(`${this.SERVER_URL}/add-to-cart`,product,this.appendTokenToHeader())
   }

   //get cart items
   getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/get-cart`,this.appendTokenToHeader())
   }

   getCartCount(){
      this.getCartAPI().subscribe((res:any)=>{
        this.cartCount.next(res.length)
      })
   }

   //remove cart item
   removeCartItemAPI(id:any){
      return this.http.delete(`${this.SERVER_URL}/remove-cart/${id}`,this.appendTokenToHeader())
   }

   //increment cart item
   incrementItemAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-increment/${id}`,this.appendTokenToHeader())
   }

   //decrement cart item
   decrementItemAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/cart-decrement/${id}`,this.appendTokenToHeader())
   }

   //empty cart
   emptyCartAPI(){
    return this.http.delete(`${this.SERVER_URL}/empty-cart`,this.appendTokenToHeader())
 }

 isLoggedin(){
  return !!sessionStorage.getItem("token")
 }

}


 
