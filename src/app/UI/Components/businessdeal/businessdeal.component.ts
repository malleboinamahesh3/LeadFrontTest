import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BussinessdealService } from 'src/app/Services/bussinessdeal.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { UserserviceService } from 'src/app/Services/userservice.service';


declare var $: any;

@Component({
  selector: 'app-businessdeal',
  templateUrl: './businessdeal.component.html',
  styleUrls: ['./businessdeal.component.css']
})
export class BusinessdealComponent implements OnInit {

  @Output() DealListUpdate = new EventEmitter<any>();
  dealname: any;
  dealvalue: any;
  result: any;
  bussinessform: FormGroup;
  dealdata: any;
  submitted = false;
  data;
  datasend;
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  constructor(private fB: FormBuilder, private BussinessService: BussinessdealService, private http: HttpClient, private toastr: ToastrService, private UserService: UserserviceService) { }

  ngOnInit() {
    this.bussinessform = this.fB.group({
      Dealname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      DealValue: ['',[Validators.required]],
      addbulkdeals: this.fB.array([
        
      ]), 
      
    });
    this.addUnit(0);
  }
  private addUnit(i: number) {
    debugger
        const control = <FormArray>this.bussinessform.controls['addbulkdeals'];
        control.push(this.getUnit(i));

  }
  private getUnit(i: number) {
    debugger
    return this.fB.group({
      Dealname: [''],
      DealValue: [''],
    });
  }
  get f() { return this.bussinessform.controls; }
  onSubmit() {
debugger;
    this.submitted = true;

    if (this.bussinessform.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;

    }
    
    this.dealname = this.bussinessform.controls.Dealname.value;
    this.dealvalue = this.bussinessform.controls.DealValue.value;

    this.bussinessform['controls']['addbulkdeals']['controls'][0]['controls']['Dealname'].setValue(this.dealname);
    this.bussinessform['controls']['addbulkdeals']['controls'][0]['controls']['DealValue'].setValue(this.dealvalue);
    //this.UserService.SetDataBusiness(this.dealname);
    
    let _deal = JSON.stringify(this.bussinessform.value);
    this.UserService.SetDataBusiness(this.dealname);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(jj));
    // this.bussinessform.reset();

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let HttpParams = { 'dealname': this.dealname }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };
    //let dealname = {'dealname':this.dealname}

    this.http.get(environment.apiURL + '/CheckDealnameexist', options).subscribe(json => {
      this.dealdata = json

      this.result = this.dealdata as string
      if (this.result == 0) {
        if (confirm("Are you sure, do you want to Save ?")) {
          this.http.post(environment.apiURL + '/InsertDeal', _deal, options).subscribe(json => {
            this.data = json as string


            //alert('SUCCESS!! :-)\n\n' + JSON.stringify(_deal));
            this.bussinessform.reset();
            this.DealListUpdate.emit();

            //this.toastr.success("Bussiness Deal Saved Successfully");
            $('#newdeal').modal('hide');
          });
        }
      }
      if (this.result != 0) {
        this.toastr.info("Bussiness Deal already exists..!");
        //this.toastr.info();
      }
    });
    //if (this.result == 0) {

    //}
  }
  clear() {
   
    this.bussinessform.reset();
    $('#newdeal').modal('hide');
  }
}
