import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FreshbusinessComponent } from '../freshbusiness/freshbusiness.component';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { SoldserviceService } from 'src/app/Services/soldservice.service';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { CancelservicesService } from '../../../Services/cancelservices.service'
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

declare let $: any;
@Component({
  selector: 'app-cancelledbusiness',
  templateUrl: './cancelledbusiness.component.html',
  styleUrls: ['./cancelledbusiness.component.css']
})
export class CancelledbusinessComponent implements OnInit {

  @Output() valueChange = new EventEmitter();
  @Output() refreshfunnel = new EventEmitter<string>();
  @ViewChild(FreshbusinessComponent) freshbusinessComp;


  DATATTTT = [];
  paymentarray = [];
  leadid: any;
  referalid: any;
  leaddata: any;
  PaymentDetails: any
  bankdetails: any;
  ChanelPartnerDetails: any;
  today = new Date();
  paymentmodes: any;
  cpPaymentDetails: any;
  reveivedamount: any;
  ChanelpartnerdetailsHide: boolean;
  sourcename: any;
  paymenthide: boolean
  paymentshow: boolean
  bankaccounttype: any;
  bankaccountname: any;
  bankifsccode: any;
  bankaccountno: any;
  channelname: any;
  channelpartnertotalsum = 0;
  CustomersPaymentssum = 0;
  returnsamount = 0;
  dataofreasontocancel: any;
  Amount = 0;
  id = 0;
  CPPaidamount = 0;
  symbol:any
  public min: Date = this.today;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();


  constructor(private cookieservice:CookieService,private toastr: ToastrService, private formBuilder: FormBuilder, private UserService: UserserviceService, private _cancelservice: CancelservicesService) {

    this.dpConfig.containerClass = 'theme-dark-blue';
    //this.dpConfig.dateInputFormat = 'DD MMM YYYY';
    this.dpConfig.dateInputFormat =  this.cookieservice.get("saveddateformat");
    this.dpConfig.showWeekNumbers = false;
    this.dpConfig.maxDate = this.min;

  }

  CancelForm: FormGroup;



  ngOnInit() {

    this.symbol=this.cookieservice.get("symbolofcurrency")
    this.show();


    this.paymentmodes = [
      { "id": "1", "name": "Cash" },
      { "id": "2", "name": "Cheque" },
      { "id": "3", "name": "Card" },
      { "id": "4", "name": "Online" }
    ];

    this.CancelForm = this.formBuilder.group({
      dealvalue: [''],
      finaldealvalue: [''],

      // BankAccounttype: [''],
      // bankaccountname: [''],
      // bankaccountno: [''],
      // bankIFSCCode: [''],
      PaymentsJSON: this.formBuilder.array([
        this.getUnit()
      ]),


      // stageid: ['104', Validators.required],
      //  reasonforcancel: ['', Validators.required],
      // invoicedate: [this.today],
      // received: [''],
      // receivable: [''],
      received: [''],
      paymentflag: ['N'],
      // receivable:[this.leaddata[0].receivable],
      leadid: ['']


      //  GetCustomerpayments(leadid)
      //  GetCPPayments(leadid)
      //  Getcustomerbankinfo(customerid)
      //  GetChannelpartnerinfo(referalid)


    })

    this.UserService.notifyObservable$.subscribe((res) => {
      //debugger;
      // if (res.hasOwnProperty('option') && res.option === 'call_child') {
      //////debugger
      this.leadid = res.value.leadid
      this.CancelForm.controls.leadid.setValue(res.value.leadid)
      this.referalid = res.value.sourceid;
      // }


      this._cancelservice.Getleaddata(this.leadid).subscribe(leaddata => {
        //debugger;
        if (leaddata != "") {
          this.leaddata = leaddata as string;
          this.leaddata = JSON.parse(this.leaddata)
          this.dataofreasontocancel = this.leaddata[0].reasonforcancel
          this.CancelForm.controls.dealvalue.setValue(this.leaddata[0].dealvalue);
          this.CancelForm.controls.finaldealvalue.setValue(this.leaddata[0].finaldealvalue);

          this.bankdetails = this.leaddata[0].dm[0].lc[0].lad[0].loc[0].lbd;

          this.sourcename = this.leaddata[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].vw[0].sourcename
          if (this.sourcename == "Channel Partner") {
            this.ChanelpartnerdetailsHide = true;
          } else {
            this.ChanelpartnerdetailsHide = false;
          }
        }
      });


      this._cancelservice.GetCustomerpayments(this.leadid).subscribe(paymentdata => {
        ////debugger;

        if (paymentdata != '') {
          this.PaymentDetails = paymentdata as string;
          this.PaymentDetails = JSON.parse(this.PaymentDetails)

          this.CustomersPaymentssum = 0;
          this.CustomersPaymentssum = this.PaymentDetails[0].PAIDAMOUNT
          // for (var i = 0; i < this.PaymentDetails.length; i++) {
          //   if (this.PaymentDetails[i].AmountReceived != "") {
          //     this.CustomersPaymentssum = this.CustomersPaymentssum + this.PaymentDetails[i].AmountReceived
          //   }
          // }
        }
      });

      this._cancelservice.GetChannelpartnerinfo(this.referalid).subscribe(chaneldata => {
        ////debugger;
        // console.log("GetChannelPartnerInfo", chaneldata)
        if (chaneldata != "") {
          this.ChanelPartnerDetails = chaneldata as string;
          this.ChanelPartnerDetails = JSON.parse(this.ChanelPartnerDetails)


          this.channelname = this.ChanelPartnerDetails[0].referalname;
          this.bankaccounttype = this.ChanelPartnerDetails[0].BankAccounttype;
          this.bankaccountname = this.ChanelPartnerDetails[0].bankaccountname;
          this.bankaccountno = this.ChanelPartnerDetails[0].bankaccountno;
          this.bankifsccode = this.ChanelPartnerDetails[0].bankIFSCCode;
        }
      });

      this._cancelservice.GetCPPayments(this.leadid).subscribe(cpPaymentsdata => {
        ////debugger;
        if (cpPaymentsdata != "") {
          this.cpPaymentDetails = cpPaymentsdata as string;
          this.cpPaymentDetails = JSON.parse(this.cpPaymentDetails)
          // this.cpPaymentDetails = eval('(' + this.cpPaymentDetails + ')')
          this.channelpartnertotalsum = 0;
          for (var i = 0; i < this.cpPaymentDetails.length; i++) {
            if (this.cpPaymentDetails[i].Amountpaid != "") {
              this.CPPaidamount = this.cpPaymentDetails[i].Amountpaid;
              var m = +this.CPPaidamount;
              this.channelpartnertotalsum = this.channelpartnertotalsum + m
            }
          }
        }

      });


    });

  }
  clearpayments() {
    this.CancelForm['controls']['PaymentsJSON']['controls'][0]['controls']['receiptdate'].setValue(this.today);
    this.CancelForm['controls']['PaymentsJSON']['controls'][0]['controls']['AmountReceived'].setValue('');
    this.CancelForm['controls']['PaymentsJSON']['controls'][0]['controls']['modeofpayment'].setValue('');
    this.CancelForm['controls']['PaymentsJSON']['controls'][0]['controls']['chequenumber'].setValue('');
  }
  private removeUnit(i: number) {
    //////debugger
    if (this.CancelForm.controls['PaymentsJSON']["controls"].length > 1) {
      const control = <FormArray>this.CancelForm.controls['PaymentsJSON'];
      control.removeAt(i);
    }
  }
  // private addUnit() {
  //   //////debugger
  //   if (this.CancelForm.controls['PaymentsJSON']["controls"].length < 4) {
  //     const control = <FormArray>this.CancelForm.controls['PaymentsJSON'];
  //     control.push(this.getUnit());
  //   }
  // }
  private getUnit() {
    return this.formBuilder.group({
      id: [],
      receiptdate: [this.today, [Validators.required]],
      AmountReceived: ['', [Validators.required]],
      modeofpayment: ['', [Validators.required]],
      chequenumber: ['', [Validators.required]]
    });
  }
  // private getUnit() {
  //   return this.formBuilder.group({
  //     receiptdate: [this.today, [Validators.required]],
  //     AmountReceived: ['', [Validators.required]],
  //     modeofpayment: ['', [Validators.required]],
  //     chequenumber: ['', [Validators.required]]
  //   });
  // }
  CloseCancelModel() {
    //////debugger;
    $('#CancelledBusinessDeal').modal('hide');
    this.paymentarray = [];
  }

  onBlurMethod() {
    debugger;
    let i = this.CancelForm.controls['PaymentsJSON']["controls"].length - 1
    if ((this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value != null) && (this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value != null) && (this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value != null)) {

      // this.Amount = this.CancelForm['controls']['PaymentsJSON']['controls'][j]['controls']['AmountReceived'].value;
      //  if (this.Amount != 0) {
      this.returnsamount = 0;
      for (var j = 0; j < this.CancelForm.controls['PaymentsJSON']["controls"].length; j++) {
        this.Amount = 0;
        this.Amount = this.CancelForm['controls']['PaymentsJSON']['controls'][j]['controls']['AmountReceived'].value;
        var m = +this.Amount;
        this.returnsamount = this.returnsamount + m;
      }

      if (this.returnsamount != 0) {
        if (this.returnsamount <= this.CustomersPaymentssum) {

        }
        else {
          this.toastr.info("you can't Returns the Amount More than Received Amount")
          this.CancelForm.controls.paymentflag.setValue('N');
          this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].setValue('')
        }
      } else {
        this.toastr.info("you can't Returns the Amount  as Zero")
        this.CancelForm.controls.paymentflag.setValue('N');
        this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].setValue('')
      }

      //}

    }


  }

  onSubmit() {
    debugger;

    if (this.paymentarray.length >= 1) {

      let i = this.CancelForm.controls['PaymentsJSON']["controls"].length - 1

      if (this.CancelForm.controls['PaymentsJSON']["controls"].length <= 4) {

        if ((this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value != null) && (this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value != null) && (this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value != null)) {

          this.returnsamount = 0;
          for (var j = 0; j < this.CancelForm.controls['PaymentsJSON']["controls"].length; j++) {
            this.Amount = 0;
            this.Amount = this.CancelForm['controls']['PaymentsJSON']['controls'][j]['controls']['AmountReceived'].value;
            var m = +this.Amount;
            this.returnsamount = this.returnsamount + m;
          }
          if (this.returnsamount <= this.CustomersPaymentssum) {
            this.CancelForm.controls.paymentflag.setValue('Y');
            this.paymentarray = this.paymentarray.concat(this.CancelForm['controls']['PaymentsJSON'].value)
            if (this.paymentarray.length >= 1) {

              const paymentjson = <FormArray>this.CancelForm.controls['PaymentsJSON'];
              for (let i = paymentjson.length - 1; i >= 0; i--) {
                paymentjson.removeAt(i)
              }

              for (var p = 0; i < this.paymentarray.length; p++) {
                if (p <= this.paymentarray.length - 1) {
                  const control = <FormArray>this.CancelForm.controls['PaymentsJSON'];
                  control.push(this.getUnit());

                  this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['modeofpayment'].setValue(this.paymentarray[p].modeofpayment)
                  this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['AmountReceived'].setValue(this.paymentarray[p].AmountReceived)
                  this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['chequenumber'].setValue(this.paymentarray[p].chequenumber)
                  this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['receiptdate'].setValue(this.paymentarray[p].receiptdate)
                } else {
                  break;
                }
              }
            } else {
              //this.CancelForm.controls.paymentflag.setValue('Y');
            }


            // let addd = JSON.stringify(this.paymentarray)
            let add = JSON.stringify(this.CancelForm.value)
            if (confirm("Are you sure  do you want to Cancel lead...?")) {
              this._cancelservice.SaveCanceldetails(add).subscribe(leaddata => {
                // this.close();

                //debugger;
                this.CancelForm.reset();
                this.CancelForm['controls']['PaymentsJSON']['controls'][0]['controls']['receiptdate'].setValue(this.today);

                this.ngOnInit();
                $('#CancelledBusinessDeal').modal('hide');
                this.toastr.success("Lead Cancelled Successfully...")
                this.valueChange.emit();
                this.paymentarray = [];
              });
            } else {
              this.channelpartnertotalsum = this.CustomersPaymentssum;
            }
          } else {
            this.toastr.info("you can't Returns the Amount More than Received Amount")
          }

        }
        else {
          this.CancelForm.controls.paymentflag.setValue('N');
        }
      }

    } else {

      if (this.CancelForm.invalid) {
        this.toastr.info("Please fill Payment details..!");
      }
      else {

        let i = this.CancelForm.controls['PaymentsJSON']["controls"].length - 1

        if (this.CancelForm.controls['PaymentsJSON']["controls"].length <= 4) {

          if ((this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value != null) && (this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value != null) && (this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value != null)) {

            this.returnsamount = 0;
            for (var j = 0; j < this.CancelForm.controls['PaymentsJSON']["controls"].length; j++) {
              this.Amount = 0;
              this.Amount = this.CancelForm['controls']['PaymentsJSON']['controls'][j]['controls']['AmountReceived'].value;
              var m = +this.Amount;
              this.returnsamount = this.returnsamount + m;
            }

            if (this.returnsamount <= this.CustomersPaymentssum) {
              this.CancelForm.controls.paymentflag.setValue('Y');
              this.paymentarray = this.paymentarray.concat(this.CancelForm['controls']['PaymentsJSON'].value)
              if (this.paymentarray.length >= 1) {

                const paymentjson = <FormArray>this.CancelForm.controls['PaymentsJSON'];
                for (let i = paymentjson.length - 1; i >= 0; i--) {
                  paymentjson.removeAt(i)
                }

                for (var p = 0; i < this.paymentarray.length; p++) {
                  if (p <= this.paymentarray.length - 1) {
                    const control = <FormArray>this.CancelForm.controls['PaymentsJSON'];
                    control.push(this.getUnit());

                    this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['modeofpayment'].setValue(this.paymentarray[p].modeofpayment)
                    this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['AmountReceived'].setValue(this.paymentarray[p].AmountReceived)
                    this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['chequenumber'].setValue(this.paymentarray[p].chequenumber)
                    this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['receiptdate'].setValue(this.paymentarray[p].receiptdate)
                  } else {
                    break;
                  }
                }
              } else {
                //this.CancelForm.controls.paymentflag.setValue('Y');
              }


              // let addd = JSON.stringify(this.paymentarray)
              let add = JSON.stringify(this.CancelForm.value)
              if (confirm("Are you sure  do you want to Cancel lead...?")) {
                this._cancelservice.SaveCanceldetails(add).subscribe(leaddata => {
                  // this.close();

                  //debugger;
                  this.CancelForm.reset();
                  this.CancelForm['controls']['PaymentsJSON']['controls'][0]['controls']['receiptdate'].setValue(this.today);

                  this.ngOnInit();
                  $('#CancelledBusinessDeal').modal('hide');
                  this.toastr.success("Lead Cancelled Successfully...")
                  this.valueChange.emit();
                  this.paymentarray = [];
                });
              } else {
                this.channelpartnertotalsum = this.CustomersPaymentssum;
              }
            } else {
              this.toastr.info("you can't Returns the Amount More than Received Amount")
            }

          }
          else {
            this.CancelForm.controls.paymentflag.setValue('N');
          }
        }
      }

    }


    // if (this.CancelForm.invalid) {
    //   this.toastr.info("Please fill Payment details..!");
    // }
    // else {

    //   let i = this.CancelForm.controls['PaymentsJSON']["controls"].length - 1

    //   if (this.CancelForm.controls['PaymentsJSON']["controls"].length <= 4) {

    //     if ((this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value != null) && (this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value != null) && (this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value != '' || this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value != null)) {

    //       this.returnsamount = 0;
    //       for (var j = 0; j < this.CancelForm.controls['PaymentsJSON']["controls"].length; j++) {
    //         this.Amount = 0;
    //         this.Amount = this.CancelForm['controls']['PaymentsJSON']['controls'][j]['controls']['AmountReceived'].value;
    //         var m = +this.Amount;
    //         this.returnsamount = this.returnsamount + m;
    //       }

    //       if (this.returnsamount <= this.CustomersPaymentssum) {
    //         this.CancelForm.controls.paymentflag.setValue('Y');
    //         this.paymentarray = this.paymentarray.concat(this.CancelForm['controls']['PaymentsJSON'].value)
    //         if (this.paymentarray.length >= 1) {

    //           const paymentjson = <FormArray>this.CancelForm.controls['PaymentsJSON'];
    //           for (let i = paymentjson.length - 1; i >= 0; i--) {
    //             paymentjson.removeAt(i)
    //           }

    //           for (var p = 0; i < this.paymentarray.length; p++) {
    //             if (p <= this.paymentarray.length - 1) {
    //               const control = <FormArray>this.CancelForm.controls['PaymentsJSON'];
    //               control.push(this.getUnit());

    //               this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['modeofpayment'].setValue(this.paymentarray[p].modeofpayment)
    //               this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['AmountReceived'].setValue(this.paymentarray[p].AmountReceived)
    //               this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['chequenumber'].setValue(this.paymentarray[p].chequenumber)
    //               this.CancelForm['controls']['PaymentsJSON']['controls'][p]['controls']['receiptdate'].setValue(this.paymentarray[p].receiptdate)
    //             } else {
    //               break;
    //             }
    //           }
    //         } else {
    //           //this.CancelForm.controls.paymentflag.setValue('Y');
    //         }


    //         // let addd = JSON.stringify(this.paymentarray)
    //         let add = JSON.stringify(this.CancelForm.value)
    //         if (confirm("Are you sure  do you want to Cancel lead...?")) {
    //           this._cancelservice.SaveCanceldetails(add).subscribe(leaddata => {
    //             // this.close();

    //             //debugger;
    //             this.CancelForm.reset();
    //             this.CancelForm['controls']['PaymentsJSON']['controls'][0]['controls']['receiptdate'].setValue(this.today);

    //             this.ngOnInit();
    //             $('#CancelledBusinessDeal').modal('hide');
    //             this.toastr.success("Lead Cancelled Successfully...")
    //             this.valueChange.emit();
    //             this.paymentarray = [];
    //           });
    //         } else {
    //           this.channelpartnertotalsum = this.CustomersPaymentssum;
    //         }
    //       } else {
    //         this.toastr.info("you can't Returns the Amount More than Received Amount")
    //       }

    //     }
    //     else {
    //       this.CancelForm.controls.paymentflag.setValue('N');
    //     }
    //   }
    // }
    
  }


  ClearDetails() {
    debugger;
   // this.CancelForm.reset();
   // this.ngOnInit();
    //this.CancelForm.controls.receiptdate.setValue(new Date());
  }



  RefreshFunnelAfterLeadModify(event) {
    //////debugger;
    this.refreshfunnel.emit();
  }

  show() {
    this.paymentshow = true;
  }

  removepayment(i: any) {
    debugger
    if (this.paymentarray.length == 10) {
      const paymentcontrols = <FormArray>this.CancelForm.controls['PaymentsJSON'];
      for (let i = paymentcontrols.length - 1; i >= 0; i--) {
        paymentcontrols.removeAt(i)
      }
      const control = <FormArray>this.CancelForm.controls['PaymentsJSON'];
      control.push(this.getUnit());
      this.show();
    }



    this.DATATTTT = this.paymentarray;

    this.paymentarray = this.paymentarray.filter(person => person.id != i.id);


  }

  private addUnit() {
    debugger
    let i = this.CancelForm.controls['PaymentsJSON']["controls"].length - 1
    let amountreceived = this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['AmountReceived'].value;
    let chequenumber = this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['chequenumber'].value;
    let modeofpayment = this.CancelForm['controls']['PaymentsJSON']['controls'][i]['controls']['modeofpayment'].value
    if (this.paymentarray.length < 10) {
      if ((amountreceived == '' || amountreceived == null) || (chequenumber == '' || chequenumber == null) || (modeofpayment == '' || modeofpayment == null)) {
        this.toastr.info("Please fill Payment details..!");
      }
      else {

        this.id = this.id + 1;
        this.CancelForm['controls']['PaymentsJSON']['controls'][0]['controls']['id'].setValue(this.id)
        this.paymentarray = this.paymentarray.concat(this.CancelForm['controls']['PaymentsJSON'].value)
        if (this.paymentarray.length > 9) {
          this.paymentshow = false;
        }
        this.paymenthide = true;
        const paymentcontrols = <FormArray>this.CancelForm.controls['PaymentsJSON'];
        for (let i = paymentcontrols.length - 1; i >= 0; i--) {
          paymentcontrols.removeAt(i)
        }
        const control = <FormArray>this.CancelForm.controls['PaymentsJSON'];
        control.push(this.getUnit());
      }
    }
  }



}
