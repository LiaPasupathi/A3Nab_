import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  supportForm: FormGroup;

  supportTotal: number;
  supportPending: number;
  supportEscalate: number;
  resolved: number;
  supportList: any;


  constructor(
    private apiCall: ApiCallService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.supportForm   = this.formBuilder.group({
      // orderIds: [''],
      userId: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      orderId: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      name: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      mobileNumber: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      notes: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
    });

    const  data = { pageNumber: 1 }

    this.getSupportList(data)
  }

  getSupportList(object){
    var params = {
      url: 'admin/getSupportList',
      data: object
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // Success

          this.supportTotal = response.body.data.supportCount.total
          this.supportPending = response.body.data.supportCount.pending
          this.supportEscalate = response.body.data.supportCount.escalate
          this.resolved = response.body.data.supportCount.resolved

          this.supportList = response.body.data.support

          console.log(response.body)
          
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

  searchSuggestion(value){
    if(value.length === 4){
      const object = { orderId: value }
      var params = {
        url: 'admin/searchOrderId',
        data: object
      }
      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          if (response.body.error == 'false') {
            // Success
            // console.log(response.body.data.orders)
            if(response.body.data.orders.length > 0){
              this.supportForm   = this.formBuilder.group({
                // orderIds: [response.body.data.orders[0].id,  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
                userId: [response.body.data.orders[0].userId,  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
                orderId: [response.body.data.orders[0].id,  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
                name: [response.body.data.orders[0].firstName,  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
                mobileNumber: [response.body.data.orders[0].mobileNumber,  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
                notes: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
              })
            } else {
              this.apiCall.showToast('Invalid Order ID', 'Error', 'errorToastr')
            }
            // console.log(response.body)
          } else {
            // Query Error
            // this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
          }
        },
        (error) => {
          this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
          console.log('Error', error)
        }
      )
    }
  }

  onSubmit(){
    if (!this.supportForm.valid) {
      this.apiCall.showToast('Please Fill the mandatory field', 'Error', 'errorToastr')
      return false;
    }

    var params = {
      url: 'admin/addSupport',
      data: this.supportForm.value
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        // console.log(response.body)
        if (response.body.error === 'false') {
          // Success
          // console.log(response.body)
          // this.pages = response.body.pages * 10;
          // this.orderList = response.body.data.orders
          // this.markers = response.body.data.orders
          this.supportForm.reset();
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
          // this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
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
    // console.log(this.supportForm.value)
  }

}
