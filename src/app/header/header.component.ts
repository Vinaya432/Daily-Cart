import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  
  loginUsername:string=''
  wishListCount:number=0
  cartCount:number=0
  
  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("existingUser")){
      this.loginUsername=JSON.parse(sessionStorage.getItem("existingUser") || "").username.split(" ")[0]
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishListCount=res
      })
      this.api.cartCount.subscribe((res:any)=>{
        this.cartCount=res
      })
    }else{
      this.loginUsername=''
    }
  }

  getSearchTerm(event:any){
    this.api.searchTerm.next(event.target.value)
  }

  logOut(){
    sessionStorage.clear()
    this.loginUsername=''
    this.cartCount=0
    this.wishListCount=0
    this.router.navigateByUrl('')
  }

 
}
