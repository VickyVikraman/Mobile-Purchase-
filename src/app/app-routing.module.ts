import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerComponent } from './buyer/buyer.component';
import { SellerComponent } from './seller/seller.component';
import { CartComponent } from './buyer/cart/cart.component';



const routes: Routes = [
  {
    path:"buyer",
    component:BuyerComponent
  },
  {
    path:"seller",
    component:SellerComponent
  },
  {
    path:"cart",
    component:CartComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

 }
