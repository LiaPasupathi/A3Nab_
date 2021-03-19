import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  exportForm: FormGroup;
  usercsvOptions:any;
  storecsvOptions: any;
  drivercsvOption: any;
  carscsvOption: any;
  vendorcsvOption: any;
  ordercsvOption : any;
  productcsvOption : any;
  supportcsvOption : any;

  // data: any = [
  //   {
  //     eid: "e101",
  //     ename: "ravi",
  //     esal: 1000
  //   },
  //   {
  //     eid: "e102",
  //     ename: "ram",
  //     esal: 2000
  //   },
  //   {
  //     eid: "e103",
  //     ename: "rajesh",
  //     esal: 3000
  //   }
  // ];

  constructor(
    private apiCall: ApiCallService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.exportForm   = this.formBuilder.group({
      users: [false,  [ Validators.required]],
      store: [false,  [ Validators.required]],
      driver: [false,  [ Validators.required]],
      product: [false,  [ Validators.required]],
      orders: [false,  [ Validators.required]],
      cars: [false,  [ Validators.required]],
      support: [false,  [ Validators.required]],
      vendor: [false,  [ Validators.required]],
    })
  }

  onSubmit(){
    if(!this.exportForm.valid){
      this.apiCall.showToast('Please Fill the mandatory field', 'Error', 'errorToastr')
      return false;
    }
    this.spinner.show();
    // console.log(this.exportForm.value)
    var params = {
      url: 'admin/exportData',
      data: this.exportForm.value
    }
    this.apiCall.commonPostService(params).subscribe(
      (response: any) => {
        // console.log(response.body)
        if (response.body.error === 'false') {
          // Success
          if(response.body.data.users.length > 0){
            this.exportUserData(response.body.data.users)
          }

          if(response.body.data.store.length > 0){
            this.exportStoreData(response.body.data.store)
          }

          if(response.body.data.driver.length > 0){
            this.exportDriverData(response.body.data.driver)
          }

          if(response.body.data.cars.length > 0){
            this.exportCarsData(response.body.data.cars)
          }

          if(response.body.data.vendor.length > 0){
            this.exportVendorData(response.body.data.vendor)
          }

          if(response.body.data.orders.length > 0){
            this.exportOrdersData(response.body.data.orders)
          }
          if(response.body.data.product.length > 0){
            this.exportProductsData(response.body.data.product)
          }

          if(response.body.data.support.length > 0){
            this.exportSupportData(response.body.data.support)
          }

          this.spinner.hide();
          this.exportForm.reset();
          this.ngOnInit();

        } else {
          // Query Error
          this.apiCall.showToast(response.body.message, 'Error', 'errorToastr')
          this.spinner.hide();
        }
      },
      (error) => {
        this.apiCall.showToast('Server Error !!', 'Oops', 'errorToastr')
        console.log('Error', error)
        this.spinner.hide();
      }
    )
    // console.log(this.exportForm.value)
  }
  exportUserData(data) {
    if(data.length > 0){
      var userArray = []
      data.forEach(element => {
        var obj = {}
        obj['customerID'] = element.customerID
        obj['firstName'] = element.firstName
        obj['lastName'] = element.lastName
        obj['email'] = element.email
        obj['countryCode'] = element.countryCode
        obj['mobileNumber'] = element.mobileNumber
        obj['os'] = element.os
        obj['DOB'] = element.DOB
        obj['gender'] = element.gender
        obj['signupDate'] = element.signupDate
        obj['signupDateTime'] = element.signupDateTime
        obj['lastOrder'] = element.lastOrder
        obj['walletAmount'] = element.walletAmount
        obj['packageValue'] = element.packageValue
        userArray.push(obj)
      })
      this.usercsvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'User Report',
        useBom: true,
        noDownload: false,
        headers: ["Customer ID", "First Name", "Last Name", "Email", "Country Code", "Mobile Number", "Os", "DOB", "Gender", "Signup Date", "Signup Time", "Last Order", "Wallet Amount", "Package Amount"]
      };
      new  AngularCsv(userArray, "Customer Report", this.usercsvOptions);
    }
  }

  exportStoreData(data){
    if(data.length > 0){
      var bulkArray = []
      data.forEach(element => {
        var obj = {}
        obj['storeID'] = element.storeID
        obj['storeName'] = element.storeName
        obj['email'] = element.email
        obj['mobileNumber'] = element.mobileNumber
        obj['storeAddress'] = element.storeAddress
        obj['latitude'] = element.latitude
        obj['longitude'] = element.longitude
        // obj['managerLname'] = element.managerLname
        obj['createdDate'] = element.createdDate

        bulkArray.push(obj)
      })

      this.storecsvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Store Report',
        useBom: true,
        noDownload: false,
        headers: ["Store ID", "Store Name", "Email", "Mobile Number", "Address", "latitude", "longitude", "Register Date"]
      };
      new  AngularCsv(bulkArray, "Store Report", this.storecsvOptions);

    }
  }

  exportDriverData(data){
    if(data.length > 0){
      var bulkArray = []
      data.forEach(element => {
        var obj = {}
        obj['drId'] = element.drId
        obj['firstName'] = element.firstName
        obj['lastName'] = element.lastName
        obj['email'] = element.email
        obj['countryCode'] = element.countryCode
        obj['mobileNumber'] = element.mobileNumber
        bulkArray.push(obj)
      })

      this.drivercsvOption = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Driver Report',
        useBom: true,
        noDownload: false,
        headers: ["Driver ID", "First Name", "Last Name", "Email", "Country Code", "Mobile Number"]
      };
      new  AngularCsv(bulkArray, "Driver Report", this.drivercsvOption);
    }
  }
  exportCarsData(data){
    if(data.length > 0){
      var bulkArray = []
      data.forEach(element => {
        var obj = {}
        obj['carID'] = element.carID
        obj['carModel'] = element.carModel
        obj['licenseNumber'] = element.licenseNumber
        obj['lastDateOilChange'] = element.lastDateOilChange
        obj['lastDateGasRefill'] = element.lastDateGasRefill
        obj['expirationDate'] = element.expirationDate
        obj['currentMileage'] = element.currentMileage
        obj['startingMileage'] = element.startingMileage
        bulkArray.push(obj)
      })
      this.carscsvOption = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Car Report',
        useBom: true,
        noDownload: false,
        headers: ["Car ID", "Car Model", "License Number", "Last Date Oil Change", "Last Date Gas Refill", "Current Mileage", "Starting Mileage"]
      };
      new  AngularCsv(bulkArray, "Car Report", this.carscsvOption);
    }
  }

  exportVendorData(data){
    if(data.length > 0){
      var bulkArray = []
      data.forEach(element => {
        var obj = {}
        obj['vendorName'] = element.vendorName
        obj['storeID'] = element.storeID
        obj['storeName'] = element.storeName
        bulkArray.push(obj)
      })
      this.vendorcsvOption = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Vendor Report',
        useBom: true,
        noDownload: false,
        headers: ["Vendor Name", "Store ID", "Store Name"]
      };
      new  AngularCsv(bulkArray, "Vendor Report", this.carscsvOption);
    }
  }

  exportOrdersData(data){
    if(data.length > 0){
      var bulkArray = []
      data.forEach(element => {
        var obj = {}
        obj['orderIDs'] = element.orderIDs
        obj['customerID'] = element.customerID
        obj['firstName'] = element.firstName
        obj['addressPinDetails'] = element.addressPinDetails
        obj['fromTime'] = element.fromTime
        obj['toTime'] = element.toTime
        obj['orderOn'] = element.orderOn
        obj['deliveryDate'] = element.deliveryDate
        obj['totalQuantity'] = element.totalQuantity
        obj['totalAmount'] = element.totalAmount
        obj['discountAmount'] = element.discountAmount
        obj['grandTotal'] = element.grandTotal
        bulkArray.push(obj)
      })
      this.ordercsvOption = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Order Report',
        useBom: true,
        noDownload: false,
        headers: ["Order ID", "Customer ID", "Customer Name", "Address", "From Time", "To time", "Order Date", "Delivery Date", "Quantity", "Total Amount", "Discount Amount", "Grand Total"]
      };
      new  AngularCsv(bulkArray, "Order Report", this.ordercsvOption);
    }
  }

  exportProductsData(data){
    if(data.length > 0){
      var bulkArray = []
      data.forEach(element => {
        var obj = {}
        obj['productCode'] = element.productCode
        obj['productName'] = element.productName
        obj['arabicName'] = element.arabicName
        obj['categoryName'] = element.categoryName
        obj['productCategoryName'] = element.productCategoryName
        obj['productSubCategoryName'] = element.productSubCategoryName
        obj['qty'] = element.qty
        obj['maxQty'] = element.maxQty
        obj['productPrice'] = element.productPrice
        obj['productDiscount'] = element.productDiscount
        obj['specialInstructions'] = element.specialInstructions
        obj['isComingSoon'] = element.isComingSoon
        obj['managerPrice'] = element.managerPrice
        bulkArray.push(obj)
      })
      this.productcsvOption = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Product Report',
        useBom: true,
        noDownload: false,
        headers: ["Product Code",  "Product Name", "Arabic Name", "Category Name", 'Product Category Name', "SubCategory Name", "Quantity", "Maximum Quantity", "Product Price", "Product Discount", "Special Instructions", "Coming Soon", "Manager Change Price"]
      };
      new  AngularCsv(bulkArray, "Product Report", this.productcsvOption);
    }
  }

  exportSupportData(data){
    if(data.length > 0){
      var bulkArray = []
      data.forEach(element => {
        var obj = {}
        obj['supportID'] = element.supportID
        obj['orderIDs'] = element.orderIDs
        obj['customerID'] = element.customerID
        obj['firstName'] = element.firstName
        obj['status'] = element.status
        obj['createdAt'] = element.createdAt
        bulkArray.push(obj)
      })

      this.supportcsvOption = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Support Report',
        useBom: true,
        noDownload: false,
        headers: ["Support ID",  "Order ID", "Customer ID", "Customer Name", 'status', "Date"]
      };
      new  AngularCsv(bulkArray, "Support Report", this.supportcsvOption);

    }
  }
}
