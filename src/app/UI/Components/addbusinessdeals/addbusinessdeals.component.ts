import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-addbusinessdeals',
  templateUrl: './addbusinessdeals.component.html',
  styleUrls: ['./addbusinessdeals.component.css']
})
export class AddbusinessdealsComponent implements OnInit {
  addbulkdealsform: FormGroup;
  @Output() settingaddbulkdeal = new EventEmitter();
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // CharactersOnly(event): boolean {
  //   var regex = new RegExp("^[a-zA-Z ]+$");
  //   var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  //   if (regex.test(str)) {
  //     return true;
  //   }
  //   event.preventDefault();
  //   return false;
  // }

  constructor(private fB: FormBuilder,private http: HttpClient, private UserService: UserserviceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.addbulkdealsform = this.fB.group({
      dealcount: [],
     
      addbulkdeals: this.fB.array([
      ]),
    });

    // Dealname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    // DealValue: ['',[Validators.required]],
  }

  private addUnit(i: number) {
    debugger
    var num = this.addbulkdealsform.controls.dealcount.value;
    if(this.addbulkdealsform.controls.dealcount.value == '' || this.addbulkdealsform.controls.dealcount.value == null){
      this.toastr.info("Please enter no of deals to add");
    }
    var y = +num;
    for (var _i = 0; _i < y; _i++) {
      if (this.addbulkdealsform.controls['addbulkdeals']["controls"].length < 10) {
        const control = <FormArray>this.addbulkdealsform.controls['addbulkdeals'];
        control.push(this.getUnit(i));
      }
    }
    this.addbulkdealsform.controls.dealcount.setValue('');
  }

  private getUnit(i: number) {
    debugger
    return this.fB.group({
      Dealname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      DealValue: ['', [Validators.required]],
    });
  }

  private removeUnit(i: number) {
    debugger
    const control = <FormArray>this.addbulkdealsform.controls['addbulkdeals'];
    control.removeAt(i);
  }

  private removeall() {
    debugger
    for (var i = 9; i >= 0; i--) {
      const control = <FormArray>this.addbulkdealsform.controls['addbulkdeals'];
      control.removeAt(i);
    }
    $('#AddBusinessDeals').modal('hide');
  }

  onSubmit() {
    debugger
    if (this.addbulkdealsform.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;
    }
    
   
    let source = JSON.stringify(this.addbulkdealsform.value);
    // if(source == ""){
    //   this.toastr.warning("Please fill all the required mandatory fields..!");
    //   return;
    // }

    
    if(this.addbulkdealsform['controls']['addbulkdeals']['controls'].value == []){
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;
    }

    debugger
    if (confirm("Are you sure, do you want to Save ?")) {

      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      let options = {
        headers: httpHeaders
      };
      this.http.post(environment.apiURL + '/InsertDeal', source, options).subscribe(data => {
        debugger
        this.settingaddbulkdeal.emit();
        this.close();
        $('#AddBusinessDeals').modal('hide');
      });
    }
  }

  get f() { return this.addbulkdealsform.controls; }

  close(){
      this.addbulkdealsform.reset();
      this.removeall();
  }

  change(){
    if(this.addbulkdealsform.controls.dealcount.value == '' || this.addbulkdealsform.controls.dealcount.value == null){
      this.toastr.info("Please enter no of deals to add");
    }
    if(this.addbulkdealsform.controls.dealcount.value > 10){
      this.addbulkdealsform.controls.dealcount.setValue('');
      this.toastr.warning("Enter 10 business deals");
    }
    
  }
}
