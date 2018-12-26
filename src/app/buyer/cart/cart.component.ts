import { Component, OnInit } from '@angular/core';
import { BuyerService } from '../buyer.service';
import {NgbModal, ModalDismissReasons,NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(private buyerService : BuyerService,private modalService : NgbModal) { }
  cartItems=[];
  total : number = 0;
  ngOnInit() {
    this.getCartItems();
  }


  getCartItems()
  {
    this.buyerService.getItemFromCart().subscribe((data : []) =>{
      this.buyerService.getItemById(data).subscribe((data : []) =>{
          this.cartItems=data;
          
          for(let i=0;i<data.length;i++)
          {
            this.totalAmt(data[i])
          }
      });
    });
  }
  totalAmt(price:any)
  {
  
    this.total+=price.price;
  }
  incCount(index)
  {
    this.isZero=false;
    this.cartItems[index].qty+=1;
    this.total += this.cartItems[index].price
  }

  isZero:boolean;

  decCount(index)
  {
    if(this.cartItems[index].qty>=1)
    {
      if(this.cartItems[index].qty==1)
      {
        this.isZero=true;
      }
      else{
        this.isZero=false;
        this.cartItems[index].qty-=1;
        this.total-=this.cartItems[index].price
      }
    }
  }
  addr:any;
  zip:any;
  phone:any;
  removeItem(id)
  {
    this.buyerService.removeItem(id);
    window.location.href="/cart"

  }
  closeResult: string;
  selectedCountry = 0;
  selectedState = 0;
  selectedCity=0;
  title = 'app';
  states = [];
  cities = [];
 
 address:any;
  checkoutWith(content)
  {
    this.address = {
      country:this.selectedCountry,
      state:this.selectedState,
      city:this.selectedCity,
      add:this.addr,
      zip:this.zip,
      ph:this.phone
    }
    this.addAddress(this.address.country,this.address.state,this.address.city,this.address.add,this.address.zip,this.address.ph);
    console.log();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  country:any;
  state:any;
  city:any;
  street:any;
  code:any;
  ph:any;
  

  addAddress(country,state,city,add,zip,ph)
  {
      let countries = this.getCountries();
      let states = this.getStates();
      let cities = this.getCity();
      for(let i=0;i<countries.length;i++)
      {
        if(countries[i].id==country)
        {
          for(let j=0;j<states.length;j++)
          {
            if(states[j].id==state)
            {
              for(let z=0;z<cities.length;z++)
              {
                if(cities[z].id==city)
                {
                  this.country=countries[i].name;
                  this.state=states[j].name;
                  this.city=cities[z].name;
                  this.street=add;
                  this.code=zip;
                  this.ph=ph;
                
                }
              }
            }
          }
        }
      }
  }
  checkout(content)
  {
    console.log(this.cartItems)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  onSelectCountry(country_id: number) {
    this.selectedCountry = country_id;
    this.selectedState = 0;
    this.cities = [];
    this.states = this.getStates().filter((item) => {
      return item.country_id === Number(country_id)
    });
  }
 
  onSelectState(state_id: number) {
    this.selectedState = state_id;
    this.cities = this.getCity().filter((item) => {
      return item.state_id === Number(state_id)
    });
  }
  onSelectCity(city : number)
  {
    console.log(city)
    this.selectedCity=city;
  }
 
  getCountries() {
    return [
      { id: 1, name: 'India' },
      { id: 2, name: 'USA' },
      { id: 3, name: 'Australia' }
    ];
  }
 
  getStates() {
    return [
      { id: 1, country_id: 1, name: 'Andhra Pradesh' },
      { id: 2, country_id: 1, name: 'Madhya Pradesh' },
      { id: 3, country_id: 2, name: 'San Francisco' },
      { id: 4, country_id: 2, name: 'Los Angeles' },
      { id: 5, country_id: 3, name: 'New South Wales' },
      { id: 6, country_id: 3, name: 'Victoria' },
      { id: 7, country_id: 1, name: 'Tamilnadu' },
    ]
  }
 
  getCity() {
    return [
      { id: 1, state_id: 1, name: 'Guntur' },
      { id: 2, state_id: 1, name: 'Vijayawada' },
      { id: 3, state_id: 1, name: 'Nellore' },
      { id: 4, state_id: 1, name: 'Kadapa' },
      { id: 5, state_id: 2, name: 'Warangal' },
      { id: 6, state_id: 2, name: 'Hyderabad' },
      { id: 7, state_id: 2, name: 'Karimnagar' },
      { id: 8, state_id: 2, name: 'Kadapa' },
      { id: 9, state_id: 3, name: 'SOMA' },
      { id: 10, state_id: 3, name: 'Richmond' },
      { id: 11, state_id: 3, name: 'Sunset' },
      { id: 12, state_id: 4, name: 'Burbank' },
      { id: 13, state_id: 4, name: 'Hollywood' },
      { id: 14, state_id: 5, name: 'Sunset' },
      { id: 15, state_id: 5, name: 'Burbank' },
      { id: 16, state_id: 5, name: 'Hollywood' },
      { id: 17, state_id: 6, name: 'Benalla' },
      { id: 18, state_id: 6, name: 'Melbourne' },
      { id: 19, state_id: 7, name: 'Chennai' },
      { id: 20, state_id: 7, name: 'Madurai' },
      { id: 21, state_id: 7, name: 'Erode' },
      { id: 22, state_id: 7, name: 'Salem' },
      { id: 23, state_id: 7, name: 'Virudhunagar' },
    ]
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  zipPress(event : any){
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  selectedValue:string;
  setRadio(value : string) 
  {
    this.selectedValue=value;
  }

  isSelected(name: string): boolean   
  {  
      if (!this.selectedValue) { // if no radio button is selected, always return false so every nothing is shown  
          return false;  
      }  
    return (this.selectedValue === name); // if current radio button is selected, return true, else return false  
  }  
  checking:boolean;
  print(): void {
    let printContents, popupWin;
    this.buyerService.deleteAll(this.cartItems).subscribe((check:boolean)=>{
      this.checking=check;
    });
    window.location.href="/cart"
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    let date = new Date();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            table{
              border:1px;
            }
          </style>
        </head>
    <body style="align-items:center" onload="window.print();window.close()">
    ${date}
    ${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
