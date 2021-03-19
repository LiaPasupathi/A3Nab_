import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators,FormArray } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';
import { DatePipe } from '@angular/common';
declare var $:any;


@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css'],
  providers: [DatePipe]
})
export class RulesComponent implements OnInit {
  getrules: any = {};
  status: any = true;
  data : any = {};
  addRules: FormGroup;
  bsValue: Date = new Date();
  bsValue1: Date = new Date();
  selectedType:any;
  options:any;


  constructor( private formBuilder:FormBuilder,
    private apiCall: ApiCallService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getruleslist("active");

    this.addRules   = this.formBuilder.group({
      title: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      triggerName: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      startDate: ['',  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      endDate: ['' ,  [ Validators.required, Validators.pattern(/^\S+(?: \S+)*$/)]],
      // type: [''],
      // walletAmount: [''],
      // points: [''],
      // notifyTitle: [''],
      // notifyMessage: [''],
      // options: [''],
      options: this.formBuilder.array([
        this.getactionStyle()
      ]),
  });

  this.options = this.addRules.controls.options.value

  }

  private getactionStyle() {
    return this.formBuilder.group({
      type: [''],
      walletAmount: [''],
      points: [''],
      notifyTitle: [''],
      notifyMessage: ['']
    })
  }

  addaction(){
    let control = <FormArray>this.addRules.controls.options;
    control.push(
      this.formBuilder.group({
        type: [''],
        walletAmount: [''],
        notifyTitle: [''],
        notifyMessage: ['']
      })
    )
  }

   Change(event) {
    this.selectedType = event.target.value;
  }

  getruleslist(status){
    this.data.status = status
    var params = {
      url: 'admin/rulesList',
      data: this.data
    }


    this.apiCall.commonPostService(params).subscribe((result:any)=>{
      let res = result.body;
      if(res.error=="false")
      {    
           this.getrules = res.data.rules;
        
      }else{
        this.apiCall.showToast(res.message, 'Error', 'errorToastr')
      }
    },(error)=>{
       console.error(error);
    });
  }


onchange(){
  let stat = this.status ? "active" : "inactive"; 
  this.getruleslist(stat);
}

statchange(event,id){
  let stat = event.target.checked ? "true" : "false"; 
  var data= {}
  data['id']=id
  data['status'] =stat

  let params ={
    url:"admin/ruleStatus",
    data : data
  }
  this.apiCall.commonPostService(params).subscribe((result:any)=>{
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

async onSubmit(){
  if(!this.addRules.valid){
    this.apiCall.showToast('Please Fill the mandatory field', 'Error', 'errorToastr')
    return false;
  }

  const formData = new FormData();

  let opt:any ={};

  const postData = this.addRules.value

  opt.title = postData.title;
  opt.triggerName = postData.triggerName;
  opt.startDate = this.datePipe.transform(postData.startDate, 'yyyy-MM-dd');
  opt.endDate = this.datePipe.transform(postData.endDate, 'yyyy-MM-dd');
  opt.options = JSON.stringify(postData.options);

  var params = {
    url: 'admin/addNewRule',
    data: opt
  }
 
  this.apiCall.commonPostService(params).subscribe(
    (response: any) => {
      if (response.body.error == 'false') {
        // Success
        this.apiCall.showToast(response.body.message, 'Success', 'successToastr')
        $('#add_rule_btn').modal('hide');
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

del_rules(id)
{
  this.data.id = id
  this.data.isDelete =1
  
  var params = {
    url: 'admin/deleteRules',
    data: this.data
    
  }

  this.apiCall.commonPostService(params).subscribe((result:any)=>{
    if(result.body.error=="false")
    {
   
      this.apiCall.showToast(result.body.message, 'Success', 'successToastr')
      this.ngOnInit();
     }
     else{
      this.apiCall.showToast(result.body.message, 'Error', '')
     }
 });
}

}
