import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest,HttpResponse } from '@angular/common/http'



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private mobileUrl = 'http://localhost:8080'
  constructor(private http : HttpClient) { }

  getMobile()
  {
    const url = this.mobileUrl+'/get'
    return this.http.get(url);
  }

  buyNow(cart:any)
  {
    const url = "http://localhost:8080/buy";
    console.log(url)
    return this.http.post(url,cart,httpOptions).toPromise();
  }

  addMobileToCart(mobileId,qty)
  {
    let cart={
      id:mobileId,
      qty:qty
    }
    const url = "http://localhost:8080/addToCart";
    return this.http.post(url,cart,httpOptions);
  }

  getItemFromCart()
  {
    const url = "http://localhost:8080/getCartItem";
    return this.http.get(url);
  }

  getItemById(data)
  {
    const url = "http://localhost:8080/getItemByIds";
    return this.http.post(url,data,httpOptions)
  }

  removeItem(id)
  {
    const url="http://localhost:8080/deleteItem?&id="+id;
    return this.http.get(url).toPromise();
  }
  deleteAll(cart : any)
  {
    const url="http://localhost:8080/deleteAll";
    return this.http.post(url,cart,httpOptions);
  }
}