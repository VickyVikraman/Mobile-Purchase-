import { Component, OnInit } from '@angular/core';
import AddMobileService from './add-mobile.service'
import {NgbModal, ModalDismissReasons,NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
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
  mobile : {};
  imgSrc : any;
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
        }
        this.images=this.imgSrc.file;
        console.log(this.mobiles)
    });
  }
  open(content , selected) {
    this.mobile  = selected;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  delete(id)
  {
    console.log(id);
      this.addMobileService.delete(id);
  }

  update()
  {
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
