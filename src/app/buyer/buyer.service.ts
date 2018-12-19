import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest,HttpResponse } from '@angular/common/http'



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const cart=[];

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


  getCart()
  {
    return cart;
  }
}
