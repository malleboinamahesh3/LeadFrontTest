import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { IFSCcodevalidator, MobileNovalidator } from "../../../validators";
import { AddnewchanelpartnerService } from "../../../Services/addnewchanelpartner.service";
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr'
import { CountriesService } from 'src/app/Services/Countries.service';
import { UserserviceService } from 'src/app/Services/userservice.service';

declare var $: any;
@Component({
  selector: 'app-add-channelpartner',
  templateUrl: './add-channelpartner.component.html',
  styleUrls: ['./add-channelpartner.component.css']
})
export class AddChannelpartnerComponent implements OnInit {
  channelform: FormGroup;
  text: any;
  CountryList: any;
  result: any;
  channeldata: any;
  Chanelpartnerresult: any;
  title: any;
  @Output() settingchanneldataupdate = new EventEmitter();
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
  channelname(event): boolean {
    var regex = new RegExp("^[a-zA-Z 0-9]+$");
    var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(str)) {
      return true;
    }
    event.preventDefault();
    return false;
  }
  IFSC(event): boolean {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(str)) {
      return true;
    }
    event.preventDefault();
    return false;
  }

  Address(event): boolean {
    var regex = new RegExp("^[a-zA-Z 0-9-;]+$");
    var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (regex.test(str)) {
      return true;
    }
    event.preventDefault();
    return false;
  }

  constructor(private UserService: UserserviceService, private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService, private countiresService: CountriesService) { }

  ngOnInit() {

    this.UserService.notifyObservablechannelnew$.subscribe((res) => {
      debugger
      if (res.option == 'Edit') {
        console.log(res);
        this.title = 'Edit';

        if (res.value.BankAccounttype == '' || res.value.BankAccounttype == null) {
          this.channelform.controls.BankAccounttype.setValue('');
        } else {
          this.channelform.controls.BankAccounttype.setValue(res.value.BankAccounttype);
        }
        this.channelform.controls.referalname.setValue(res.value.referalname);
        this.channelform.controls.country.setValue(res.value.country);

        this.channelform.controls.bankIFSCCode.setValue(res.value.bankIFSCCode);
        this.channelform.controls.bankaccountname.setValue(res.value.bankaccountname);
        this.channelform.controls.bankaccountno.setValue(res.value.bankaccountno);
        this.channelform.controls.referalcontactno.setValue(res.value.referalcontactno);
        this.channelform.controls.referalemail.setValue(res.value.referalemail);
        this.channelform.controls.referalname.setValue(res.value.referalname);
        this.channelform.controls.address.setValue(res.value.address);
        if (res.value.Refbankid != undefined || res.value.Refbankid != null) {
          this.channelform.controls.referralbankid.setValue(res.value.Refbankid);
        } else {
          this.channelform.controls.referralbankid.setValue('');
        }
        this.channelform.controls.parentsourceid.setValue(res.value.parentsourceid);
        this.channelform.controls.referralid.setValue(res.value.referalid);
      }


    })
    this.UserService.notifyObservablechannelnewedit$.subscribe((res) => {
      debugger
      if (res.option == 'Add new') {
        this.title = 'Add new';
        this.channelform.controls.referalname.setValue('');
        this.channelform.controls.BankAccounttype.setValue('');
        this.channelform.controls.bankIFSCCode.setValue('');
        this.channelform.controls.bankaccountname.setValue('');
        this.channelform.controls.bankaccountno.setValue('');
        this.channelform.controls.referalcontactno.setValue('');
        this.channelform.controls.referalemail.setValue('');
        this.channelform.controls.referalname.setValue('');
        this.channelform.controls.address.setValue('');
        this.channelform.controls.referralbankid.setValue('');
        this.channelform.controls.parentsourceid.setValue('');
        this.channelform.controls.referralid.setValue('');
        this.channelform.controls.country.setValue('India');
      }
    })

    this.CountryList = this.countiresService.getData();
    this.channelform = this.fb.group({
      referalname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      country: ['India', Validators.required],
      //country: ['India'],
      referalcontactno: ['', [Validators.required, MobileNovalidator]],
      referalemail: ['', [Validators.required, Validators.email, , Validators.maxLength(50)]],
      address: ['', [Validators.minLength(2), Validators.required, Validators.maxLength(250)]],
      BankAccounttype: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      bankaccountname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      bankaccountno: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      bankIFSCCode: ['', [Validators.required, IFSCcodevalidator]],
      referralid: [],
      parentsourceid: [],
      referralbankid: []
      // BankAccounttype: [''],
      // bankaccountname: [''],
      // bankaccountno: [''],
      // bankIFSCCode: ['']
    });
    //this.text = '+91';
  }

  onSubmit() {
    debugger
    // stop here if form is invalid
    if (this.channelform.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;

    }
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });


    let Source = JSON.stringify(this.channelform.value);

    let HttpParams = { 'sourcename': this.channelform.controls.referalname.value }
    let options = {

      headers: httpHeaders,
      params: HttpParams
    };
    //let dealname = {'dealname':this.dealname}

    this.http.get(environment.apiURL + '/CheckCPSourceNameexist', options).subscribe(json => {
      this.channeldata = json

      this.result = this.channeldata as string
      if ((this.channelform.controls.referralid.value != "") && (this.channelform.controls.parentsourceid.value != "")) {
        this.result = 0;
      }
      else {
        //this.result = 0;
      }


      if (this.result == 0) {
        if (confirm("Are you sure, do you want to Save ?")) {

          let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          });
          let options = {
            headers: httpHeaders
          };
          this.http.post(environment.apiURL + '/InsertChannelPartner', Source, options).subscribe(data => {
            debugger
            this.Chanelpartnerresult = data as string
            if ((this.channelform.controls.referralid.value != '' || this.channelform.controls.referralid.value != null) && (this.channelform.controls.parentsourceid.value != '' || this.channelform.controls.parentsourceid.value != null)) {
              this.toastr.success("Well done! channel partner data updated ")
            } else {
              this.toastr.success("Well done! New channel partner has been saved ")
            }

            this.channelform.reset();
            this.channelform.controls.country.setValue('');
            this.channelform.controls.BankAccounttype.setValue('');
            this.settingchanneldataupdate.emit();
            $('#AddNewChannelPartner').modal('hide');
          });
        }
      }
      if (this.result != 0) {
        this.toastr.info("Channel name already exists..!");
      }
    });

  }
  close() {
    this.channelform.reset();
    this.channelform.controls.country.setValue('India');
    this.channelform.controls.BankAccounttype.setValue('');
  }

  selectdrop(args) {

    //this.text = this.channelform.controls.country.value;
    //this.text = args.target.value;

    //let m1=args.target.options[args.target.selectedIndex].text
    //let coun=m1.split(' -')[0]
    //this.countryname = args.target.value; 
    //this.countryname = args.target.options[args.target.selectedIndex].text; 
    //this.channelform.controls.country.setValue(coun)
    // this.channelform.controls.country.setValue(args.target.options[args.target.selectedIndex].text);
    this.channelform.controls.referalcontactno.setValue('');
  }


  Cancel() {
    this.channelform.reset();
    $('#AddNewChannelPartner').modal('hide');
  }
}
