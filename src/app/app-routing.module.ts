import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { UserCartComponent } from './user-cart/user-cart.component';

const routes: Routes = [
  {path:'',component:AllProductsComponent},
  {path:'view/:id', component:ViewProductComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'wishlist',component:WishListComponent},
  {path:'cart',component:UserCartComponent},
  {path:'**',redirectTo:''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
