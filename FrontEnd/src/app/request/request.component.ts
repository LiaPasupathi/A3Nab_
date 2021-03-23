import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requestProduct: any;

  zoom: number = 5;
  
  // initial center position for the map
  lat: number = 10.616698;
  lng: number = 76.936195;
  markers: marker[] = []
  showMap = false;
  pages: any;
  page : Number =1;

  previous;

  constructor(
    private apiCall: ApiCallService,
  ) { }

  ngOnInit(): void {
    const  data = { pageNumber: 1 }
    this.getRequestProductList(data)
  }

  clickedMarker(infowindow){
    if (this.previous) {
      this.previous.close();
      }
      this.previous = infowindow;
  }
  onchangeMap(values:any){
    this.showMap = values.currentTarget.checked;
  }
  pageReload() {
    this.ngOnInit();
  }

  nextPage(page){
    const object = { pageNumber: page}
    this.getRequestProductList(object)
  }

  getRequestProductList(object){
    var params = {
      url: 'admin/getunavailableProduct',
      data: object
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // Success
          // console.log(response.body)
          this.pages = response.body.data.page * 10;
          this.requestProduct = response.body.data.unavailable
          this.markers = response.body.data.unavailable
          
        } else {
          // Query Error
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      }
    )
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
