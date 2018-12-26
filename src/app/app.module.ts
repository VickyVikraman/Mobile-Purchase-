import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SellerComponent } from './seller/seller.component';
import {AddMobile } from './seller/add-mobile'
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { BuyerComponent } from './buyer/buyer.component';
import { CartComponent } from './buyer/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    SellerComponent,
    AddMobile,
    BuyerComponent,
    CartComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
