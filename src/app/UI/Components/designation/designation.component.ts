import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import {InviteteamComponent} from '../inviteteam/inviteteam.component'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { UserserviceService } from 'src/app/Services/userservice.service';

declare var $: any;
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  
 @Output() DesignationListUpdate = new EventEmitter<any>();

  designationform: FormGroup;
  designationname: any;
  designationid: any;
  designationdata: any;
  result: any;
  submitted = false;
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
 
  constructor(private fB: FormBuilder,  private http: HttpClient, private toastr: ToastrService, private UserService: UserserviceService) { }
  @ViewChild(InviteteamComponent) myChild;
  ngOnInit() {
    this.designationform = this.fB.group({
      designationname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(75)]],
      designationid: [0],

    });
  }
  get f() { return this.designationform.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.designationform.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;

    }
    this.designationname = this.designationform.controls.designationname.value;
    this.designationid = this.designationform.controls.designationid.value;
debugger;
    this.UserService.SetDesignation(this.designationname);

    let _designation = JSON.stringify(this.designationform.value);
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let HttpParams = { 'designationname': this.designationname}
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };
   

    this.http.get(environment.apiURL + '/CheckDesignationexist', options).subscribe(json => {
      this.designationdata = json

      this.result = this.designationdata as string
      if (this.result == 0) {
        if (confirm("Are you sure, do you want to Save ?")) {
          this.http.post(environment.apiURL + '/Insertdesignation', _designation, options).subscribe(json => {
            this.designationdata = json as string
            this.designationform.reset();
            this.DesignationListUpdate.emit();
           
            //this.toastr.success("Designation Saved Successfully");
             $('#designation').modal('hide');
            this.myChild.UpdateDesignation();

          });
        }
      }
      if (this.result != 0) {
        this.toastr.info("Designation already exists..!");

      }
    });


  }




  clear() {
    this.designationform.reset();
    $('#designation').modal('hide');
  }
}
