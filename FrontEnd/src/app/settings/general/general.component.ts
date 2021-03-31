import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  radiusForm: FormGroup;
  addLink: FormGroup;
  addextras: FormGroup;
  submitted = false;
  getlinks: any = {};
  quickDelivery: any = false;
  showAccept = 'true';

  constructor(private formBuilder: FormBuilder,
    private apiCall: ApiCallService
    ) { }

  ngOnInit(): void {
    this.radiusForm = this.formBuilder.group({
      radius: ['',  [Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
    });

    var params = {
      url: 'admin/getAppSettings',
    }
    this.apiCall.commonGetService(params).subscribe((result:any)=>{
      let res = result.body;
      if(res.error=="false")
      {    
           this.getlinks = res.data.socialLinks;
             
            this.addLink = this.formBuilder.group({
            instagramURL: [this.getlinks.instagramURL, []],
            facebookURL: [this.getlinks.facebookURL, []],
            linkedURL: [this.getlinks.linkedURL,[]],
            twitterURL: [this.getlinks.twitterURL,[]],            
          });

          this.addextras = this.formBuilder.group({
            minimumOrderValue: [this.getlinks.minimumOrderValue,[]],
            quickDelivery: [this.getlinks.quickDelivery,[]],
            walletAmount: [this.getlinks.walletAmount,[]],
            expiryDate: [this.getlinks.expiryDate,[]],
            taxAmount: [this.getlinks.taxAmount,[]],
            walletSAR: [this.getlinks.walletSAR,[]],
            walletPoints: [this.getlinks.walletPoints,[]],
            });
        
      }else{
        this.apiCall.showToast(res.message, 'Error', 'errorToastr')
      }
    },(error)=>{
       console.error(error);
    });
    this.callRolePermission();
  }

  callRolePermission(){
    if(sessionStorage.getItem('adminRole') !== 'superadmin'){
      let settingpermission = JSON.parse(sessionStorage.getItem('permission'))
      this.showAccept = settingpermission[7].writeOpt
  
    }
  }
onlinks()
  {
    if(!this.addLink.valid)
    {
      this.apiCall.showToast('Please Fill the mandatory field', 'Error', 'errorToastr')
      return false;
    }
    else{
      var params = {
        url: 'admin/updateSocialLinks',
        data: this.addLink.value
      }
      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          if (response.body.error == 'false') {
            this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
            this.ngOnInit();
          } else {
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

  changeWallet()
  {

      var params = {
        url: 'admin/updateWalletSetting',
        data: this.addextras.value
      }
      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          if (response.body.error == 'false') {
            this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
            this.ngOnInit();
          } else {
            this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
          }
        },
        (error) => {
          this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
          console.log('Error', error)
        }
      )
  }

  changeOrder()
  {
  this.addextras.value['quickDelivery'] = this.addextras.value['quickDelivery'] ? "true" : "false";

      var params = {
        url: 'admin/updateOrderSettings',
        data: this.addextras.value
      }

      this.apiCall.commonPostService(params).subscribe(
        (response: any) => {
          if (response.body.error == 'false') {
            this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
            this.ngOnInit();
          } else {
            this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
          }
        },
        (error) => {
          this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
          console.log('Error', error)
        }
      )
  }

  getSettings(){
    var params = {
      url: 'admin/getSettings',
      data: { }
    }
    this.apiCall.commonGetService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          this.radiusForm = this.formBuilder.group({
            radius: [response.body.data.settings.radius,  [Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
          });
          // Success
          // this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
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


  onSubmit(){
    this.submitted = true;
    if (!this.radiusForm.valid) {
      this.apiCall.showToast('Please Fill the mandatory field', 'Error', 'errorToastr')
      return false;
    }

    var params = {
      url: 'admin/updateSettings',
      data: this.radiusForm.value
    }
    
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
          this.ngOnInit();
        } else {
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

