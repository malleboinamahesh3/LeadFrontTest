import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FollowupService } from "../../../Services/followup.service";
import { UserserviceService } from 'src/app/Services/userservice.service';
import { FreshbusinessComponent } from '../freshbusiness/freshbusiness.component';
import { ToastrService } from 'ngx-toastr';
import { SoldserviceService } from 'src/app/Services/soldservice.service';
import { IFSCcodevalidator } from "../../../validators";
import { CookieService } from 'ngx-cookie-service';




declare let $: any;

@Component({
  selector: 'app-soldbusiness',
  templateUrl: './soldbusiness.component.html',
  styleUrls: ['./soldbusiness.component.css']
})
export class SoldbusinessComponent implements OnInit {
  soldform: FormGroup;
  //payments: FormArray;
  //leadbankdetails: FormArray;
  data: any;
  symbol: any;
  paymentarray = [];
  CPpaymentarray = [];
  paymentmodes: any;
  accounttypes: any;
  deallist: any;
  today = new Date();
  CompanyShow: boolean;
  Companyhide: boolean;
  Edithide: boolean;
  Edithidedata: boolean;
  EditShow: boolean;
  Individualshow: boolean;
  Individualhide: boolean;
  leadid: any;
  Editbuttonshow: boolean;
  EditCancelbuttonshow: boolean;
  reasonshow: boolean;
  channelhide: boolean;
  CPBankjson: FormArray;
  received: any;
  receivable: any;
  paymenthide: boolean;
  paymentshow: boolean;
  CPpaymenthide: boolean;
  finaldealvalue: any;
  CPpaymentshow: boolean;
  UpdateButtonShow: boolean
  otherdetailsShow: boolean
  CompanyDetailsShowOnly: boolean
  bankaccounttype: any;
  bankaccountname: any;
  bankifsccode: any;
  bankaccountno: any;
  channelname: any;
  text: any;
  leaddata: any;
  channeldata: any;
  channelid: any;
  customerid: any;
  sourcename: any;
  childmessage: boolean;
  leadbank: any;
  stageflag: any;
  tempdeallist: any;
  ActualDealvalue = 0;
  PaymentTotalamount = 0;
  Paymentamount = 0;
  ReceivingAmount = 0;
  ActualDeallist: any;
  DATATTTT = [];
  mindate: Date;
  id = 0;
  cpid = 0;
  dateplaceholderformat:any;
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
  SpecialcharactersOnly(event): boolean {
    var regex = new RegExp("^[a-zA-Z 0-9-]+$");
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

  @Output() refreshfunnel = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter();
  @ViewChild(FreshbusinessComponent) freshbusinessComp;

  public max: Date = this.today;
  public min: Date = this.mindate
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private cookieservice: CookieService, private formBuilder: FormBuilder, private UserService: UserserviceService, private Soldservice: SoldserviceService, private toastr: ToastrService, private _followupservice: FollowupService) {
    this.dpConfig.containerClass = 'theme-dark-blue';
   // this.dpConfig.dateInputFormat = 'DD MMM YYYY';
   this.dpConfig.dateInputFormat =this.cookieservice.get("saveddateformat");
  // this.dateplaceholderformat=this.cookieservice.get("saveddateformat");
    this.dpConfig.showWeekNumbers = false;
    this.dpConfig.maxDate = this.max;
  }

  ngOnInit() {

    debugger;

    this.Editbuttonshow = true;
    this.EditCancelbuttonshow = false;
    this.Edithide = true;
    this.reasonshow = false;

    this.show();
    this.showCP();
    this.paymenthide = false;
    this.CPpaymenthide = false;

    this.soldform = this.formBuilder.group({
      dealvalue: ['', Validators.required],
      finaldealvalue: ['', Validators.required],
      stageid: ['104', Validators.required],
      reasonforcancel: ['', Validators.required],
      invoicedate: [this.today],
      received: [''],
      receivable: [''],
      // received:[this.leaddata[0].received],
      // receivable:[this.leaddata[0].receivable],
      leadid: [''],
      paymentflag: ['N'],
      leadbankflag: ['N'],
      CPpaymentsflag: ['N'],
      CPbankflag: ['N'],
      dealflag: ['N'],
      PaymentsJSON: this.formBuilder.array([
        this.getUnit()
      ]),
      leadbankjson: this.formBuilder.array([
        this.getbankdetails()
      ]),
      CPPaymentsjson: this.formBuilder.array([
        this.getchannel()
      ]),
      CPBankjson: this.formBuilder.array([

        this.getCPbankdetails()
      ])
    });
    this.soldform.controls.reasonforcancel.clearValidators();
    this.soldform.controls.reasonforcancel.updateValueAndValidity();


    this.UserService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'call_child') {
        debugger
        this.leadid = res.value.leadid
        // console.log("lead id in sold", this.leadid);
        this.Soldservice.Getleaddata(this.leadid).subscribe(leaddata => {
          debugger
          this.leaddata = leaddata as string;
          this.leaddata = JSON.parse(this.leaddata)
          this.channelid = this.leaddata[0].subsourceid;
          this.sourcename = this.leaddata[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].vw[0].sourcename

          if (this.sourcename == "Channel Partner") {

            this.channelhide = true;

            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].setValidators([Validators.required]);
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].updateValueAndValidity();

            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].setValidators([Validators.required]);
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].updateValueAndValidity();

            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValidators([Validators.required]);
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();

            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].setValidators([Validators.required, IFSCcodevalidator]);
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].updateValueAndValidity();


            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValidators([Validators.required]);
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].updateValueAndValidity();

            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].setValidators([Validators.required]);
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].updateValueAndValidity();

            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].setValidators([Validators.required]);
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].updateValueAndValidity();

          } else {
            this.channelhide = false;
            // this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValidators([Validators.required]);
            // this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();

            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].setValue('');
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].clearValidators();
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].updateValueAndValidity();
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].setValue('');
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].clearValidators();
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].updateValueAndValidity();
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValue('');
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].clearValidators();
            this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].setValue('');
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].clearValidators();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].updateValueAndValidity();

            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue('');
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].clearValidators();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].updateValueAndValidity();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].setValue('');
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].clearValidators();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].updateValueAndValidity();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].setValue('');
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].clearValidators();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].updateValueAndValidity();
          }
          //this.customerid = this.leaddata[0].lc[0].leadcustomerid;
          this.Soldservice.Getchannelcheck(this.channelid).subscribe(channeldata => {
            debugger
            if (channeldata != "") {
              this.channeldata = channeldata as string;
              this.channeldata = JSON.parse(this.channeldata);
              this.channelname = this.channeldata[0].referalname;
              this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].patchValue(this.channeldata[0].BankAccounttype)
              this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].patchValue(this.channeldata[0].bankaccountname)
              this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].patchValue(this.channeldata[0].bankaccountno)
              this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].patchValue(this.channeldata[0].bankIFSCCode)


              if (this.channeldata[0].BankAccounttype == '' || this.channeldata[0].BankAccounttype == null) {
                // this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue('')
                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].setValue('');
                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].clearValidators();
                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].updateValueAndValidity();

                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue('1');
                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].clearValidators();
                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].updateValueAndValidity();

                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].setValue('');
                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].clearValidators();
                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].updateValueAndValidity();

                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].setValue('');
                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].clearValidators();
                this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].updateValueAndValidity();
              }
              debugger;
              this.bankaccountname = this.channeldata[0].bankaccountname;
              this.bankaccounttype = this.channeldata[0].BankAccounttype;
              this.bankaccountno = this.channeldata[0].bankaccountno;
              this.bankifsccode = this.channeldata[0].bankIFSCCode;
              if ((this.bankaccountname == "" || this.bankaccountname == null) && (this.bankaccounttype == "" || this.bankaccounttype == null) && (this.bankaccountno == "" || this.bankaccountno == null) && (this.bankifsccode == "" || this.bankifsccode == null)) {
                this.Edithide = false;
                this.Edithidedata = true;
                this.channelhide = true;
              }
              else {
                this.Edithide = true;
                this.Edithidedata = false;
                this.channelhide = true;
              }
            }
          });
          this.received = this.leaddata[0].dm[0].received;
          if (this.received > 0) {
            debugger;
            //dealstage adjusting
            this.tempdeallist = this.deallist;
            for (var i = 0; i < this.tempdeallist.length; i++) {

              if (this.tempdeallist[i].stagename != "Cancel" && this.tempdeallist[i].stagename != "Sold") {

                let kk = this.tempdeallist
                let dd = kk.slice(5, 7)
                this.tempdeallist = dd;

              }

            }
            this.deallist = this.tempdeallist

            this.childmessage = false;
          }
          else {
            this.childmessage = true;
            this.tempdeallist = this.ActualDeallist
            let kk = this.tempdeallist
            let dd = kk.slice(1, 6)
            this.deallist = dd;
          }
          // this.receivable =this.leaddata[0].finaldealvalue - this.leaddata[0].receivable;
          this.receivable = this.leaddata[0].finaldealvalue - this.leaddata[0].dm[0].received;

          this.data = this.cookieservice.get("savedformat")
          if (this.data == "India") {
            this.symbol = this.cookieservice.get("symbolofcurrency")
            var result = this.leaddata[0].dealvalue.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
              lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
              output += "." + result[1];
            }
            this.soldform.controls.dealvalue.setValue(output);
          }
          else {
            this.symbol = this.cookieservice.get("symbolofcurrency")
            var result = this.leaddata[0].dealvalue.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
              lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
              output += "." + result[1];
            }
            this.soldform.controls.dealvalue.setValue(output);
          }
          // this.soldform.controls.dealvalue.setValue(this.leaddata[0].dealvalue);

          var value = this.leaddata[0].dealvalue;
          this.ActualDealvalue = +value;
          this.finaldealvalue = this.leaddata[0].finaldealvalue

          // if(this.leaddata[0].finaldealvalue == 0){
          this.data = this.cookieservice.get("savedformat")
          if (this.data == "India") {
            this.symbol = this.cookieservice.get("symbolofcurrency")
            var result = this.leaddata[0].finaldealvalue.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
              lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
              output += "." + result[1];
            }
            this.soldform.controls.finaldealvalue.setValue(output);
          }
          else {
            this.symbol = this.cookieservice.get("symbolofcurrency")
            var result = this.leaddata[0].finaldealvalue.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
              lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
              output += "." + result[1];
            }
            this.soldform.controls.finaldealvalue.setValue(output);
          }


          // this.soldform.controls.finaldealvalue.setValue(this.leaddata[0].finaldealvalue);
          // }

        })
      }
    });

    this._followupservice.GetfollwupstageButtons().subscribe(json => {

      debugger;
      if (json != "") {
        this.deallist = json as string

        this.deallist = JSON.parse(this.deallist)
        this.deallist = this.deallist.DM;
        this.ActualDeallist = this.deallist;

      }
    });


    this.paymentmodes = [
      { "id": "1", "name": "Cash" },
      { "id": "2", "name": "Cheque" },
      { "id": "3", "name": "Card" },
      { "id": "4", "name": "Online" }
    ];
    this.accounttypes = [
      { "id": "1", "name": "Current" },
      { "id": "2", "name": "Savings" },
      // { "id": "3", "name": "Over Drafts" }
    ];

  }

  get f() { return this.soldform.controls; }

  RefreshFunnelAfterLeadModify(event) {
    //debugger;
    this.refreshfunnel.emit();
  }
  displayCounter(count) {
    debugger;

    this.valueChange.emit();
    //this.frechbusinesscomp.Closemodel();
  }
  CheckFinalDealAmount(data) {
    debugger;
    let finalvalue = this.soldform.controls.finaldealvalue.value;
    var finaldealvalue = +finalvalue;
    if (finaldealvalue > this.ActualDealvalue) {
      this.toastr.warning("You Can't Give The Final Deal Value More Than Actual Deal value");
    }
  }
  CloseSoldModel() {
    debugger;
    this.CPpaymentarray = [];
    this.paymentarray = [];
    //$('#SoldBusinessDealHistory').modal('hide');
    this.freshbusinessComp.Closemodel();
    this.close();
    this.reasonshow = false;
    this.soldform.controls.invoicedate.setValue(new Date());
    const paymentcontrols = <FormArray>this.soldform.controls['PaymentsJSON'];
    for (let i = paymentcontrols.length - 1; i >= 0; i--) {
      paymentcontrols.removeAt(i)
    }
    const control = <FormArray>this.soldform.controls['PaymentsJSON'];
    control.push(this.getUnit());
    //this.show();
    this.paymentshow = true;
    this.bankaccountname = "";
    this.bankaccounttype = "";
    this.bankaccountno = "";
    this.bankifsccode = "";
  }
  private getbankdetails() {
    return this.formBuilder.group({
      BankAccounttype: ['', [Validators.required]],
      bankaccountname: ['', [Validators.required]],
      bankaccountno: ['', [Validators.required]],
      bankIFSCCode: ['', [Validators.required, IFSCcodevalidator]]
    });
  }
  private getCPbankdetails() {
    //debugger;
    return this.formBuilder.group({
      BankAccounttype: ['', [Validators.required]],
      bankaccountname: ['', [Validators.required]],
      bankaccountno: ['', [Validators.required]],
      bankIFSCCode: ['', [Validators.required, IFSCcodevalidator]]
    });
  }
  private addbankdetails() {
    let j = this.soldform.controls['leadbankjson']["controls"].length - 1;
    if (this.soldform.controls['leadbankjson']["controls"].length < 10) {
      if ((this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankIFSCCode'].value == '' || this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankIFSCCode'].value == null) || (this.soldform['controls']['leadbankjson']['controls'][j]['controls']['BankAccounttype'].value == '' || this.soldform['controls']['leadbankjson']['controls'][j]['controls']['BankAccounttype'].value == null) || (this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountno'].value == '' || this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountno'].value == null) || (this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountname'].value == '' || this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountname'].value == null)) {
        this.toastr.info("Please fill Lead bank details..!");
      } else {
        const control = <FormArray>this.soldform.controls['leadbankjson'];
        control.push(this.getbankdetails());

      }

    }
  }

  private removebankdetails(j: number) {
    if (this.soldform.controls['leadbankjson']["controls"].length > 1) {
      const control = <FormArray>this.soldform.controls['leadbankjson'];
      control.removeAt(j);
    }
  }
  private getUnit() {
    return this.formBuilder.group({
      id: [],
      receiptdate: [this.today, [Validators.required]],
      AmountReceived: ['', [Validators.required]],
      modeofpayment: ['', [Validators.required]],
      chequenumber: ['', [Validators.required]]
    });
  }
  private addUnit() {
    debugger
    let i = this.soldform.controls['PaymentsJSON']["controls"].length - 1
    let amountreceived = this.soldform['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value;
    let chequenumber = this.soldform['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value;
    let modeofpayment = this.soldform['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value
    if (this.paymentarray.length < 10) {
      if ((amountreceived == '' || amountreceived == null) || (chequenumber == '' || chequenumber == null) || (modeofpayment == '' || modeofpayment == null)) {
        this.toastr.info("Please fill Payment details..!");
      }
      else {

        this.id = this.id + 1;
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['id'].setValue(this.id)
        this.paymentarray = this.paymentarray.concat(this.soldform['controls']['PaymentsJSON'].value)
        if (this.paymentarray.length > 9) {
          this.paymentshow = false;
        }
        this.paymenthide = true;
        const paymentcontrols = <FormArray>this.soldform.controls['PaymentsJSON'];
        for (let i = paymentcontrols.length - 1; i >= 0; i--) {
          paymentcontrols.removeAt(i)
        }
        const control = <FormArray>this.soldform.controls['PaymentsJSON'];
        control.push(this.getUnit());
      }
    }
  }

  private removeUnit(i: number) {
    //debugger
    if (this.soldform.controls['PaymentsJSON']["controls"].length > 1) {
      const control = <FormArray>this.soldform.controls['PaymentsJSON'];
      control.removeAt(i);
    }
  }



  private getchannel() {
    return this.formBuilder.group({
      id: [],
      receiptdate: [this.today, [Validators.required]],
      AmountReceived: ['', [Validators.required]],
      modeofpayment: ['', [Validators.required]],
      chequenumber: ['', [Validators.required]]
    });
  }
  private addchannel() {
    //debugger
    let k = this.soldform.controls['CPPaymentsjson']["controls"].length - 1
    if (this.soldform.controls['CPPaymentsjson']["controls"].length < 10) {
      if ((this.soldform['controls']['CPPaymentsjson']['controls'][k]['controls']['AmountReceived'].value == '' || this.soldform['controls']['CPPaymentsjson']['controls'][k]['controls']['AmountReceived'].value == null) || (this.soldform['controls']['CPPaymentsjson']['controls'][k]['controls']['chequenumber'].value == '' || this.soldform['controls']['CPPaymentsjson']['controls'][k]['controls']['chequenumber'].value == null) || (this.soldform['controls']['CPPaymentsjson']['controls'][k]['controls']['modeofpayment'].value == '' || this.soldform['controls']['CPPaymentsjson']['controls'][k]['controls']['modeofpayment'].value == null)) {
        this.toastr.info("Please fill Channel partner payment details..!");
      }
      else {
        // const control = <FormArray>this.soldform.controls['CPPaymentsjson'];
        // control.push(this.getchannel());


        this.cpid = this.cpid + 1;
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['id'].setValue(this.cpid)
        this.CPpaymentarray = this.CPpaymentarray.concat(this.soldform['controls']['CPPaymentsjson'].value)
        if (this.CPpaymentarray.length > 9) {
          this.CPpaymentshow = false;
        }
        this.CPpaymenthide = true;
        const CPpaymentcontrols = <FormArray>this.soldform.controls['CPPaymentsjson'];
        for (let i = CPpaymentcontrols.length - 1; i >= 0; i--) {
          CPpaymentcontrols.removeAt(i)
        }
        const control = <FormArray>this.soldform.controls['CPPaymentsjson'];
        control.push(this.getchannel());
      }
    }
  }
  removeCPpayment(i: any) {
    debugger
    if (this.CPpaymentarray.length == 10) {
      const CPpaymentcontrols = <FormArray>this.soldform.controls['CPPaymentsjson'];
      for (let i = CPpaymentcontrols.length - 1; i >= 0; i--) {
        CPpaymentcontrols.removeAt(i)
      }
      const control = <FormArray>this.soldform.controls['CPPaymentsjson'];
      control.push(this.getchannel());
      this.showCP();
    }
    this.DATATTTT = this.CPpaymentarray;
    this.CPpaymentarray = this.CPpaymentarray.filter(person => person.id != i.id);
  }
  showCP() {
    this.CPpaymentshow = true;
  }
  show() {
    this.paymentshow = true;
  }
  removepayment(i: any) {
    debugger
    if (this.paymentarray.length == 10) {
      const paymentcontrols = <FormArray>this.soldform.controls['PaymentsJSON'];
      for (let i = paymentcontrols.length - 1; i >= 0; i--) {
        paymentcontrols.removeAt(i)
      }
      const control = <FormArray>this.soldform.controls['PaymentsJSON'];
      control.push(this.getUnit());
      this.show();
    }



    this.DATATTTT = this.paymentarray;

    this.paymentarray = this.paymentarray.filter(person => person.id != i.id);


  }
  private removechannel(k: number) {
    debugger
    if (this.soldform.controls['CPPaymentsjson']["controls"].length > 1) {
      const control = <FormArray>this.soldform.controls['CPPaymentsjson'];
      control.removeAt(k);
    }
  }

  clearpayments() {
    this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['receiptdate'].setValue(this.today);
    this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].setValue('');
    this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].setValue('');
    this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].setValue('');
  }
  clearbankdetails() {
    //debugger
    this.soldform['controls']['leadbankjson']['controls'][0]['controls']['BankAccounttype'].setValue('');
    this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankaccountname'].setValue('');
    this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankaccountno'].setValue('');
    this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankIFSCCode'].setValue('');
  }
  clearchannel() {
    this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['receiptdate'].setValue(this.today);
    this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].setValue('');
    this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValue('');
    this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].setValue('');
  }



  EditdetailsHideandShow(data: string) {
    //debugger;
    if (data == "edit") {
      this.Editbuttonshow = false;
      this.EditCancelbuttonshow = true;
      this.Edithide = false;
      this.Edithidedata = false;
      this.EditShow = true;
      this.soldform.controls.CPbankflag.setValue('Y');
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].setValue(this.bankifsccode);
      if (this.bankaccounttype == "" || this.bankaccounttype == null) {
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue('');
      }
      else {
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue(this.bankaccounttype);
      }

      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].setValue(this.bankaccountno);
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].setValue(this.bankaccountname);
      this.leaddata;
    }
    if (data == "cancel") {
      this.Editbuttonshow = true;
      this.EditCancelbuttonshow = false;
      if ((this.bankaccountname == "" || this.bankaccountname == null) && (this.bankaccounttype == "" || this.bankaccounttype == null) && (this.bankaccountno == "" || this.bankaccountno == null) && (this.bankifsccode == "" || this.bankifsccode == null)) {
        this.Edithide = false;
        this.Edithidedata = true;
        this.channelhide = true;
      }
      else {
        this.Edithide = true;
        this.Edithidedata = false;
        this.channelhide = true;
      }
      this.EditShow = false;
      this.soldform.controls.CPbankflag.setValue('N');

      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].setValue(this.bankifsccode);
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue(this.bankaccounttype);
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].setValue(this.bankaccountno);
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].setValue(this.bankaccountname);
      //  BankAccounttype: ['', [Validators.required]],
      //   bankaccountname: ['', [Validators.required]],
      //   bankaccountno: ['', [Validators.required]],
      //   bankIFSCCode: ['', [Validators.required]]
    }

  }
  selectdrop(args) {
    debugger
    if (this.received != 0) {
      if (args.target.value == 105) {
        this.Soldservice.GetLeadpayment(this.leadid).subscribe(leadbank => {
          debugger
          this.leadbank = leadbank as string;
          if (leadbank == 0) {
            this.reasonshow = false;
            this.soldform.controls.reasonforcancel.setValue('');
            this.soldform.controls.reasonforcancel.clearValidators();
            this.soldform.controls.reasonforcancel.updateValueAndValidity();
            this.soldform.controls.stageid.setValue('104');
            this.toastr.info("Please enter lead bank details for cancel..!");
          }
        })
      }
    }
    this.text = args.target.value;
    if (this.text == 105) {

      //Selected Cancel
      this.reasonshow = true;
      this.soldform.controls.reasonforcancel.setValue('');
      this.soldform.controls.reasonforcancel.setValidators([Validators.required]);
      this.soldform.controls.reasonforcancel.updateValueAndValidity();


      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].setValue('');
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].clearValidators();
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].updateValueAndValidity();

      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].setValue('');
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].clearValidators();
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].updateValueAndValidity();

      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValue('');
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].clearValidators();
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();

      //=============


      this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].setValue('');
      this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].clearValidators();
      this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].updateValueAndValidity();

      this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].setValue('');
      this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].clearValidators();
      this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].updateValueAndValidity();

      this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].setValue('');
      this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].clearValidators();
      this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();


      //============



      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].setValue('');
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].clearValidators();
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].updateValueAndValidity();

      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue('');
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].clearValidators();
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].updateValueAndValidity();

      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].setValue('');
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].clearValidators();
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].updateValueAndValidity();

      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].setValue('');
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].clearValidators();
      this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].updateValueAndValidity();



      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankIFSCCode'].setValue('');
      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankIFSCCode'].clearValidators();
      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankIFSCCode'].updateValueAndValidity();

      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['BankAccounttype'].setValue('');
      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['BankAccounttype'].clearValidators();
      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['BankAccounttype'].updateValueAndValidity();

      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankaccountname'].setValue('');
      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankaccountname'].clearValidators();
      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankaccountname'].updateValueAndValidity();

      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankaccountno'].setValue('');
      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankaccountno'].clearValidators();
      this.soldform['controls']['leadbankjson']['controls'][0]['controls']['bankaccountno'].updateValueAndValidity();


    }
    else {
      this.reasonshow = false;
      this.soldform.controls.reasonforcancel.setValue('');
      this.soldform.controls.reasonforcancel.clearValidators();
      this.soldform.controls.reasonforcancel.updateValueAndValidity();
    }
  }

  close() {
    //debugger;
    //$('#SoldBusinessDealHistory').modal('hide');
    //this.freshbusinessComp.Closemodel();
    this.soldform.reset();
    this.Edithide = true;
    this.Edithidedata = false;
    this.EditShow = false;
    this.ngOnInit;
    this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['receiptdate'].setValue(this.today);
    this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].setValue('');
    this.soldform['controls']['leadbankjson']['controls'][0]['controls']['BankAccounttype'].setValue('');
    this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['receiptdate'].setValue(this.today);
    this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValue('');
    this.soldform.controls.stageid.setValue('104');
    this.soldform.controls.reasonforcancel.clearValidators();
    this.soldform.controls.reasonforcancel.updateValueAndValidity();
    this.clearpayments();
    this.clearbankdetails();
    this.clearchannel();
    let k = this.soldform.controls['CPPaymentsjson']["controls"].length - 1
    if (this.soldform.controls['CPPaymentsjson']["controls"].length < 10) {
      this.removechannel(k);
    }
    let i = this.soldform.controls['PaymentsJSON']["controls"].length - 1
    if (this.soldform.controls['PaymentsJSON']["controls"].length < 10) {
      this.removeUnit(i);
    }
    let j = this.soldform.controls['leadbankjson']["controls"].length - 1;
    if (this.soldform.controls['leadbankjson']["controls"].length < 10) {
      this.removebankdetails(j);
    }

    // this.UserService.notifyObservable$.subscribe((res) => {
    //   if (res.hasOwnProperty('option') && res.option === 'call_child') {
    //     //debugger
    //     this.leadid = res.value.leadid
    //     console.log("lead id in sold", this.leadid);
    this.Soldservice.Getleaddata(this.leadid).subscribe(leaddata => {
      debugger
      this.leaddata = leaddata as string;
      this.leaddata = JSON.parse(this.leaddata)
      this.channelid = this.leaddata[0].subsourceid;
      this.sourcename = this.leaddata[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].vw[0].sourcename

      if (this.sourcename == "Channel Partner") {

        this.channelhide = true;
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].setValidators([Validators.required]);
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].updateValueAndValidity();

        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].setValidators([Validators.required]);
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].updateValueAndValidity();

        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValidators([Validators.required]);
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();

        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].setValidators([Validators.required, IFSCcodevalidator]);
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].updateValueAndValidity();


        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValidators([Validators.required]);
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].updateValueAndValidity();

        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].setValidators([Validators.required]);
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].updateValueAndValidity();

        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].setValidators([Validators.required]);
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].updateValueAndValidity();

      } else {
        this.channelhide = false;
        // this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValidators([Validators.required]);
        // this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();

        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].setValue('');
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].clearValidators();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].updateValueAndValidity();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].setValue('');
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].clearValidators();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].updateValueAndValidity();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValue('');
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].clearValidators();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].setValue('');
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].clearValidators();
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].updateValueAndValidity();

        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue('');
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].clearValidators();
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].updateValueAndValidity();
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].setValue('');
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].clearValidators();
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].updateValueAndValidity();
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].setValue('');
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].clearValidators();
        this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].updateValueAndValidity();
      }
      //this.customerid = this.leaddata[0].lc[0].leadcustomerid;
      this.Soldservice.Getchannelcheck(this.channelid).subscribe(channeldata => {
        //debugger
        if (channeldata != "") {
          this.channeldata = channeldata as string;
          this.channeldata = JSON.parse(this.channeldata);
          this.channelname = this.channeldata[0].referalname;
          this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].patchValue(this.channeldata[0].BankAccounttype)
          this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].patchValue(this.channeldata[0].bankaccountname)
          this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].patchValue(this.channeldata[0].bankaccountno)
          this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].patchValue(this.channeldata[0].bankIFSCCode)


          if (this.channeldata[0].BankAccounttype == '' || this.channeldata[0].BankAccounttype == null) {
            // this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue('')
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].setValue('');
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].clearValidators();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankIFSCCode'].updateValueAndValidity();

            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].setValue('1');
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].clearValidators();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['BankAccounttype'].updateValueAndValidity();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].setValue('');
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].clearValidators();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountname'].updateValueAndValidity();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].setValue('');
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].clearValidators();
            this.soldform['controls']['CPBankjson']['controls'][0]['controls']['bankaccountno'].updateValueAndValidity();
          }

          this.bankaccountname = this.channeldata[0].bankaccountname;
          this.bankaccounttype = this.channeldata[0].BankAccounttype;
          this.bankaccountno = this.channeldata[0].bankaccountno;
          this.bankifsccode = this.channeldata[0].bankIFSCCode;
        }
      });
      this.received = this.leaddata[0].dm[0].received;
      if (this.received > 0) {
        debugger;
        this.tempdeallist = this.deallist;
        for (var i = 0; i < this.tempdeallist.length; i++) {

          if (this.tempdeallist[i].stagename != "Cancel" && this.tempdeallist[i].stagename != "Sold") {

            let kk = this.tempdeallist
            let dd = kk.slice(5, 7)
            this.tempdeallist = dd;
          }

        }
        this.deallist = this.tempdeallist

        this.childmessage = false;
      }
      else {

        this.childmessage = true;
        this.deallist = this.ActualDeallist;
      }
      debugger;
      // this.receivable =this.leaddata[0].finaldealvalue - this.leaddata[0].receivable;

      this.receivable = this.leaddata[0].finaldealvalue - this.leaddata[0].dm[0].received;

      this.soldform.controls.dealvalue.setValue(this.leaddata[0].dealvalue);
      var value = this.leaddata[0].dealvalue;
      this.ActualDealvalue = +value;
      this.soldform.controls.finaldealvalue.setValue(this.leaddata[0].finaldealvalue);
    })
    //   }
    // });
  }

  getdata(): any {

    return this.paymentarray;
  }

  onSubmit() {
    debugger;
    this.soldform.controls.leadid.setValue(this.leadid);

    let a=this.soldform.controls.dealvalue.value;
    let b = a.split(',');
    let c = b.join('')
    a = c;
    this.soldform.controls.dealvalue.setValue(a);

    let d=this.soldform.controls.finaldealvalue.value;
    let s = d.split(',');
    let n = s.join('')
    d = n;
    this.soldform.controls.finaldealvalue.setValue(d);

    if (this.soldform.controls.finaldealvalue.value > 0) {
         this.soldform.controls.dealflag.setValue('Y');

      if (this.paymentarray.length >= 1) {
        this.soldform.controls.paymentflag.setValue('Y');

        for (var i = 0; i < this.paymentarray.length; i++) {
          if (i < this.paymentarray.length - 1) {
            const control = <FormArray>this.soldform.controls['PaymentsJSON'];
            control.push(this.getUnit());
          }
          this.soldform['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].setValue(this.paymentarray[i].modeofpayment)
          this.soldform['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].setValue(this.paymentarray[i].AmountReceived)
          this.soldform['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].setValue(this.paymentarray[i].chequenumber)
          this.soldform['controls']['PaymentsJSON']['controls'][i]['controls']['receiptdate'].setValue(this.paymentarray[i].receiptdate)
        }
      }
      else {
        this.soldform.controls.paymentflag.setValue('N');
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].setValue('');
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].clearValidators();
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].updateValueAndValidity();
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].setValue('');
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].clearValidators();
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].updateValueAndValidity();
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].setValue('');
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].clearValidators();
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();
      }
      let j = this.soldform.controls['leadbankjson']["controls"].length - 1;
      if (this.soldform.controls['leadbankjson']["controls"].length < 10) {
        if ((this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankIFSCCode'].value == '' || this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankIFSCCode'].value == null) && (this.soldform['controls']['leadbankjson']['controls'][j]['controls']['BankAccounttype'].value == '' || this.soldform['controls']['leadbankjson']['controls'][j]['controls']['BankAccounttype'].value == null) && (this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountno'].value == '' || this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountno'].value == null) && (this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountname'].value == '' || this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountname'].value == null)) {
          this.soldform.controls.leadbankflag.setValue('N');
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['BankAccounttype'].setValue('');
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['BankAccounttype'].clearValidators();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['BankAccounttype'].updateValueAndValidity();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankIFSCCode'].setValue('');
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankIFSCCode'].clearValidators();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankIFSCCode'].updateValueAndValidity();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountno'].setValue('');
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountno'].clearValidators();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountno'].updateValueAndValidity();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountname'].setValue('');
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountname'].clearValidators();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountname'].updateValueAndValidity();
        }
        else {
          this.soldform.controls.leadbankflag.setValue('Y');
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['BankAccounttype'].setValidators([Validators.required]);
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['BankAccounttype'].updateValueAndValidity();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankIFSCCode'].setValidators([Validators.required, IFSCcodevalidator]);
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankIFSCCode'].updateValueAndValidity();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountno'].setValidators([Validators.required]);
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountno'].updateValueAndValidity();
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountname'].setValidators([Validators.required]);
          this.soldform['controls']['leadbankjson']['controls'][j]['controls']['bankaccountname'].updateValueAndValidity();
        }
      }     
      if (this.CPpaymentarray.length >= 1) {
        this.soldform.controls.CPpaymentsflag.setValue('Y');
        for (var i = 0; i < this.CPpaymentarray.length; i++) {
          if (i < this.CPpaymentarray.length - 1) {
            const control = <FormArray>this.soldform.controls['CPPaymentsjson'];
            control.push(this.getUnit());

          }

          this.soldform['controls']['CPPaymentsjson']['controls'][i]['controls']['modeofpayment'].setValue(this.CPpaymentarray[i].modeofpayment)
          this.soldform['controls']['CPPaymentsjson']['controls'][i]['controls']['AmountReceived'].setValue(this.CPpaymentarray[i].AmountReceived)
          this.soldform['controls']['CPPaymentsjson']['controls'][i]['controls']['chequenumber'].setValue(this.CPpaymentarray[i].chequenumber)
          this.soldform['controls']['CPPaymentsjson']['controls'][i]['controls']['receiptdate'].setValue(this.CPpaymentarray[i].receiptdate)
        }
      }
      else {
        this.soldform.controls.CPpaymentsflag.setValue('N');
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].setValue('');
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].clearValidators();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].updateValueAndValidity();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].setValue('');
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].clearValidators();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].updateValueAndValidity();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValue('');
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].clearValidators();
        this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].updateValueAndValidity();
      }

      if (this.soldform.controls.finaldealvalue.value == '') {
        this.soldform.controls.dealflag.setValue('N');
        // this.soldform.controls.finaldealvalue.setValue('');
        this.soldform.controls.finaldealvalue.clearValidators();
        this.soldform.controls.finaldealvalue.updateValueAndValidity();
      } else {
        this.soldform.controls.dealflag.setValue('Y');
        this.soldform.controls.finaldealvalue.setValidators([Validators.required]);
        this.soldform.controls.finaldealvalue.updateValueAndValidity();
      }
      if (this.soldform.controls.stageid.value == 104) {
        this.stageflag = 'N';
      }
      else {
        this.stageflag = 'Y';
      }
      if (this.soldform.invalid) {
        this.toastr.warning("Please fill all the required mandatory fields..!");
        return;

      }
      if (this.soldform.controls.finaldealvalue.value > this.soldform.controls.dealvalue.value) {
        this.toastr.warning("Final Deal Value should be less than deal value..!");
        return;
      }
      let add = JSON.stringify(this.soldform.value)
      debugger;     
      if (this.soldform.controls.finaldealvalue.value == +this.received + +this.receivable) {
        this.soldform.controls.dealflag.setValue('N')
      }
      if (this.soldform.controls.CPpaymentsflag.value == 'N' && this.stageflag == 'N' && this.soldform.controls.dealflag.value == 'N' && (this.soldform.controls.CPbankflag.value == 'N' || this.soldform.controls.CPbankflag.value == null) && this.soldform.controls.leadbankflag.value == 'N' && this.soldform.controls.paymentflag.value == 'N') {
        this.toastr.info("Please enter any data..!")
      }
      else {
        if (confirm("Are you sure  do you want to update lead...?")) {
          this.Soldservice.Savesolddetails(add).subscribe(leaddata => {
            this.close();
            this.ngOnInit();
            this.soldform.controls.invoicedate.setValue(new Date());
            $('#FreshBusinessDeal').modal('hide');
            $('#SoldBusinessDealHistory').modal('hide');
            this.valueChange.emit();
            this.paymentarray = [];
            this.CPpaymentarray = [];
            this.toastr.success("Saved successfully..!")
          });
        }
        else {
         
          const paymentcontrols = <FormArray>this.soldform.controls['PaymentsJSON'];
          for (let i = paymentcontrols.length - 1; i >= 0; i--) {
            paymentcontrols.removeAt(i)
          }
          const control = <FormArray>this.soldform.controls['PaymentsJSON'];
          control.push(this.getUnit());
          const CPpaymentcontrols = <FormArray>this.soldform.controls['CPPaymentsjson'];
          for (let i = CPpaymentcontrols.length - 1; i >= 0; i--) {
            CPpaymentcontrols.removeAt(i)
          }
          const contro = <FormArray>this.soldform.controls['CPPaymentsjson'];
          contro.push(this.getchannel());
          this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['receiptdate'].setValue(this.today);
          this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].setValue('');
          this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValue('');
          this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].setValue('');
          this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['receiptdate'].setValue(this.today);
          this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].setValue('');
          this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].setValue('');
          this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].setValue('');
        }
      }


    } else {
      this.soldform.controls.dealflag.setValue('N');
      this.toastr.warning("Final Deal Value Should Not Taken 0(Zero)")
    }
   
  }


  onBlurMethod() {

    debugger;

    if (this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].value != '' && this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].value != undefined) {

      if (this.received == 0 && this.receivable == 0) {

        this.receivable = this.soldform.controls.finaldealvalue.value;
      }
      for (var i = 0; i < this.paymentarray.length; i++) {
        this.PaymentTotalamount = +this.paymentarray[i].AmountReceived;
        this.Paymentamount = this.Paymentamount + this.PaymentTotalamount

      }
      var AmountPaid = this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].value
      this.ReceivingAmount = +AmountPaid + this.Paymentamount;
      this.Paymentamount = 0;
      this.PaymentTotalamount = 0;

      if (this.ReceivingAmount == 0) {
        let ReceivingAmount = this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].value;
        if (ReceivingAmount > this.receivable) {
          this.toastr.warning("Receiving Amount Should Not More Than Receivable Amount");
          this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].setValue('');
        }
      }


      // ReceivingAmount = +ReceivingAmount;
      if (this.receivable != 0) {
        if (this.ReceivingAmount > this.receivable) {
          this.toastr.warning("Receiving Amount Should Not More Than Receivable Amount");
          this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].setValue('');
        }
      }
      else {
        if (this.received == 0 && this.receivable == 0 && this.soldform.controls.finaldealvalue.value == 0) {
          this.toastr.info("Please enter Final Deal Value")
        }
        else {
          this.toastr.warning("Payment already done ...!");
        }

        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].setValue('');
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].setValue('');
        this.soldform['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].setValue('');
      }
      this.ReceivingAmount = 0;
      this.tempdeallist = this.ActualDeallist;
      for (var i = 0; i < this.tempdeallist.length; i++) {

        if (this.tempdeallist[i].stagename != "Sold") {

          let kk = this.tempdeallist
          let dd = kk.slice(5, 6)
          this.tempdeallist = dd;

        }

      }
      this.deallist = this.tempdeallist


    } else {

      if (this.received > 0) {
        this.tempdeallist = this.ActualDeallist;
        for (var i = 0; i < this.tempdeallist.length; i++) {
          if (this.tempdeallist[i].stagename != "Cancel" && this.tempdeallist[i].stagename != "Sold") {
            let kk = this.tempdeallist
            let dd = kk.slice(5, 7)
            this.tempdeallist = dd;
          }
        }
        this.deallist = this.tempdeallist
      }
      else {
        // this.deallist = this.ActualDeallist;
        this.tempdeallist = this.ActualDeallist
        let kk = this.tempdeallist
        let dd = kk.slice(1, 6)
        this.deallist = dd;
      }


    }



  }


  Blurchannelpayment() {
    if ((this.bankaccountno == '' || this.bankaccountno == null) && (this.bankaccountname == '' || this.bankaccountname == null) && (this.bankaccounttype == '' || this.bankaccounttype == null) && (this.bankifsccode == '' || this.bankifsccode == null)) {
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['receiptdate'].setValue(this.today);
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['AmountReceived'].setValue('');
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['modeofpayment'].setValue('');
      this.soldform['controls']['CPPaymentsjson']['controls'][0]['controls']['chequenumber'].setValue('');
    }
  }



}
