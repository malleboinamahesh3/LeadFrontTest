import { Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { InviteTeamModel } from 'src/app/Models/invite-team-model';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { InviteTeamServiceService } from 'src/app/Services/invite-team-service.service';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CountriesService } from 'src/app/Services/Countries.service';
import { text } from '@angular/core/src/render3/instructions';
import { UserserviceService } from 'src/app/Services/userservice.service';
//import {DatepickerOptions} from 'ng2-datepicker';
import { stringify } from '@angular/core/src/util';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { SettingsComponent } from 'src/app/UI/Components/settings/settings.component';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;
@Component({
  selector: 'app-inviteteam',
  templateUrl: './inviteteam.component.html',
  styleUrls: ['./inviteteam.component.css']
})
export class InviteteamComponent implements OnInit {
  Inviteform: FormGroup;
  submitted = false;
  @Output() InviteTeamUpdate = new EventEmitter<string>();
  @Output() settingupdate = new EventEmitter();
  RandomVariable: boolean;
  CountryList: InviteTeamModel[];
  RoleList: InviteTeamModel[];
  countries: any;
  roles: any;
  edata: any;
  reportingmanagers: any;
  designationlist: any;
  reportingmanager: any;
  ReportManagerList: InviteTeamModel[];
  designations: any;
  designationid: any;
  data: any;
  maxDate = new Date();
  text: any;
  result: any;
  employeedata: any;
  empdata: any;
  employeeDOJ: any;
  employeeDOB: any;
 DOJ: Date;
  DOB: Date;
  BirthDate: any;
  JoiningDate: any;
  title: any;
  dateplaceholderformat:any;
  //   public myDatePickerOptions: DatepickerOptions = {

  //     dateFormat: 'dd.mm.yyyy',
  // };
  element: HTMLElement;
  maxdate: Date;
 // @ViewChild(SettingsComponent) myChild;


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

  private inviteteamSubscribe: any;
  today = new Date();
  public min: Date = new Date(1960, 1, 1);
  public max: Date = new Date(2018, 11, 31);
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private cookieservice:CookieService,private fB: FormBuilder, private InviteTeamService: InviteTeamServiceService , private UserService: UserserviceService, private router: Router, private countiresService: CountriesService, private toastr: ToastrService) {


    this.dpConfig.containerClass = 'theme-dark-blue';
    //this.dpConfig.dateInputFormat = 'DD MMM YYYY';
    this.dpConfig.dateInputFormat = this.cookieservice.get("saveddateformat");
    this.dateplaceholderformat=this.cookieservice.get("saveddateformat");
    this.dpConfig.showWeekNumbers = false;
    this.dpConfig.minDate = this.min ;
    this.dpConfig.maxDate = this.max ;

   }


  ngOnInit() {
    debugger;
    this.title ='Invite new manager / Sales personnel';
    this.UserService.notifyobservableInviteEdit$.subscribe((res) => {
      debugger
      if(res.option == 'Edit team member')
      {
        this.title = res.option;
          this.Inviteform.controls.employeename.setValue(res.value.employeename);
          this.Inviteform.controls.email.setValue(res.value.email);
          this.Inviteform.controls.country.setValue(res.value.country);
          this.Inviteform.controls.mobileno.setValue(res.value.mobileno);

          for (var i = 0; i <= this.roles.length; i++) {
            if (this.roles[i].name == res.value.rolename) {
              this.Inviteform.controls.roleid.setValue(this.roles[i].id);
              break;
            }
          }
          //this.Inviteform.controls.roleid.setValue(res.value.rolename);
          


          this.Inviteform.controls.reportingto.setValue(res.value.reportingto);
          this.Inviteform.controls.designationid.setValue(res.value.designationid);
          this.Inviteform.controls.ctc.setValue(res.value.ctc);
          this.Inviteform.controls.employeeDOB.setValue(new Date(res.value.employeedob));
          this.Inviteform.controls.employeeDOJ.setValue(new Date(res.value.employeedoj));
          this.Inviteform.controls.employeeid.setValue(res.value.employeeid);
      }
    })
    this.UserService.notifyObservableInviteNew$.subscribe((res) => {
      debugger
      if(res.option == 'Invite new manager / Sales personnel')
      {
        this.title = res.option;
          this.Inviteform.controls.employeename.setValue('');
          this.Inviteform.controls.email.setValue('');
          this.Inviteform.controls.country.setValue('India');
          this.Inviteform.controls.mobileno.setValue('');
          this.Inviteform.controls.roleid.setValue('');
          this.Inviteform.controls.reportingto.setValue('');
          this.Inviteform.controls.designationid.setValue('');
          this.Inviteform.controls.ctc.setValue('');
          this.Inviteform.controls.employeeid.setValue('');
          this.Inviteform.controls.employeeDOB.setValue('');
          this.Inviteform.controls.employeeDOJ.setValue('');

      }
    })
    // var today = new Date();
    // $('#datepicker').val(today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2));
    // $('#datepicker1').val(today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2));
    this.roles = [
      // { "id": "100", "name": "Admin", },
      { "id": "103", "name": "Manager" },
      { "id": "102", "name": "Executive" },
    ];

   


    this.InviteTeamService.getReportingManagerList().then(res => {
      this.reportingmanagers = res as InviteTeamModel[]
      this.reportingmanagers = JSON.parse(this.reportingmanagers);
    }
    );

    
    this.InviteTeamService.getdesignationList().then(res => {
      this.designationlist = res as InviteTeamModel[]


      this.designationlist = JSON.parse(this.designationlist);
    });
    this.CountryList = this.countiresService.getData();
    this.Inviteform = this.fB.group({
      employeename: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      country: ['India', Validators.required],
      mobileno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      roleid: ['', Validators.required],
      reportingto: ['', Validators.required],
      designationid: ['', Validators.required],
      ctc: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],

      employeeDOB: ['',Validators.required],
      employeeDOJ: ['',Validators.required],
      profileimagepath: [''],
      //country: ['India'],
      companyname: ['Kapil IT'],
      employeeid:[]
    });
    //this.text = '+91';

  }
  get f() { return this.Inviteform.controls; }

  trackByFn(index, item) {
    return index; // or item.id
  }

  error:any={isError:false,errorMessage:''};

  // compareTwoDates(){
  //   debugger
  //   this.Inviteform.value;
  //    if(new Date(this.Inviteform.controls.employeeDOJ.value)<new Date(this.Inviteform.controls.employeeDOB.value)){
  //       this.error={isError:true,errorMessage:'End Date canot before start date'};
  //    }
  // }

  DesignationListUpdate() {
    debugger;
    this.InviteTeamService.getdesignationList().then(res => {
      this.designationlist = res as InviteTeamModel[]
      this.designationlist = JSON.parse(this.designationlist);
    });
  }


  UpdateDesignation() {
    debugger;
    this.data = this.UserService.getDesignation();
    //this.data = "Web Designer";
    this.InviteTeamService.getdesignationList().then(res => {
      this.designationlist = res as InviteTeamModel[]
      this.designationlist = JSON.parse(this.designationlist);
      for (var i = 0; i <= this.designationlist.length; i++) {
        if (this.designationlist[i].designationname == this.data) {
          this.Inviteform.controls.designationid.setValue(this.designationlist[i].designationid);
          break;
        }
      }
    });
  }

  onSubmit() {
    debugger;

    this.submitted = true;
    // var jsonSettings = Formatters.JsonFormatter.SerializerSettings;
    
    // var date = document.getElementById('datepicker');
    // var inputDOB = (<HTMLInputElement>document.getElementById('datepicker')).value;
    // var inputDOJ = (<HTMLInputElement>document.getElementById('datepicker1')).value;
    // this.Inviteform.controls.employeeDOB.setValue(inputDOB);
    // this.Inviteform.controls.employeeDOJ.setValue(inputDOJ);
    if (this.Inviteform.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;
    }
    else {
     
      var now = new Date(this.Inviteform.controls.employeeDOB.value)
      now.setFullYear(now.getFullYear() + 10);
      this.JoiningDate = now.toISOString().slice(0, 10);

      if (new Date(this.Inviteform.controls.employeeDOJ.value) <= new Date(this.JoiningDate)) {
        this.toastr.warning("DOJ is not valid");
        this.Inviteform.controls.employeeDOJ.setValue('');
        return
      }
    }
    var date = new Date(this.Inviteform.controls.employeeDOB.value);
    this.employeeDOB = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON().slice(0,10);
    this.Inviteform.controls.employeeDOB.setValue(new Date(this.employeeDOB));
    var date = new Date(this.Inviteform.controls.employeeDOJ.value);
    this.employeeDOJ = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON().slice(0,10);
    this.Inviteform.controls.employeeDOJ.setValue(new Date(this.employeeDOJ));
    let _invite = this.Inviteform.value;
    this.edata = JSON.stringify(_invite);
    this.empdata = this.Inviteform.controls.employeename.value;
    this.InviteTeamService.getinvitedata(this.empdata).subscribe(result => {
      this.employeedata = result
      this.result = this.employeedata as string

      if(this.Inviteform.controls.employeeid.value != ''){
        this.result = 0
      }
      if (this.result == 0) {
        debugger;
        this.InviteTeamService.saveOrUpdatelead(this.edata).subscribe(res => {
          this.clear();
         // this.ngOnInit();
        
          
          this.InviteTeamUpdate.emit();

          this.settingupdate.emit();
          $('#invite').modal('hide');
         // this.myChild.click();
        });
      }
      if (this.result != 0) {
        this.toastr.info("Employee Name Already Exists..!");
      }
    });
  }

  clear() {
    this.Inviteform.reset();
    this.Inviteform.controls.country.setValue('India');
    this.Inviteform.controls.roleid.setValue('');
    this.Inviteform.controls.reportingto.setValue('');
    this.Inviteform.controls.designationid.setValue('');

    this.Inviteform.controls.companyname.setValue('Kapil IT');
    this.Inviteform.controls.profileimagepath.setValue(''); 
  }
  selectdrop(args) {
    debugger
    //this.text = this.Inviteform.controls.country.value;
    let m=args.target.options[args.target.selectedIndex].text
    let cou=m.split(' -')[0]
    this.text = args.target.value;
    this.Inviteform.controls.country.setValue(cou);
    this.Inviteform.controls.mobileno.setValue('');
  }
  
  Cancel(){
    debugger
    this.Inviteform.reset();
    $('#invite').modal('hide');
  }
}

