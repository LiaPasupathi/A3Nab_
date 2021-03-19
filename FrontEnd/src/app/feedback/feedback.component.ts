import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { ApiCallService } from '../services/api-call.service';
// import { AnyMxRecord } from 'dns';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [NgbRatingConfig]
})
export class FeedbackComponent implements OnInit {
  selected = 0;
  hovered = 0;
  appFeedbackList: any;
  appUserFeedbackList: any;
  appdriverFeedbackList: any;

  constructor(
    private apiCall: ApiCallService,
    private config: NgbRatingConfig
  ) { config.max = 5;}

  ngOnInit(): void {
    const data = { pageNumber: 1 }
    this.appFeedback(data)
    this.ratingList(data)
    this.driverFeedbackList(data)
  }

  ratingList(object){
    var params = {
      url: 'admin/getUserFeedbackList',
      data: object
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // Success
          // console.log(response.body)
          this.appUserFeedbackList = response.body.data.support
          
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

  driverFeedbackList(object){
    var params = {
      url: 'admin/getDriverFeedbackList',
      data: object
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // Success
          // console.log(response.body)
          this.appdriverFeedbackList = response.body.data.feedback
          
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

  appFeedback(object){
    var params = {
      url: 'admin/getAppFeedbackList',
      data: object
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // Success
          // console.log(response.body)
          this.appFeedbackList = response.body.data.support
          
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
