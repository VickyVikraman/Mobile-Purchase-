import { Component, OnInit } from '@angular/core';
import AddMobileService from './add-mobile.service'
import {NgbModal, ModalDismissReasons,NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { version } from 'punycode';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  providers:[NgbCarouselConfig],
  styleUrls: ['./seller.component.css','./add-mobile.component.css']
})
export class SellerComponent implements OnInit {
  closeResult: string;
  selected:any;
  constructor(private addMobileService : AddMobileService,private modalService : NgbModal,config: NgbCarouselConfig) { 
    config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
    }
  mobiles :[];
  mobile : {
    version:""
  };
  imgSrc : any;
  total = 0;
  images:any;
  ngOnInit() {
    this.getMobiles();
  }
  getMobiles(){
     this.addMobileService.getMobile().subscribe((data : [])=>{
        this.mobiles=data;
        for(let i=0;i<this.mobiles.length;i++)
        {
          this.imgSrc=this.mobiles[i];
          this.sumOfStock(this.mobiles[i]);
        }
        this.images=this.imgSrc.file;
        console.log(this.mobiles)
    });
  }

  sumOfStock(details:any)
  {
    this.total= this.total+Number(details.stock);    
  }

  open(content , selected) {
    this.mobile  = selected;
    this.getVersion(this.mobile);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  versions:[];
  getVersion(mobile:any)
  {
    this.addMobileService.getVersion(mobile.os).subscribe((data: [] )=>{
      this.versions=data;
      console.log(this.versions);     
    });
  }

  chooseVersion(value)
{
  this.mobile.version=value;
  console.log(this.mobile)
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

  delete(id)
  {
    console.log(id);
      this.addMobileService.delete(id);
      window.location.href="/seller"
  }

  update()
  {
    console.log(this.mobile)
    this.addMobileService.updateMobile(this.mobile);
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
