import {Component} from '@angular/core';
import AddMobileService from './add-mobile.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'add-mobile',
  templateUrl: './add-mobile.component.html',
  styleUrls: ['./add-mobile.component.css']
})
export class AddMobile {
  closeResult: string;

  constructor(private modalService: NgbModal,private addMobileService : AddMobileService) {}
  mobile : any = {
    storage:{

    },
    dimension : {

    },
    file:[]

  };

  url : any;
  onSubmit() {
  
    this.addMobileService.addMobile(this.mobile);
    this.mobile.file=[];
    window.location.href="/seller";

  }
  private base64textString:String="";
  imgSrc:any;
  selectFile(evt){
    var files = evt.target.files;
    for(let i=0;i<files.length;i++)
    {
      var file = files[i];
      if (files && file) {
          var reader = new FileReader();

          reader.onload =this._handleReaderLoaded.bind(this);

          reader.readAsBinaryString(file);
      }
  }
}

versions : [];
chooseVersion(value)
{
  this.mobile.version=value;
}
chooseOS(value)
{
  this.mobile.os=value;
  this.addMobileService.getVersion(value).subscribe((data : [])=>{
    this.versions=data;
    console.log(this.versions);
  });
  console.log(this.mobile);
}


_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          this.imgSrc="data:image/jpeg;base64,"+this.base64textString
          console.log(this.imgSrc);
          this.mobile.file.push(this.base64textString);
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
