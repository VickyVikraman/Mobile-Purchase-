import { Component, OnInit } from '@angular/core';
import { BuyerService } from './buyer.service';
import {NgbModal, ModalDismissReasons,NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  providers:[NgbCarouselConfig],
  styleUrls: ['../seller/seller.component.css','../seller/add-mobile.component.css','./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  closeResult : string;
  constructor(private buyerService:BuyerService,private modalService : NgbModal,config: NgbCarouselConfig) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
   }

  ngOnInit() {
    this.getMobiles();
  }
  mobiles:[];
  mobile : {};
  imgSrc : any;
  err:any;
  images:any;
  cartMobile:{
    qty:any
  }
  cartMobiles=[]
  mobilesCart=[]
  length:number=0;
  getMobiles(){
    this.buyerService.getMobile().subscribe((data : [])=>{
      this.mobiles=data;
      for(let i=0;i<this.mobiles.length;i++)
      {
        this.imgSrc=this.mobiles[i];
      }
      this.images=this.imgSrc.file;
    });
  }
  showDetails(mobile,content)
  {
    this.mobile  = mobile;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  showCart(content)
  {
    this.mobilesCart=this.cartMobiles
    console.log(this.mobilesCart.length)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  addToCart(mobileId,qty,index)
  {
    let i=0,flag="false";
    if((qty>=1)&&(qty<=5))
    {
      for(i=0;i<this.cartMobiles.length;i++)
      {
        if(mobileId==this.cartMobiles[i].id)
        {
          this.cartMobile=this.mobiles[index]
          this.cartMobile.qty+=qty;
          this.cartMobiles[i]=this.cartMobile;
          flag="true"
          break;
        }
        else{
          flag="false";
        }

      }
      if(flag=="false")
      {
        console.log(this.cartMobiles)
        this.cartMobile=this.mobiles[index]
        this.cartMobile.qty=qty;
        this.cartMobiles.push(this.cartMobile)
      }
      this.length=this.cartMobiles.length;
      console.log(this.cartMobiles);
    }
    else{
      this.err="Select Quantity";
    }
    console.log(this.cartMobiles.length)
  }
  addToCartAndBuy(mobileId,qty,index,content)
  {
    let i=0,flag="false";
    if((qty>=1)&&(qty<=5))
    {
      for(i=0;i<this.cartMobiles.length;i++)
      {
        if(mobileId==this.cartMobiles[i].id)
        {
          this.cartMobile=this.mobiles[index]
          this.cartMobile.qty+=qty;
          this.cartMobiles[i]=this.cartMobile;
          flag="true"
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
          break;
        }
        else{
          flag="false";
        }

      }
      if(flag=="false")
      {
        this.cartMobile=this.mobiles[index]
        this.cartMobile.qty=qty;
        this.cartMobiles.push(this.cartMobile)
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
      this.length=this.cartMobiles.length;
    }
    else{
      this.err="Select Quantity";
    }
    console.log(this.cartMobiles)
  }
  disabled:boolean;
  qtyChange(i,qty)
  {
    if(this.cartMobiles[i].stock<qty)
    {
      alert("Exceeded Max Stock");
      this.disabled=true;
    }
    else{
      this.disabled=false;
    }
  }
  checkout()
  {
    this.buyerService.buyNow(this.cartMobiles)
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
}
