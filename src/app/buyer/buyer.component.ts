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
    this.getCartItem();
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

  alreadyAdded:boolean;

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

  addCart(mobileId,qty)
  {
    this.buyerService.addMobileToCart(mobileId,qty).subscribe((data:number)=>{
      this.length=data;
    });
  }

  addToCartAndBuy(mobileId,qty)
  {
    this.buyerService.addMobileToCart(mobileId,qty).subscribe((data:number)=>{
      this.length=data;
    });
    window.location.href="/cart";
  }
  
  mobileId=[];

  getCartItem()
  {
    this.buyerService.getItemFromCart().subscribe((data : [])=>{
      this.length=data.length;
      for(let i=0;i<data.length;i++)
      {
        this.insertInto(data[i]);
      }
    });
  }
  insertInto(data:{any})
  {
    this.mobileId.push(data.id);
  }


}
