import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OffersService } from './offers.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiCallService } from '../services/api-call.service';
declare var $:any;

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  providers: [DatePipe]
})
export class OffersComponent implements OnInit {
  
  addOffers: FormGroup;
  datePickerConfig:Partial<BsDatepickerConfig>;

   bsValue: Date = new Date();
   bsValue1: Date = new Date();
   status: any = true;
   trustUser: any = false;
   offerId: number;
   allcategory: any = [];
   productcategory: any = [];
   isEdit  = false;
   id : number;
   imagePreview = null;
   fileUpload: any;
   submitted = false;
   showAccept = 'true';

  list_offers: any = [];
  constructor(
    private formBuilder:FormBuilder,
    private offersservice:OffersService,
    private router:Router,
    private datepipe : DatePipe,
    private apiCall: ApiCallService,
    ) { }

  
  ngOnInit(): void {
    this.getofferslist("active");

    this.addOffers   = this.formBuilder.group({
      title: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      couponCode: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      trustUser:[this.trustUser,[ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      description: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      discount: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      minimumValue: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      count: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      startDate: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      endDate: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      status: [this.status],
      image: [''],
      offCategoryId: [''],
      offProductId: [''],
      StartTime: [''],
      EndTime: ['']
  });
  
  let allcate = {
    url: "admin/getAllCategory"
  }

  this.offersservice.getallcategory(allcate).subscribe((result:any)=>{
    let resu = result.body;
    if(!resu.error)
    {
         this.allcategory = resu.data;
    }else{
      this.offersservice.showToast(resu.message, 'Error', 'errorToastr')
    }
  },(error)=>{
     console.error(error);
  });
  this.callRolePermission();
}

callRolePermission(){
  if(sessionStorage.getItem('adminRole') !== 'superadmin'){
    let orderpermission = JSON.parse(sessionStorage.getItem('permission'))
    this.showAccept = orderpermission[5].writeOpt

  }
}


uploadImageFile(event)
{
  var reader = new FileReader();
  reader.onload = (event: any) => {
    this.imagePreview = event.target.result;
  }
  reader.readAsDataURL(event.target.files[0]); 
  this.fileUpload = event.target.files[0]

}

add_off_click()
{
  this.isEdit = false; 
  this.addOffers.reset();

}

async onSubmit()
{
  this.submitted = true;
  if(!this.addOffers.valid){
    this.apiCall.showToast('Please Fill the mandatory field', 'Error', 'errorToastr')
    return false;
  }
  const formData = new FormData();
  formData.append('uploaded_file', this.fileUpload); 
  const image = await this.apiCall.imageuploadFunctions(formData);
  if(!image['error'])
  {
    this.addOffers.value['image'] = image['uploadUrl'];
    this.addOffers.value['status'] = this.addOffers.value['status'] ? "active" : "inactive";
    this.addOffers.value['trustUser'] = this.addOffers.value['trustUser'] ? "true" : "false";
    this.addOffers.value['startDate'] = this.datepipe.transform(this.addOffers.value['startDate'], 'yyyy-MM-dd');
    this.addOffers.value['endDate'] = this.datepipe.transform(this.addOffers.value['endDate'], 'yyyy-MM-dd');
    this.addOffers.value['StartTime'] = this.addOffers.value['StartTime'];
    this.addOffers.value['EndTime'] = this.addOffers.value['EndTime'];


      if(this.isEdit == false)
      {
        var params = {
          url: 'admin/addNewOffers',
          data: this.addOffers.value
        }

      }
      else
      {
        // console.log("offers id", this.id);
        var data=this.addOffers.value;
        data['id']=this.id
          
        var params = 
        {
          url: 'admin/editOffers',
          data: data,  
        }
      }
    
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if(response.body.error == 'false')
        {
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
          this.submitted = false;
          this.addOffers.reset();
          $('#add_offer_btn').modal('hide');
          this.ngOnInit();
        }
        else
        {
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
      });
  }
  else
  {
    this.apiCall.showToast('Upload Error !!', 'Oops', 'errorToastr')
  }
}


editoffers(offers){
$('#add_offer_btn').modal('show');
// console.log("Edit offer",offers)
this.imagePreview = offers['image']

this.isEdit = true;
this.id = offers['id']
this.addOffers   = this.formBuilder.group({
  title: [offers['title'],  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
  image: [''],
  couponCode: [offers['couponCode'] , [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
  trustUser: [offers['trustUser'],  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
  description: [offers['description'],  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
  discount: [offers['discount'],  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
  minimumValue: [offers['minimumValue'],  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
  count: [offers['count'],  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
  startDate: [offers['startDate'],  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
  endDate: [offers['endDate'],  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
  status: [offers['status'], ],
  offCategoryId: [offers['offCategoryId'],  ],
  offProductId: [offers['offProductId'],  ],
  StartTime: [offers['StartTime']],
  EndTime: [offers['EndTime']]
})


}


getofferslist(status){
  let off_li = {
    url: "admin/getOfferList",
    status: status
  }

  this.offersservice.getoffservice(off_li).subscribe((result:any)=>{
    // console.log('offers response', result.body);
    let resu = result.body;
    if(resu.error == "false")
    {
         this.list_offers = resu.data.Offers;
    }else{
      this.offersservice.showToast(resu.message, 'Error', 'errorToastr')
    }
  },(error)=>{
     console.error(error);
  });
}


onchange(){
  let stat = this.status ? "active" : "inactive"; 
  this.getofferslist(stat);
}


cateclick(category_id){
  // console.log(category_id);

   let cateid ={
     url:"admin/categoryProduct",
     categoryId : category_id
   }

   this.offersservice.categoryproduct(cateid).subscribe((result:any)=>{
    //  console.log('product response', result.body);
     let resu = result.body;
     if(!resu.error)
     {
          this.productcategory = resu.data.products;
     }else{
       this.offersservice.showToast(resu.message, 'Error', 'errorToastr')
     }
     
   },(error)=>{
     console.error(error);
   });

}

statclick(status,type,id){
  const object = {}
  object['id'] = id
  if(status){
    object['status'] = 'active'
  } else {
    object['status'] = 'inactive'
  }
    object['type'] = type

  let statid ={
    url:"admin/updateOfferStatus",
    data:object
  }

  this.apiCall.commonPostService(statid).subscribe((result:any)=>{
    let resu = result.body;
    if(resu.error == "false")
    {
      this.apiCall.showToast("Status updated Successfully", 'Success', 'successToastr');
    }else{
      this.apiCall.showToast(resu.message, 'Error', 'errorToastr');
    }
    
  },(error)=>{
    console.error(error);
  });

}
}