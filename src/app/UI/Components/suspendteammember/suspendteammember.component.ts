import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { InviteTeamServiceService } from 'src/app/Services/invite-team-service.service';
import { CountriesService } from 'src/app/Services/Countries.service';

@Component({
  selector: 'app-suspendteammember',
  templateUrl: './suspendteammember.component.html',
  styleUrls: ['./suspendteammember.component.css']
})
export class SuspendteammemberComponent implements OnInit {
  Suspendmanagerform: FormGroup;
  dealdata: any;
  employeename: any;
  mobileno: any;
  email: any;
  designationname: any;
  ctc: any;
  employeedoj: any;
  reportingto: any;
  rolename: any;
  reportingmanagers: any;
  CountryList: any;
  countrycode: any;

  constructor(private UserService: UserserviceService,private fb: FormBuilder, private countiresService: CountriesService, private InviteTeamService: InviteTeamServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.InviteTeamService.getReportingManagerList().then(res => {
      this.reportingmanagers = res as string
      this.reportingmanagers = JSON.parse(this.reportingmanagers);
    }
    );
    this.CountryList = this.countiresService.getData();

    this.UserService.notifyObservablensuspendteam$.subscribe((res) => {
      debugger
      console.log(res);
      this.ctc = res.value.ctc;
      this.employeename = res.value.employeename;
      this.employeedoj = res.value.employeedoj;
      this.email = res.value.email;
      this.mobileno = res.value.mobileno;
      this.designationname = res.value.designationname;

      //reportingmanagers
      for (var i = 0; i <= this.reportingmanagers.length; i++) {
        if (this.reportingmanagers[i].employeeid == res.value.reportingto) {
          this.reportingto = this.reportingmanagers[i].employeename;
          break;
        }
      }

      //country
      for (var i = 0; i <= this.CountryList.length; i++) {
        if (this.CountryList[i].name == res.value.country) {
          this.countrycode = this.CountryList[i].code;
          break;
        }
      }


      //this.reportingto = res.value.reportingto;
      this.rolename = res.value.rolename;
      this.Suspendmanagerform.controls.employeeid.setValue(res.value.employeeid);
      this.Suspendmanagerform.controls.employeecode.setValue(res.value.employeecode);

    });

    this.Suspendmanagerform = this.fb.group({
      employeeid: [],
      employeecode: []
    })
  }

}
