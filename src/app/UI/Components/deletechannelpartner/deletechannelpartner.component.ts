import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-deletechannelpartner',
  templateUrl: './deletechannelpartner.component.html',
  styleUrls: ['./deletechannelpartner.component.css']
})
export class DeletechannelpartnerComponent implements OnInit {
  deletechannelform: FormGroup;
  dealpopupdata: any;
  dealdata: any;
  BankAccType: any;
  BankIFSC: any;
  BankAccName: any;
  BankAccNo: any;
  CPcontact: any;
  CPemail: any;
  CPname: any;
  Hide: boolean;
  @Output() settingchanneldatadelete = new EventEmitter();


  constructor(private UserService: UserserviceService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.Hide = true;
    debugger
    this.UserService.notifyObservablechannel$.subscribe((res) => {
      debugger
      console.log(res);
      this.BankAccType = res.value.BankAccounttype;
      this.BankIFSC = res.value.bankIFSCCode;
      this.BankAccName = res.value.bankaccountname;
      this.BankAccNo = res.value.bankaccountno;
      this.CPcontact = res.value.referalcontactno;
      this.CPemail = res.value.referalemail;
      this.CPname = res.value.referalname;
      if ((this.BankAccName == null || this.BankAccName == '') && (this.BankAccNo == null || this.BankAccNo == '') && (this.BankAccType == null || this.BankAccType == '') && (this.BankIFSC == null || this.BankIFSC == '')) {
        this.Hide = false;
      }
      else {
        this.Hide = true;
      }
      this.deletechannelform.controls.Referralid.setValue(res.value.referalid);
      this.deletechannelform.controls.Parentsourceid.setValue(res.value.parentsourceid);
      this.deletechannelform.controls.Referralbankid.setValue(res.value.Refbankid);
    })



    this.deletechannelform = this.formBuilder.group({
      Referralid: [''],
      Referralbankid: [''],
      Parentsourceid: [''],
      // status: ['2']
    })
  }
  get f() { return this.deletechannelform.controls; }

  onSubmit() {
    let source = JSON.stringify(this.deletechannelform.value);
    debugger
    if (confirm("Are you sure, do you want to Delete ?")) {

      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      let options = {
        headers: httpHeaders
      };
      this.http.post(environment.apiURL + '/DeleteChannelPartner', source, options).subscribe(data => {
        debugger
        this.settingchanneldatadelete.emit();
            $('#DeleteChannnelPartner').modal('hide');
      });
    }
  }
  Cancel(){
    this.deletechannelform.reset();
    $('#DeleteChannnelPartner').modal('hide');
  }

}
