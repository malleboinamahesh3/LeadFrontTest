import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, RequiredValidator } from "@angular/forms";
import { FollowupService } from "../../../Services/followup.service";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr'
import { formatDate, DatePipe } from '@angular/common';
import { FunnelpopupdataService } from "../../../Services/funnelpopup.service";
import { UserserviceService } from 'src/app/Services/userservice.service';
import { Subject } from "rxjs";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';

declare let $: any;

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.css']
})
export class FollowupComponent implements OnInit {

  @Output() valueChange = new EventEmitter();

  followupthroughbuttons: any;
  followupstagesbuttons: any;
  followupsaveresult: any;
  _follow: any;
  nextdate: any;
  nextTime: any
  nextDateAndTime: Date;
  funnelpopupdata: any;
  leadid: any;
  public show: boolean = false;
  public hide: boolean = true;
  public Cancelshow: boolean = false;
  public Dateshow: boolean = false;
  public Soldshow: boolean = false;
  public SoldDateshow: boolean = false;
  followthroughButton: boolean = false;
  nextfollowthroughButton: boolean = false;
  followthroughstageButton: boolean = false;
  FollowUpForm: FormGroup;
  followupthroughid: any;
  nextfollowupthroughid: any;
  stageid: any;
  selectedbutton: any;
  nextfollowupbutton: any;
  stagefollowupbutton: any;
  FollowHistory: any;
  leaddate: Date;
  today = new Date();
  minsold: any;
  fromstagename: any;
  dateplaceholderformat:any;
  public min: Date = this.today;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public dpConfig1: Partial<BsDatepickerConfig> = new BsDatepickerConfig();



  constructor(private cookieservice: CookieService,private fb: FormBuilder, private _followupservice: FollowupService, private toastr: ToastrService, private http: HttpClient, private _funnelpopupdataser: FunnelpopupdataService, private UserService: UserserviceService) {
    this.dpConfig.containerClass = 'theme-dark-blue';
   // this.dpConfig.dateInputFormat = 'DD MMM YYYY';     
    this.dpConfig.dateInputFormat = this.cookieservice.get("saveddateformat");
    this.dateplaceholderformat=this.cookieservice.get("saveddateformat");
    this.dpConfig.showWeekNumbers = false;
    this.dpConfig1.containerClass = 'theme-dark-blue';
   // this.dpConfig1.dateInputFormat = 'DD MMM YYYY';
    this.dpConfig1.dateInputFormat =this.cookieservice.get("saveddateformat");
    this.dpConfig1.showWeekNumbers = false;
    this.dpConfig.minDate = this.min;
    var now = new Date(this.today)
    now.setDate(now.getDate() - 10);
    this.minsold = now.toISOString().slice(0, 10);

    this.dpConfig1.maxDate = this.min;
    this.dpConfig1.minDate = new Date(this.minsold);

    this.FollowUpForm = this.fb.group({

      followupthrough: [''],
      remarks: ['', [Validators.required]],
      stageid: [''],
      reasontocancel: ['', [Validators.required]],
      nextfollowupdate: ['', [Validators.required]],
      nextfollowuptime: ['', [Validators.required]],
      nextfollowupthrough: [''],
      leadid: [''],
      referencefollowupid: [''],
      canceldate: ['', [Validators.required]],
      solddate: ['', [Validators.required]],
      // followuptime: ['', [Validators.required]],
      followupdate: [this.today],
      fromstageid: ['']
    });

  }

  ngOnInit() {
    debugger

    this.UserService.notifyObservable$.subscribe((res) => {

      debugger;
      this.leaddate = res.value.leaddate
    })

    this._followupservice.GetfollwupthroughButtons().subscribe(json => {

      this.followupthroughbuttons = json as string

      this.followupthroughbuttons = eval("(" + this.followupthroughbuttons + ')');
      this.followupthroughbuttons = this.followupthroughbuttons.FT;
    });

    this._followupservice.GetfollwupstageButtons().subscribe(json => {
      this.followupstagesbuttons = json as string
      this.followupstagesbuttons = eval("(" + this.followupstagesbuttons + ')');
      this.followupstagesbuttons.DM.shift();
      this.followupstagesbuttons.DM.pop();
      this.followupstagesbuttons = this.followupstagesbuttons.DM;

    });

    this.leadid = this.UserService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'call_child') {
        debugger;
        this.fromstagename = res.value.stageid
        let httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        });
        let HttpParams = { 'leadid': res.value.leadid }
        let options = {
          headers: httpHeaders,
          params: HttpParams
        };

        this.http.get(environment.apiURL + '/GetFollowuphistory', options).subscribe(json => {
          ////debugger;
          this.FollowHistory = json as string
          if (this.FollowHistory != "") {
            this.FollowHistory = JSON.parse(this.FollowHistory);

            // this.followupthroughid = this.FollowHistory[0].fid
            // this.selectedbutton = this.FollowHistory[0].fid
            // this.followthroughButton = true;
            this.followupthroughid = this.FollowHistory[0].nfid
            this.selectedbutton = this.FollowHistory[0].nfid
            this.followthroughButton = true;

            // this.nextfollowupthroughid = this.FollowHistory[0].nfid
            // this.nextfollowupbutton = this.FollowHistory[0].nfid
            // this.nextfollowthroughButton = true;

            this.stageid = this.FollowHistory[0].stageid
            this.stagefollowupbutton = this.FollowHistory[0].stageid
            this.followthroughstageButton = true;

            if (this.FollowHistory[0].stageid != 104) {
              this.FollowUpForm.get('solddate').setValue('');
              this.FollowUpForm.get('solddate').clearValidators();
              this.FollowUpForm.get('solddate').updateValueAndValidity();
            }

          }
          else {

            this.FollowHistory = [];

          }

        })


      }
    });


  }

  onClick(event) {

    this.followthroughButton = true;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var followupid = idAttr.nodeValue;
    this.followupthroughid = followupid
    this.selectedbutton = idAttr.nodeValue


  }

  onClickNext(event) {

    this.nextfollowthroughButton = true;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var nxtfollowupid = idAttr.nodeValue;
    this.nextfollowupthroughid = nxtfollowupid;
    this.nextfollowupbutton = idAttr.nodeValue

  }



  onClickStage(event) {
    //////debugger;
    this.followthroughstageButton = true;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var updatestageid = idAttr.nodeValue;
    this.stageid = updatestageid;
    this.stagefollowupbutton = idAttr.nodeValue

    if (this.stageid == 105) {
      this.show = true;
      this.hide = false;
      this.Cancelshow = true;
      this.Dateshow = true;
      this.Soldshow = false;
      this.SoldDateshow = false;
      this.FollowUpForm.get('reasontocancel').setValidators([Validators.required]);
      this.FollowUpForm.get('reasontocancel').updateValueAndValidity();
      this.FollowUpForm.get('canceldate').setValidators([Validators.required]);
      this.FollowUpForm.get('canceldate').updateValueAndValidity();
      this.FollowUpForm.get('solddate').setValue('');
      this.FollowUpForm.get('solddate').clearValidators();
      this.FollowUpForm.get('solddate').updateValueAndValidity();
      this.FollowUpForm.get('nextfollowuptime').setValue('');
      this.FollowUpForm.get('nextfollowuptime').clearValidators();
      this.FollowUpForm.get('nextfollowuptime').updateValueAndValidity();
      this.FollowUpForm.get('nextfollowupdate').setValue('');
      this.FollowUpForm.get('nextfollowupdate').clearValidators();
      this.FollowUpForm.get('nextfollowupdate').updateValueAndValidity();
    }



    if (this.stageid == 104) {

      this.Soldshow = true;
      this.hide = false;
      this.Cancelshow = false;
      this.Dateshow = false;
      this.SoldDateshow = true;
      this.show = false;
      this.FollowUpForm.get('reasontocancel').setValue('');
      this.FollowUpForm.get('reasontocancel').clearValidators();
      this.FollowUpForm.get('reasontocancel').updateValueAndValidity();
      this.FollowUpForm.get('solddate').setValidators([Validators.required]);
      this.FollowUpForm.get('solddate').updateValueAndValidity();
      this.FollowUpForm.get('canceldate').setValue('');
      this.FollowUpForm.get('canceldate').clearValidators();
      this.FollowUpForm.get('canceldate').updateValueAndValidity();
      this.FollowUpForm.get('nextfollowuptime').setValue('');
      this.FollowUpForm.get('nextfollowuptime').clearValidators();
      this.FollowUpForm.get('nextfollowuptime').updateValueAndValidity();
      this.FollowUpForm.get('nextfollowupdate').setValue('');
      this.FollowUpForm.get('nextfollowupdate').clearValidators();
      this.FollowUpForm.get('nextfollowupdate').updateValueAndValidity();
    }
    if (this.stageid != 104 && this.stageid != 105) {
      this.Soldshow = false;
      this.show = false;
      this.hide = true;
      this.Cancelshow = false;
      this.Dateshow = false;
      this.SoldDateshow = false;
      this.FollowUpForm.get('reasontocancel').setValue('');
      this.FollowUpForm.get('reasontocancel').clearValidators();
      this.FollowUpForm.get('reasontocancel').updateValueAndValidity();
      this.FollowUpForm.get('solddate').setValue('');
      this.FollowUpForm.get('solddate').clearValidators();
      this.FollowUpForm.get('solddate').updateValueAndValidity();
      this.FollowUpForm.get('canceldate').setValue('');
      this.FollowUpForm.get('canceldate').clearValidators();
      this.FollowUpForm.get('canceldate').updateValueAndValidity();
      this.FollowUpForm.get('nextfollowuptime').setValidators([Validators.required]);
      this.FollowUpForm.get('nextfollowuptime').updateValueAndValidity();
      this.FollowUpForm.get('nextfollowupdate').setValidators([Validators.required]);
      this.FollowUpForm.get('nextfollowupdate').updateValueAndValidity();
    }

  }

  FollowUpSave() {

  debugger;


    if (this.FollowUpForm.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;

    }
    if (this.stageid == 105 || this.stageid == 104) {
      this.nextfollowthroughButton = true
    }
    else {

    }

    if (this.followthroughButton == true) {

      if (this.followthroughstageButton == true) {

        if (this.nextfollowthroughButton == true) {

          // this.leadid = this.UserService.notifyObservable$.subscribe((res) => {
          // if (res.hasOwnProperty('option') && res.option === 'call_child') {

          // this.leadid =res.value.leadid
          // }
          //});

          this.funnelpopupdata = this._funnelpopupdataser.getFunnelpopupdata();
          this.leadid = this.funnelpopupdata.leadid;



          this.FollowUpForm.controls.followupthrough.setValue(this.followupthroughid);

          if (this.stageid == 105 || this.stageid == 104) {
            this.FollowUpForm.controls.nextfollowupthrough.setValue('');
          }
          else {
            this.FollowUpForm.controls.nextfollowupthrough.setValue(this.nextfollowupthroughid);
          }

          this.FollowUpForm.controls.stageid.setValue(this.stageid);
          this.FollowUpForm.controls.leadid.setValue(this.leadid);
          this.FollowUpForm.controls.referencefollowupid.setValue('1001')
          this.FollowUpForm.controls.fromstageid.setValue(this.fromstagename)
          let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          });
          let options = {
            headers: httpHeaders
          };
 

          this._follow = JSON.stringify(this.FollowUpForm.value);
          //this._Source =  this.FollowUpForm.value;
          this.http.post(environment.apiURL + '/InsertFollowup', this._follow, options).subscribe((res) => {
            this.followupsaveresult = res as string
            //  alert("saved successfully...");
            this.toastr.success("Well done! New followup has been saved ")
            this.show = false;
            this.FollowUpForm.reset()
            this.followthroughButton = false;
            this.followthroughstageButton = false;
            this.nextfollowthroughButton = false;
            this.FollowUpForm.get('reasontocancel').setValue('');
            this.FollowUpForm.controls.remarks.setValue('');
            this, this.FollowUpForm.controls.nextfollowuptime.setValue('');
            this.stagefollowupbutton = ''
            this.nextfollowupbutton = ''
            this.selectedbutton = ''
            this.valueChange.emit();
            $('#FreshBusinessDeal').modal('hide');

          }, (err: HttpErrorResponse): any => {
            if (err.error instanceof Error) {
              console.log("client side error");
            }
            else {
              console.log("server side error");
            }
          });

        }
        else {

          this.toastr.info("Check any Next Follow up schedule  button")
        }
      }
      else {
        this.toastr.info("Check any Lead status update  button")

      }
    }
    else {

      this.toastr.info("Check any Current follow up activity button")
    }



  }

  clear() {
    this.show = false;
    this.FollowUpForm.reset()
    this.followthroughButton = false;
    this.followthroughstageButton = false;
    this.nextfollowthroughButton = false;
    this.FollowUpForm.get('reasontocancel').setValue('');
    this.FollowUpForm.controls.remarks.setValue('');
    this, this.FollowUpForm.controls.nextfollowuptime.setValue('');
    this.stagefollowupbutton = ''
    this.nextfollowupbutton = ''
    this.selectedbutton = ''
    //this.onClickStage(101);


    this.Soldshow = false;
    this.show = false;
    this.hide = true;
    this.Cancelshow = false;
    this.Dateshow = false;
    this.SoldDateshow = false;
    this.FollowUpForm.get('reasontocancel').setValue('');
    this.FollowUpForm.get('reasontocancel').clearValidators();
    this.FollowUpForm.get('reasontocancel').updateValueAndValidity();
    this.FollowUpForm.get('solddate').setValue('');
    this.FollowUpForm.get('solddate').clearValidators();
    this.FollowUpForm.get('solddate').updateValueAndValidity();
    this.FollowUpForm.get('canceldate').setValue('');
    this.FollowUpForm.get('canceldate').clearValidators();
    this.FollowUpForm.get('canceldate').updateValueAndValidity();
    this.FollowUpForm.get('nextfollowuptime').setValidators([Validators.required]);
    this.FollowUpForm.get('nextfollowuptime').updateValueAndValidity();
    this.FollowUpForm.get('nextfollowupdate').setValidators([Validators.required]);
    this.FollowUpForm.get('nextfollowupdate').updateValueAndValidity();
  }


  subscribe = this.UserService.notifyObservableFollowupClear$.subscribe((res) => {
    //////debugger;
    //if (res.hasOwnProperty('option') && res.option === 'call_child') {
    //////debugger;
    this.clear();
    //}
  });



}
