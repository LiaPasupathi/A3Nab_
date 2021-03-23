import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-makeassignment',
  templateUrl: './makeassignment.component.html',
  styleUrls: ['./makeassignment.component.css']
})
export class MakeassignmentComponent implements OnInit {

  orderList: any;
  selection = [];
  orderIds :string [] = [];
  driverList: any;

  isShowDriver = false;
  isShowStore = false;

  driverName: string;
  driverID: string;
  driverImage: string;
  longitude:any;
  latitude: any;
  dID: number;
  storeList: any;
  distance: any;
  originalArray: any;

  lat: number = 10.616698;
  lng: number = 76.936195;

  markers: marker[] = []
  zoom: number = 5;
  previous;
  constructor(
    private apiCall: ApiCallService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.assignOrderList()
    this.getDriverList()
  }

  getSelection(item) {
    return this.selection.findIndex(s => s.id === item.id) !== -1;
  }

  getDriverList(){
    const object  = { driverActive: 1, isComplete: 1 }

    var params = {
      url: 'admin/getDriverList',
      data: object
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        // console.log(response.body)
        if (response.body.error === 'false') {
          // Success
          // console.log(response.body)
          this.driverList = response.body.data.driver
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

  clickedMarker(infowindow){
    if (this.previous) {
      this.previous.close();
      }
      this.previous = infowindow;
  }

  changeHandler(item: any, event: KeyboardEvent) {
    const id = item.id;

    const index = this.selection.findIndex(u => u.id === id);
    if (index === -1) {
      // ADD TO SELECTION
      // this.selection.push(item);
      this.selection = [...this.selection, item];
    } else {
      // REMOVE FROM SELECTION
      this.selection = this.selection.filter(user => user.id !== item.id)
      // this.markers = this.selection
      // this.selection.splice(index, 1)
    }
    
    
    if(this.selection.length > 0){
      this.isShowDriver = true
      const object = { latitude: this.latitude, longitude: this.longitude, driverId: this.dID, orderId: JSON.stringify(this.selection) }

      this.changeOrder(object)
    } else {
      this.distance = []
      this.storeList = []
      this.latitude = null
      this.longitude = null
      this.dID = null
      this.isShowDriver = false
    }
    // console.log(this.selection)
  }

  listOrderChanged(data){
    // console.log(data)
    this.distance = data
  }

  searchOrders(value){
    this.orderList
    // console.log(this.orderList)
    // console.log(value)
    var orderIDs = '#Ord'+value

    var sortOrder = this.originalArray.filter(function(item) {
      return item.orderIDs.toLowerCase().indexOf(orderIDs.toLowerCase()) >= 0
     })
     this.orderList = sortOrder
    //  console.log(this.selection)
  }

  searchDrivers(value){

  }

  changeOrder(object){
    var params = {
      url: 'admin/findDriverAssignOrder',
      data: object
    }
    if(this.latitude && this.longitude && this.dID) {
      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          // console.log(response.body)
          if (response.body.error === 'false') {
            // Success
            // console.log(response.body)
            this.storeList = response.body.data.store
            this.distance = response.body.data.distance
            // console.log(this.storeList)
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
  driverAssign(){
    // console.log(this.distance)
    if(this.distance.length > 0 && this.latitude && this.longitude && this.dID){
      console.log(this.distance)

      const object = {}
      object['driverId'] = this.dID
      object['longitude'] = this.longitude
      object['latitude'] = this.latitude

      object['pickup'] = 5
      object['drop'] = 5
      object['route'] = JSON.stringify(this.distance)
      // console.log(object)

      // return;

      var params = {
        url: 'admin/assignOrder',
        data: object
      }

      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          // console.log(response.body)
          if (response.body.error === 'false') {
            // Success
            this.ngOnInit();
            this.router.navigateByUrl('/assignment');
            this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
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

    } else {
      
    }
  }

  selectDriver(data){
    this.isShowStore = true;
    // console.log(data)

    this.driverName = data.firstName
    this.driverID = data.drId
    this.driverImage = data.profilePic
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.dID = data.id
    // console.log(data)
    
    if(this.latitude && this.longitude && this.dID) {
    const object = { latitude: this.latitude, longitude: this.longitude, driverId: this.dID, orderId: JSON.stringify(this.selection) }
    
    var params = {
      url: 'admin/findDriverAssignOrder',
      data: object
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        // console.log(response.body)
        if (response.body.error === 'false') {
          // Success
          // console.log(response.body)
          this.storeList = response.body.data.store
          this.distance = response.body.data.distance
          // console.log(this.storeList)
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

  assignOrderList(){
   var params = {
      url: 'admin/unAssignOrderList',
      data: {}
    }

    this.apiCall.commonGetService(params).subscribe(
      (response: any) => {
        // console.log(response.body)
        if (response.body.error === 'false') {
          // Success
          // console.log(response.body)
          this.orderList = response.body.data.orders
          this.originalArray = response.body.data.orders
          this.markers = response.body.data.orders
          // console.log(this.timeList)
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
  pageReload() {
    this.ngOnInit();
    window.location.reload();
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
