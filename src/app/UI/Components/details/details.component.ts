import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DetailService } from 'src/app/Services/detail.service';
import { ToastrService } from 'ngx-toastr';

import { UserserviceService } from 'src/app/Services/userservice.service';
import { st } from '@angular/core/src/render3';
import { from } from 'rxjs';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


declare var $: any;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  today=new Date();
  detailsForm: FormGroup;
  empdata: FormArray;
  CompanyShow: boolean;
  Companyhide: boolean;
  submitted = false;
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  CharactersOnly(event): boolean {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(str)) {
      return true;
    }
    event.preventDefault();
    return false;
  }

  IandC: String;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private formBuilder: FormBuilder, DetailServices: DetailService, private UserService: UserserviceService, private toastr: ToastrService) { 
    this.dpConfig.containerClass = 'theme-dark-blue'; 
  }
  //this.DetailService.formData= this.detailsForm;
  ngOnInit() {
    //   this.registerForm = this.formBuilder.group({
    //     Customername: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]],
    //     password: ['', [Validators.required, Validators.minLength(6)]]
    // });


    this.CompanyShow = false;
    this.Companyhide = true;

    this.detailsForm = this.formBuilder.group({
      Companyname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      Address: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      Area: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      Date: [''],
      Addresstype: [''],
      empdata: this.formBuilder.array([
        this.getUnit()
      ])
    });
    this.detailsForm.controls.Addresstype.setValue("Individual")
  }
  private getUnit() {
    return this.formBuilder.group({
      fullname: [''],
      email: [''],
      Desgination: [''],
      mobileno: ['']

    });
  }

  get f() { return this.detailsForm.controls; }
  //get f() { return this.registerForm.controls; }

  private addUnit() {
    if (this.detailsForm.controls['empdata']["controls"].length < 4) {
      const control = <FormArray>this.detailsForm.controls['empdata'];
      control.push(this.getUnit());
    }
  }

  private removeUnit(i: number) {
    const control = <FormArray>this.detailsForm.controls['empdata'];
    control.removeAt(i);

  }




  onSubmit() {

    this.submitted = true;
    this.UserService.SetData(this.detailsForm.value);
    // stop here if form is invalid
    //this.detailsForm.controls['Address'].setErrors(null);

    //if(this.detailsForm.controls.)
    let IandC = this.detailsForm.controls.Addresstype.value
    if (IandC == "Individual") {



      // this.detailsForm.controls['Companyname'].setErrors(null);
      // this.detailsForm.controls['empdata'].setErrors(null)
      this.detailsForm.get('Companyname').clearValidators();
      this.detailsForm.get('Companyname').updateValueAndValidity();
      // var arrayControl = this.detailsForm.get('empdata') as FormArray;
      // var jjj = arrayControl.controls
      // this.detailsForm.get('empdata').clearValidators();
      // this.detailsForm.get('empdata').updateValueAndValidity();

    }
    else {

     // this.detailsForm.get('Date').clearValidators();
     // this.detailsForm.get('Date').updateValueAndValidity();
    }
    if (this.detailsForm.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;

    }
    else {
     // if (confirm("Are you sure, do you want to close ?")) {
      $('#addmore-company').modal('hide');
     // }
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.detailsForm.value));
      //this.toastr.success("Saved Successfully");
      //this.detailsForm.reset();

    }
  }

  clear() {
    this.detailsForm.reset();
    this.detailsForm.setControl('empdata', new FormArray([]));
    const control = <FormArray>this.detailsForm.controls['empdata'];
    control.push(this.getUnit());
    //this.detailsForm.controls.Addresstype.setValue("Individual")
    this.detailsForm.controls.Addresstype.setValue("Individual");
    this.CompanydetailsHideandShow('individual')
  }
  trackByFn(index, item) {
    
    return index; // or item.id
  }

  CompanydetailsHideandShow(checked: string) {


    if (checked == "individual") {

      this.CompanyShow = false;
      this.Companyhide = true;
      this.detailsForm.controls.Addresstype.setValue("Individual");
      this.detailsForm.controls.Address.setValue("");
      this.detailsForm.controls.Area.setValue("");
      this.detailsForm.controls.city.setValue("");
      this.detailsForm.controls.pincode.setValue("");
 
    }
    else {
      this.CompanyShow = true;
      this.Companyhide = false;
      this.detailsForm.get('Companyname').setValidators(Validators.required);
      this.detailsForm.controls.Addresstype.setValue("Company");
      this.detailsForm.controls.Address.setValue("");
      this.detailsForm.controls.Area.setValue("");
      this.detailsForm.controls.city.setValue("");
      this.detailsForm.controls.pincode.setValue("");
      this.detailsForm.setControl('empdata', new FormArray([]));
      const control = <FormArray>this.detailsForm.controls['empdata'];
    control.push(this.getUnit());

    }
  }



//   CompanydetailsHideandShow(checked: string) {


//     if (checked == "individual") {

//       this.CompanyShow = false;
//       this.Companyhide = true;
//       this.clear();
//       this.detailsForm.reset();
//       this.detailsForm.controls.Addresstype.setValue("Individual")
//     }
//     else {
//       this.CompanyShow = true;
//       this.Companyhide = false;
//       this.clear() ;
//       this.detailsForm.controls.Addresstype.setValue("Company");
// this.detailsForm.reset();
//       //Companyname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
//        //this.detailsForm.get('Companyname').validator('',Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
//       //this.detailsForm.get('Companyname').updateValueAndValidity();
//       // this.detailsForm.controls.validator;
//       //this.submitted = true;
//     }
//   }
}
