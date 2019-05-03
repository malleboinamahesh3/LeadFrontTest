import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { EditBusinessDealService } from "../../../Services/edit-business-deal.service";
import { UserserviceService } from 'src/app/Services/userservice.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

declare var $: any;
@Component({
  selector: 'app-editbusinessdeal',
  templateUrl: './editbusinessdeal.component.html',
  styleUrls: ['./editbusinessdeal.component.css']
})
export class EditbusinessdealComponent implements OnInit {
  editform: FormGroup;
  dealpopupdata: any;
  dealdata: any;
  dealname: any;
  dealvalue: any;
  dealid: any;
  @Output() settingeditbusinessdeal = new EventEmitter();
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  constructor(private UserService: UserserviceService, private http: HttpClient, private toastr: ToastrService, private formBuilder: FormBuilder, private editbussinessdealservice: EditBusinessDealService) { }

  ngOnInit() {
    debugger
    this.UserService.notifyObservabledeal$.subscribe((res) => {
      debugger
      //console.log(res);
      this.dealname = res.value.dealname;
      this.dealvalue = res.value.dealvalue;
      this.dealid = res.value.dealid;
      this.editform.controls.DealName.setValue(this.dealname);
      this.editform.controls.DealValue.setValue(this.dealvalue);
      this.editform.controls.Dealid.setValue(this.dealid);
    })

    this.editform = this.formBuilder.group({
      DealName: [this.dealname, [Validators.minLength(1),Validators.maxLength(100), Validators.required]],
      DealValue: [this.dealvalue, [Validators.minLength(1),Validators.maxLength(100), Validators.required]],
      Dealid: [this.dealid]
    })
    
  }

  get f() { return this.editform.controls; }

  // click(){
  //   debugger
  //   this.dealpopupdata = this.editbussinessdealservice.geteditpopupdata();
  //   this.dealname = this.dealpopupdata.dealname;
  //   this.dealvalue = this.dealpopupdata.dealvalue;
  //   this.dealid = this.dealpopupdata.dealid;
  //   this.editform.controls.DealName.setValue(this.dealname);
  //   this.editform.controls.DealValue.setValue(this.dealvalue);
  // }

  onSubmit() {
    debugger
    // stop here if form is invalid
    if (this.editform.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;

    }
    let source = JSON.stringify(this.editform.value);
    debugger
    if (confirm("Are you sure, do you want to update ?")) {

      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      let options = {
        headers: httpHeaders
      };
      this.http.post(environment.apiURL + '/InsertDeal', source, options).subscribe(data => {
        debugger
        this.settingeditbusinessdeal.emit();
        $('#EditBusinessDeal').modal('hide');
      });
    }
  }

  Cancel(){
    this.editform.reset();
    $('#EditBusinessDeal').modal('hide');
  }
}
