import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [DatePipe]
})
export class CarsComponent implements OnInit {
datePickerConfig:Partial<BsDatepickerConfig>;

bsValue: Date = new Date();
addCar: FormGroup;
carList: any;
fileUpload: any;
driverList: any;
carMainList: any;
carMaintainList:any;
carDamageList:any;
assigCar: number;
id : number;
carFname:any;
carLname:any;
carlastOilChange:any;
carlastGasRefill:any;
currentMileage:any;
licenseNumber:any;
expirationDate:any;
imagePreview = null;
carModel:any;

originalArray: any;

zoom: number = 5;
// initial center position for the map
lat: number = 10.616698;
lng: number = 76.936195;
markers: marker[] = []
previous;
valueFrom = ''
valueTo = ''
filtID : number;
showAccept = 'true';

  constructor(
    private apiCall: ApiCallService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.addCar   = this.formBuilder.group({
      licenseNumber: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      carImage: ['', [Validators.required]],
      expirationDate: [this.bsValue,  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      startingMileage: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      carModel: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
    })  

    const data = {status: "ALL"}
    this.getCars(data)
    this.assignDriverList();
    this.callRolePermission();
  }

  callRolePermission(){
    if(sessionStorage.getItem('adminRole') !== 'superadmin'){
      let orderpermission = JSON.parse(sessionStorage.getItem('permission'))

      this.showAccept = orderpermission[1].writeOpt

    }
  }

  assignDriverList(){
    var params = {
      url: 'admin/assignDriverList',
      data: {}
    }

    this.apiCall.commonGetService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // Success
          // console.log(response.body)
          this.driverList = response.body.data.driver
          this.originalArray = response.body.data.driver
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

  searchDriver(value){
    var filterProducts = this.originalArray.filter(function(item) {
      return item.drId.toLowerCase().indexOf(value.toLowerCase()) >= 0
     })
     this.driverList = filterProducts;
  }

  clickedMarker(infowindow){
    if (this.previous) {
      this.previous.close();
      }
      this.previous = infowindow;
  }

  onChangeFilter(status){
    const data = {status: status}
    this.getCars(data)
  }

  getCars(data){

    var params = {
      url: 'admin/getAllCarList',
      data: data
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // Success
          // console.log(response.body)
          this.carList = response.body.data.cars
          this.markers = response.body.data.cars
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

  assigndri(data){
    this.assignDriverList();
    this.assigCar = data.id
    console.log(this.assigCar)
  }

  handleChange(value){
    const obj = { carId: this.assigCar, driverId: value }

    var params = {
      url: 'admin/assignDriver',
      data: obj
    }

    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // Success
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
          $('#assign_dri_btn').modal('hide');
          this.assigCar = null;
          this.ngOnInit();
          // this.router.navigateByUrl('/dashboard');
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

  uploadImageFile(event){
    var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagePreview = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]); 
      this.fileUpload = event.target.files[0]
  }

  async onSubmit(){
    console.log(this.addCar.value)
    if(!this.addCar.valid){
      this.apiCall.showToast('Please Fill the mandatory field', 'Error', 'errorToastr')
      return false;
    }

    const formData = new FormData();
    formData.append('uploaded_file', this.fileUpload); 
    const image = await this.apiCall.imageuploadFunctions(formData);

    const postData = this.addCar.value
    postData['expirationDate'] = this.datePipe.transform(this.addCar.value.expirationDate, 'yyyy-MM-dd');
    postData['carImage'] = image['uploadUrl']
       
    
    var params = {
      url: 'admin/addCar',
      data: postData
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        if (response.body.error == 'false') {
          // Success
          this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
          $('#add_driv_btn').modal('hide');
          this.imagePreview = null;
          this.ngOnInit();
          // this.router.navigateByUrl('/dashboard');
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

  rangevalueFrom(event: any){
    this.valueFrom= this.datePipe.transform(event, 'yyyy-MM-dd');
    this.drivStat(this.filtID,this.valueFrom,this.valueTo)
  }

  rangevalueTo(event: any){
    this.valueTo = this.datePipe.transform(event, 'yyyy-MM-dd');
    this.drivStat(this.filtID,this.valueFrom,this.valueTo)
  }

  drivStat(id,valueFrom,valueTo){
     this.filtID = id;
     this.valueFrom = valueFrom;
     this.valueTo = valueTo;
  var params = 
        {
          url: 'admin/viewCarrDetails',
          data: {id : this.filtID,fromDate: this.valueFrom, toDate: this.valueTo}
        }
        // console.log("????",params)
        this.apiCall.commonPostService(params).subscribe(
          (response: any) => {
            if (response.body.error == 'false') {
              // Success
              this.carMainList = response.body.data.car
              this.carFname = response.body.data.car.firstName
              this.carLname = response.body.data.car.lastName
              this.carlastOilChange = response.body.data.car.lastDateOilChange
              this.carlastGasRefill = response.body.data.car.lastDateGasRefill
              this.currentMileage = response.body.data.car.currentMileage
              this.licenseNumber = response.body.data.car.licenseNumber
              this.expirationDate = response.body.data.car.expirationDate
              this.carModel = response.body.data.car.carModel

              this.carDamageList = response.body.data.damages
              this.carMaintainList = response.body.data.maintenance
            } else {
              // Query Error
              this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
            }
          },
          (error) => {
            this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
            console.log('Error', error)
          });

}
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
