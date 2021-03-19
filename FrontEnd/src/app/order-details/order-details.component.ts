import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId : number;
  orderDetails: any;
  proDetails:any;

  orderOn: string;
  deliveryDate: string;
  lastName: string;
  firstName: string;
  landmark : string;
  addressPinDetails: string;
  grandTotal: number;
  mobileNumber: string;
  orderProgress: string;
  acceptByStore:any;
  cancelledByUser:any;
  assignDriver:any;
  packedByStore:any;
  packedByDriver:any;
  onWayToDelivery:any;
  orderStatus: string;
  delievryNotes: string;
  ordertax:any;
  drId:any;
  assignment_ID:any;
  totalAmount:any;
  discountAmount:any;
  driverImage:any;

  showMap = false;
  zoom: number = 5;
  
    // initial center position for the map
    lat: number = 10.616698;
    lng: number = 76.936195;
    markers: marker[] = []
    
  previous;

  payType: string;

  constructor(
    private apiCall: ApiCallService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const activeMenu = document.getElementById('orders');
    activeMenu.classList.add('active');

    this.route.params.subscribe(params => this.orderId = params.id);
    // console.log(this.orderId)
    this.getOrderDetails(this.orderId)
  }

  getOrderDetails(id){
    var params = {
      url: 'admin/viewOrderDetails',
      data: { orderId: id }
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error === 'false') {
          console.log(response.body.data.orderInfo)
          // Success
          this.orderOn = response.body.data.orderInfo.orderOn
          this.deliveryDate = response.body.data.orderInfo.deliveryDate
          this.firstName = response.body.data.orderInfo.firstName
          this.lastName = response.body.data.orderInfo.lastName
          this.landmark = response.body.data.orderInfo.landmark
          this.addressPinDetails = response.body.data.orderInfo.addressPinDetails
          this.mobileNumber = response.body.data.orderInfo.mobileNumber
          this.delievryNotes = response.body.data.orderInfo.delievryNotes
          this.ordertax = response.body.data.orderInfo.ordertax
          this.drId = response.body.data.orderInfo.drId
          this.assignment_ID = response.body.data.orderInfo.assignment_ID
          this.totalAmount = response.body.data.orderInfo.totalAmount
          this.discountAmount = response.body.data.orderInfo.discountAmount
          this.driverImage = response.body.data.orderInfo.driverImage
          
          
          this.payType = response.body.data.orderInfo.paytype
          console.log(this.payType)

          this.orderStatus = response.body.data.orderInfo.orderStatus

          // console.log(this.orderStatus)

          this.grandTotal = response.body.data.orderInfo.grandTotal
          // console.log(response.body)
          this.orderDetails = response.body.data.orderDetails
          this.proDetails = response.body.data.orderDetails.products
          this.orderProgress = response.body.data.orderInfo.orderProgress
          this.acceptByStore = response.body.data.orderInfo.acceptByStore
          this.cancelledByUser = response.body.data.orderInfo.cancelledByUser
          this.assignDriver = response.body.data.orderInfo.assignDriver
          this.packedByStore = response.body.data.orderInfo.packedByStore
          this.packedByDriver = response.body.data.orderInfo.packedByDriver
          this.onWayToDelivery = response.body.data.orderInfo.onWayToDelivery
          // console.log(this.orderDetails)
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

  removeOrderItems(data){


    var params = {
      url: 'admin/adminDeleteItems',
      data: {
        orderId: data.orderId,
        productId: data.productId
      }
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error === 'false') {
          // Success
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
          this.getOrderDetails(this.orderId)
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

  updateOrderStatus(status){
    var params = {
      url: 'admin/calcelledOrder',
      data: { orderId: this.orderId, status: status }
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error === 'false') {
          // Success
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
          this.getOrderDetails(this.orderId)
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
  onchangeMap(values:any){
    this.showMap = values.currentTarget.checked;
  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}


