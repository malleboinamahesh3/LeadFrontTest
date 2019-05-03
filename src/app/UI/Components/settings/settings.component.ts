import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LeadService } from 'src/app/Services/lead.service';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';
import { EditbusinessdealComponent } from "../EditBusinessDeal/editbusinessdeal.component";
import { EditBusinessDealService } from "../../../Services/edit-business-deal.service";
import { Subject, from } from "rxjs";
import { UserserviceService } from 'src/app/Services/userservice.service';
import { CountriesService } from 'src/app/Services/Countries.service';
import { CookieService } from 'ngx-cookie-service';

declare let $: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  SettingsForm: FormGroup;
  EmployeesInfo: any;
  ChannelPartenerInfo: any;
  dealids: any;
  channeldatatest: any;
  arraydata = [];
  popupdataofeditbussiness: Subject<any> = new Subject();
  userFilter: any = { employeename: '' };
  userFilterchannel: any = { referalname: '' };
  userFilterdeal: any = { dealname: '' };
  
  CountryList: any
  newbusinessdealsdata:any
  exportleaddata:any
  assignleadata:any
  dateformats:any
  constructor(private cookieservice: CookieService,private formBuilder: FormBuilder,private countiresService: CountriesService,private UserService: UserserviceService, private http: HttpClient, private leadservice: LeadService, private EditBusinessDealService: EditBusinessDealService) { }
  // @ViewChild(EditbusinessdealComponent) myChild;
  ngOnInit() {


    this.newbusinessdealsdata=[
      {"id":1,"name":"Only admin"},
      {"id":2,"name":"All users"},
      {"id":3,"name":"Only Managers"},
      {"id":4,"name":"Selected users"}
    ]

    this.exportleaddata=[
      {"id":1,"name":"Only admin"},
      {"id":2,"name":"All users"},
      {"id":3,"name":"Only Managers"},
      {"id":4,"name":"Selected users"}
    ]

    this.assignleadata=[
      {"id":1,"name":"Only admin"},
      {"id":2,"name":"All users"},
      {"id":3,"name":"Only Managers"},
      {"id":4,"name":"Selected users"}
    ]

    this.SettingsForm = this.formBuilder.group({
      currencycode: [''],
      dateformat:['']
    })

    this.CountryList = this.countiresService.getData();
    this.dateformats=this.countiresService.getdateformats();

    this.http.get('http://192.168.2.70:9876/api/AjaxAPI/GetEmployeesDetils').subscribe(json => {
      debugger;
      this.EmployeesInfo = json;
      this.EmployeesInfo = JSON.parse(this.EmployeesInfo);
      this.EmployeesInfo = this.EmployeesInfo.Employee


    });
    this.http.get('http://192.168.2.70:9876/api/AjaxAPI/GetChannelpartners').subscribe(json => {
      debugger;
      this.ChannelPartenerInfo = json;
      this.ChannelPartenerInfo = JSON.parse(this.ChannelPartenerInfo);
      this.ChannelPartenerInfo = this.ChannelPartenerInfo.CP;
    });

    this.leadservice.getDealList().then(res => {
      this.dealids = res as string
      debugger;
      this.dealids = JSON.parse(this.dealids);
      this.dealids = this.dealids.deals;
    });
  }


  openpopUp(dealdata) {
    debugger
    //edit
    this.UserService.notifyOtherdeal({ option: 'call_child', value: dealdata });
    //this.EditBusinessDealService.seteditpopupdata(dealdata);
    this.popupdataofeditbussiness.next(dealdata);
    $('#EditBusinessDeal').modal('show');
    // this.myChild.click();
  }
  openpopUpdata(dealdata) {
    debugger
    //delete
    this.UserService.notifyOtherdeal({ option: 'call_child', value: dealdata });
    //this.EditBusinessDealService.setdeletepopupdata(dealdata);
    this.popupdataofeditbussiness.next(dealdata);
    $('#DeleteBusinessDeal').modal('show');
  }

  openpopUpchannel(channeldata) {
    debugger
    this.UserService.notifyOtherchannelnew({ option: 'Edit', value: channeldata });
    //this.EditBusinessDealService.setdeletepopupdata(channeldata);
    this.popupdataofeditbussiness.next(channeldata);
    $('#AddNewChannelPartner').modal('show');
  }

  openpopUpchannelnew() {
    debugger
    this.UserService.notifyOtherchanneledit({ option: 'Add new', value: '' });
    //this.EditBusinessDealService.setdeletepopupdata(channeldata);
    this.popupdataofeditbussiness.next('');
    $('#AddNewChannelPartner').modal('show');
  }

  openpopUpchanneldelete(channeldata) {
    debugger
    this.UserService.notifyOtherchannel({ option: 'Testing', value: channeldata });
    //this.EditBusinessDealService.setdeletepopupdata(channeldata);
    this.popupdataofeditbussiness.next(channeldata);
    $('#DeleteChannnelPartner').modal('show');
  }

  openpopUpInvite(data) {
    debugger
    this.UserService.notifyOtherInviteEdit({ option: 'Edit team member', value: data });
    //this.EditBusinessDealService.setdeletepopupdata(data);
    this.popupdataofeditbussiness.next(data);
    $('#invite').modal('show');
  }

  openpopUpDeleteInvite(data) {
    debugger
    this.UserService.notifyOtherInvite({ option: 'call_child', value: data });
    //this.EditBusinessDealService.setdeletepopupdata(data);
    this.popupdataofeditbussiness.next(data);
    $('#DeleteSalesPersonnnel').modal('show');
  }

  openpopUpInviteSuspend(data) {
    debugger
    this.UserService.notifyOtherInvitesuspend({ option: 'call_child', value: data });
    //this.EditBusinessDealService.setdeletepopupdata(data);
    this.popupdataofeditbussiness.next(data);
    $('#SuspendTeamMember').modal('show');
  }

  openpopUpInvitenew() {
    debugger
    this.UserService.notifyOtherInvitenew({ option: 'Invite new manager / Sales personnel', value: '' });
    //this.EditBusinessDealService.setdeletepopupdata(data);
    this.popupdataofeditbussiness.next();
    $('#invite').modal('show');
  }

  openpopUpInviteTransfer(data) {
    debugger
    this.UserService.notifyOtherInviteTransfer({ option: 'call_child', value: data });
    //this.EditBusinessDealService.setdeletepopupdata(data);
    //this.popupdataofeditbussiness.next(data);
    $('#TransferLeads').modal('show');
  }


  click() {
    debugger
    this.http.get('http://192.168.2.70:9876/api/AjaxAPI/GetEmployeesDetils').subscribe(json => {
      debugger;
      this.EmployeesInfo = json;
      this.EmployeesInfo = JSON.parse(this.EmployeesInfo);
      this.EmployeesInfo = this.EmployeesInfo.Employee

      this.http.get('http://192.168.2.70:9876/api/AjaxAPI/GetChannelpartners').subscribe(json => {
        debugger;
        this.ChannelPartenerInfo = json;
        this.ChannelPartenerInfo = JSON.parse(this.ChannelPartenerInfo);
        this.ChannelPartenerInfo = this.ChannelPartenerInfo.CP;
      });
    });

    this.leadservice.getDealList().then(res => {
      this.dealids = res as string
      debugger;
      this.dealids = JSON.parse(this.dealids);
      this.dealids = this.dealids.deals;
    });
  }

  selectFormat(data, args) {
    debugger;
    let d = data
    if (data == "currencyformat") {
      let n = this.SettingsForm.controls.currencycode.value;
      let m = args.target.options[args.target.selectedIndex].text

      let a = m.split(' -')[0];
      let b = m.split('-')[1];
      let c = m.split('-')[2];

      this.cookieservice.set("savedformat", a)
      this.cookieservice.set("symbolofcurrency", c)
      this.countiresService.setcookiedata(a);
      let l = this.cookieservice.get("savedformat")
    }
    else if (data == "dateformat") {
      let n = this.SettingsForm.controls.dateformat.value;
      this.cookieservice.set("saveddateformat",n)
      //let m = args.target.options[args.target.selectedIndex].text
    }
  }







}
