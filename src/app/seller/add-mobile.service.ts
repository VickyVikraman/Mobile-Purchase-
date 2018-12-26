import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddMobileService {
  private mobileUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  addMobile(mobile: any) {
    const url = this.mobileUrl + '/add';
    console.log(url)
    console.log(mobile);
    this.http.post(url, mobile, httpOptions).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

  }

  getMobile() {
    const url = this.mobileUrl + '/get'
    return this.http.get(url);
  }

  updateMobile(mobile: any) {
    const url = this.mobileUrl + '/update'
    console.log(url)
    console.log(mobile);
    this.http.post(url, mobile, httpOptions).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
  }

  addImage(file: File[]) {

    const formdata: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append('file', file[i]);
    }
    const req = new HttpRequest('POST', 'http://localhost:8080/uploadpicture', formdata, {
      reportProgress: true,
      responseType: 'text'
    }
    );
    return this.http.request(req);

  }

  delete(id: any) {
    const url = "http://localhost:8080/delete?&id=" + id;
    console.log(url)
    return this.http.get(url).toPromise();
  }

  getVersion(os:any)
  {
    const url = "http://localhost:8080/version?&os=" + os;
    return this.http.get(url);

  }


}
export default AddMobileService