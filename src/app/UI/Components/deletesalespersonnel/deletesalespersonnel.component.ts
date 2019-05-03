import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { CountriesService } from 'src/app/Services/Countries.service';

@Component({
  selector: 'app-deletesalespersonnel',
  templateUrl: './deletesalespersonnel.component.html',
  styleUrls: ['./deletesalespersonnel.component.css']
})
export class DeletesalespersonnelComponent implements OnInit {
  deleteManagerform: FormGroup;
  dealpopupdata: any;
  dealdata: any;
  employeename: any;
  mobileno: any;
  email: any;
  designationname: any;
  ctc: any;
  employeedoj: any;
  CountryList: any;
  countrycode: any;

  constructor(private UserService: UserserviceService, private countiresService: CountriesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    debugger

    this.CountryList = this.countiresService.getData();
    this.UserService.notifyObservableInvite$.subscribe((res) => {
      debugger
      console.log(res);
      this.ctc = res.value.ctc;
      this.employeename = res.value.employeename;
      this.employeedoj = res.value.employeedoj;
      this.email = res.value.email;
      this.mobileno = res.value.mobileno;
      this.designationname = res.value.designationname;
      for (var i = 0; i <= this.CountryList.length; i++) {
        if (this.CountryList[i].name == res.value.country) {
          this.countrycode = this.CountryList[i].code;
          break;
        }
      }
      this.deleteManagerform.controls.employeeid.setValue(res.value.employeeid);
      this.deleteManagerform.controls.employeecode.setValue(res.value.employeecode);

    })
    

      
    this.deleteManagerform = this.formBuilder.group({
      employeeid: [''],
      employeecode: [''],
     
    })
  }
  get f() { return this.deleteManagerform.controls; }

}
