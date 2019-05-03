import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FunnelpopupdataService } from "../../../Services/funnelpopup.service";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { Subject } from "rxjs";
import { FollowupComponent } from 'src/app/UI/Components/followup/followup.component';
import { CountriesService } from 'src/app/Services/Countries.service';
import { LeadService } from 'src/app/Services/lead.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { DetailsComponent } from '../details/details.component';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { IFSCcodevalidator } from 'src/app/validators';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { defaultIterableDiffers } from '@angular/core/src/change_detection/change_detection';
import { tick } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';

declare let $: any;

@Component({
  selector: 'app-freshbusiness',
  templateUrl: './freshbusiness.component.html',
  styleUrls: ['./freshbusiness.component.css']
})
export class FreshbusinessComponent implements OnInit {
  //////////debugger;
  @Output() valueChange = new EventEmitter();

  @Input()
  funneldata: Subject<any>
  dealdata: any
  parentId: any;
  ChaildId: any;
  fullname: any;
  Funnelpopupdata: any;
  newsourcesubsource: string;
  titles: any;
  CountryList: any;
  dealids: any;
  text: any;

  ShowElement = true;
  textdata: any;

  assignedtoshow: boolean
  CompanyShow: boolean;
  Companyhide: boolean;
  Edithide: boolean;
  EditShow: boolean;
  Individualshow: boolean;
  Individualhide: boolean;

  Editbuttonshow: boolean;
  EditCancelbuttonshow: boolean;

  UpdateButtonShow: boolean
  otherdetailsShow: boolean
  CompanyDetailsShowOnly: boolean

  shownewdealbutton: boolean;
  showchangesourcebtn: boolean;

  // label display fields
  dealname: any;
  datalist
  dealmaster
  LeadCustomerdata
  LeadCustomerdetailsdata
  LeadCustomerdetailsdataother
  otherempdetails: any;
  assignedtoId: any;
  titlename: any;
  addresstype: any;
  EmployeeData: any;
  assignedTotreeShow: boolean;
  countryname: any;
  alternatecontactno: any;
  details
  AltmobilenoShow: boolean
  dealdataID: any
  stagename: any;
  today = new Date();
  CardData: any;
  CardDataUnchanged: any;
  alternatecountry: string;
  FreshBusinessDealForm: FormGroup;
  childmessage: boolean;
  symbol: any
  @ViewChild(FollowupComponent) myChild: FollowupComponent
  @ViewChild(FollowupComponent) myname;
  @Output()
  refreshfunnel = new EventEmitter<string>();
  data: any
  leadid: any;

  SourcepopupID: any;
  SoldSourcebutton: boolean;
  FreshSourcebutton: boolean;

  checkINDCMPdetails: any
  checkIndCmpNnNe: any
  checkIndCmpNE: any

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private cookieservice: CookieService, private UserService: UserserviceService, private fb: FormBuilder, private formBuilder: FormBuilder, private _funnelpopupdataserveice: FunnelpopupdataService, private countiresService: CountriesService, private leadservice: LeadService, private _httpfreshdeal: HttpClient, private toastr: ToastrService, private http: HttpClient) {
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'DD MMM YYYY';

    this.FreshBusinessDealForm = this.fb.group({
      title: [''],
      country: [''],
      assigneddated: [''],
      fullname: [''],
      mobileno: [''],
      email: [''],
      dealname: [''],
      sourcename: [''],
      query: [''],
      assignedby: [''],
      dealid: [''],
      MobileNosAlt: this.formBuilder.array([]),
      detailsDate: [''],
      assignedto: [''],
      leadeditdate: [this.today, [Validators.required]]
    });

  }


  ngOnInit() {

    debugger;

    //this.Closemodel();

    this.Editbuttonshow = true;
    this.EditCancelbuttonshow = false;

    this.FreshBusinessDealForm.reset();

    this.leadservice.getDealList().then(res => {
      this.dealids = res as string

      this.dealids = JSON.parse(this.dealids);
      this.dealids = this.dealids.deals;
    });

    this.titles = [
      { "id": "1", "name": "Mr." },
      { "id": "2", "name": "Mrs." },
      { "id": "3", "name": "Miss" },
      { "id": "4", "name": "Dr." },
      { "id": "5", "name": "Ms." },
      { "id": "6", "name": "Prof." },
      { "id": "7", "name": "Rev." },
    ];


    this.FreshBusinessDealForm = this.formBuilder.group({

      country: ['', Validators.required],
      title: ['', Validators.required],
      Customername: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      contactno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      dealid: ['', Validators.required],
      dealvalue: ['', Validators.required],
      query: [''],
      sourceid: [''],

      subsourceid: ["", Validators.required],
      assignto: [''],
      newsourcesubsource: [],
      addcompanyandindidual: this.formBuilder.array([
        // Companyname: ['', [Validators.required]],
      ]),
      MobileNosAlt: this.formBuilder.array([]),

      // Companyname: ['', [Validators.required]],
      // Address: ['', [Validators.required]],
      // Area: ['', [Validators.required]],
      // city: ['', [Validators.required]],
      // pincode: ['', [Validators.required]],

      Companyname: [''],
      Address: [''],
      Area: [''],
      city: [''],
      pincode: [''],




      detailsDate: [''],
      Addresstype: [''],
      empdata: this.formBuilder.array([]),
      assignedto: [''],

      leadno: [''],
      addressid: [''],
      employeeid: [''],
      customerid: ['']


    });

    this.CountryList = this.countiresService.getData();


    //Getting Managers/Executives Data

    this._httpfreshdeal.get(environment.apiURL + '/GetManagersAndExecutivesSql').subscribe(json => {
      this.EmployeeData = json;
      console.log(json)
      this.EmployeeData = JSON.parse(this.EmployeeData);
    });


    //getting LeadData to Modify Hear through Service

    this.leadid = this.UserService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'call_child') {
        debugger;
        this.leadid = res.value.leadid

        if (res.value.clientstagename == "Cancel") {
          this.Editbuttonshow = false;
          this.EditCancelbuttonshow = false;
        }
        else {
          this.Editbuttonshow = true;
          this.EditCancelbuttonshow = false;
        }


        if (res.value.clientstagename == "Sold") {
          this.shownewdealbutton = false;
          this.showchangesourcebtn = false;
        } else {
          this.shownewdealbutton = true;
          this.showchangesourcebtn = true;
        }

      }



      //this.Closemodel();

      //this.funneldata.subscribe(res => {
      //////////debugger;
      this.stagename = res.value.clientstagename;
      let leadid = res.value.leadid;
      let test = res["option"]
      this.CardData = res;
      this.CardDataUnchanged = res;
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      //let HttpParams = { 'leadid': leadid }
      let HttpParams = { 'leadid': this.leadid }
      let options = {
        headers: httpHeaders,
        params: HttpParams
      };

      this._httpfreshdeal.get(environment.apiURL + '/GetLeaddata', options).subscribe(json => {
        this.datalist = json as string
        this.datalist = JSON.parse(this.datalist)
        var data = this.datalist[0].finaldealvalue;
        if (data != 0) {
          this.childmessage = false;
        }
        else {
          this.childmessage = true;
        }
        //debugger;
        this.FreshBusinessDealForm.controls.title.setValue(this.datalist[0].dm[0].lc[0].title);
        for (var t = 0; t <= this.titles.length; t++) {
          if (this.datalist[0].dm[0].lc[0].title == this.titles[t].name) {
            this.titlename = this.titles[t].name;
            break;
          }
        }

        this.FreshBusinessDealForm.controls.Customername.setValue(this.datalist[0].dm[0].lc[0].fullname);
        this.FreshBusinessDealForm.controls.contactno.setValue(this.datalist[0].contactno);

        for (var c = 0; c <= this.CountryList.length; c++) {

          // let country = this.CountryList[c].name +' - '+'('+this.CountryList[c].code+')'

          if (this.datalist[0].country == this.CountryList[c].name) {

            this.FreshBusinessDealForm.controls.country.setValue(this.datalist[0].country);
            this.text = this.CountryList[c].code;
            this.countryname = this.CountryList[c].name;
            break;
          }
        }



        if (this.datalist[0].dm[0].lc[0].altmobileno != "") {
          const control = <FormArray>this.FreshBusinessDealForm.controls['MobileNosAlt'];
          control.push(this.getUnit());
          this.FreshBusinessDealForm['controls']['MobileNosAlt']['controls'][0]['controls']['altmobileno'].patchValue(this.datalist[0].dm[0].lc[0].altmobileno);
          this.alternatecontactno = this.datalist[0].dm[0].lc[0].altmobileno
          this.AltmobilenoShow = true;

          for (var c = 0; c <= this.CountryList.length; c++) {
            // let country = this.CountryList[c].name +' - '+'('+this.CountryList[c].code+')'
            if (this.datalist[0].dm[0].lc[0].altcountry == this.CountryList[c].name) {
              //debugger;
              this.FreshBusinessDealForm['controls']['MobileNosAlt']['controls'][0]['controls']['countryduplicate'].setValue(this.datalist[0].dm[0].lc[0].altcountry);
              this.textdata = this.CountryList[c].code;
              this.alternatecountry = this.CountryList[c].name;
              break;
            }
          }
        } else {
          this.textdata = '+91';
          this.AltmobilenoShow = false;
        }

        this.FreshBusinessDealForm.controls.email.setValue(this.datalist[0].email);
        for (var i = 0; i <= this.dealids.length; i++) {
          if (this.dealids[i].dealname == this.datalist[0].dm[0].Dealname) {
            this.FreshBusinessDealForm.controls.dealid.setValue(this.datalist[0].dm[0].dealid);
            this.dealname = this.datalist[0].dm[0].Dealname;

            this.data = this.cookieservice.get("savedformat")
            if (this.data == "India") {
              this.symbol = this.cookieservice.get("symbolofcurrency")
              var result = this.datalist[0].dealvalue.toString().split('.');
              var lastThree = result[0].substring(result[0].length - 3);
              var otherNumbers = result[0].substring(0, result[0].length - 3);
              if (otherNumbers != '')
                lastThree = ',' + lastThree;
              var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
              if (result.length > 1) {
                output += "." + result[1];
              }
              this.FreshBusinessDealForm.controls.dealvalue.setValue(output);
            }
            else {
              this.symbol = this.cookieservice.get("symbolofcurrency")
              var result = this.datalist[0].dealvalue.toString().split('.');
              var lastThree = result[0].substring(result[0].length - 3);
              var otherNumbers = result[0].substring(0, result[0].length - 3);
              if (otherNumbers != '')
                lastThree = ',' + lastThree;
              var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
              if (result.length > 1) {
                output += "." + result[1];
              }
              this.FreshBusinessDealForm.controls.dealvalue.setValue(output);
            }


            // this.FreshBusinessDealForm.controls.dealvalue.setValue(this.datalist[0].dealvalue);
            break;
          }
        }

        // this.FreshBusinessDealForm.controls.dealvalue.setValue('');
        this.FreshBusinessDealForm.controls.query.setValue(this.datalist[0].query);
        this.FreshBusinessDealForm.controls.newsourcesubsource.setValue(this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].vw[0].subsourcename);
        // Below Two Lines Code is Adding Source&SubSource Ids 
        this.FreshBusinessDealForm.controls.subsourceid.setValue(this.datalist[0].subsourceid);
        this.FreshBusinessDealForm.controls.sourceid.setValue(this.datalist[0].sourceid);

        //////////debugger;
        if (this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].employeename != undefined) {
          this.FreshBusinessDealForm.controls.assignedto.setValue(this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].employeename);
        }
        else {
          this.FreshBusinessDealForm.controls.assignedto.setValue('')
        }
        this.assignedtoId = this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].employeeid
        this.assignedtoId = this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].employeeid
        if (this.assignedtoId != undefined) {
          this.FreshBusinessDealForm.controls.assignto.setValue(this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].employeeid)
          this.assignedtoshow = true;
        } else {
          this.assignedtoshow = false;
        }
        //below Line hideing the managers/exexutives tree in pageload 
        this.assignedTotreeShow = false;



        //Company || Individual details Data Binding


        if (this.datalist[0].dm[0].lc[0].lad[0].Addresstype != undefined) {

          if (this.datalist[0].dm[0].lc[0].lad[0].Addresstype == "Individual") {

            this.addresstype = this.datalist[0].dm[0].lc[0].lad[0].Addresstype;
            if (this.datalist[0].dm[0].lc[0].lad[0].Address != "" || this.datalist[0].dm[0].lc[0].lad[0].Area != "" || this.datalist[0].dm[0].lc[0].lad[0].city != "" || this.datalist[0].dm[0].lc[0].lad[0].pincode != "") {


              this.FreshBusinessDealForm.controls.Addresstype.setValue("Individual")

              this.FreshBusinessDealForm.controls.Addresstype.setValue(this.datalist[0].dm[0].lc[0].lad[0].Addresstype)

              this.FreshBusinessDealForm.controls.Companyname.setValue('');
              this.FreshBusinessDealForm.get('Companyname').clearValidators();
              this.FreshBusinessDealForm.get('Companyname').updateValueAndValidity();

              this.CompanyShow = false;
              this.Companyhide = true;

              this.Individualshow = true;
              this.Individualhide = false;


              this.FreshBusinessDealForm.controls.Address.setValue(this.datalist[0].dm[0].lc[0].lad[0].Address);
              this.FreshBusinessDealForm.controls.Area.setValue(this.datalist[0].dm[0].lc[0].lad[0].Area);
              this.FreshBusinessDealForm.controls.city.setValue(this.datalist[0].dm[0].lc[0].lad[0].city);
              this.FreshBusinessDealForm.controls.pincode.setValue(this.datalist[0].dm[0].lc[0].lad[0].pincode);
              this.FreshBusinessDealForm.controls.detailsDate.setValue(this.datalist[0].dm[0].lc[0].lad[0].Address);
            }
            else {

              this.FreshBusinessDealForm.controls.Addresstype.setValue("Individual")

              this.CompanyShow = false;
              this.Companyhide = true;

              this.Individualshow = false;
              this.Individualhide = false;
            }

          }
          else {

            this.FreshBusinessDealForm.controls.Addresstype.setValue("Company")
            this.addresstype = this.datalist[0].dm[0].lc[0].lad[0].Addresstype;

            if (this.datalist[0].dm[0].lc[0].lad[0].Companyname != "" || this.datalist[0].dm[0].lc[0].lad[0].Address != "" || this.datalist[0].dm[0].lc[0].lad[0].Area != "" || this.datalist[0].dm[0].lc[0].lad[0].city != "" || this.datalist[0].dm[0].lc[0].lad[0].pincode != "") {

              this.FreshBusinessDealForm.controls.Addresstype.setValue(this.datalist[0].dm[0].lc[0].lad[0].Addresstype)
              this.CompanyShow = true;
              this.Companyhide = false;

              this.Individualshow = false;
              this.Individualhide = true;

              this.CompanyDetailsShowOnly = true;

              this.FreshBusinessDealForm.controls.Companyname.setValue(this.datalist[0].dm[0].lc[0].lad[0].Companyname);
              this.FreshBusinessDealForm.controls.Address.setValue(this.datalist[0].dm[0].lc[0].lad[0].Address);
              this.FreshBusinessDealForm.controls.Area.setValue(this.datalist[0].dm[0].lc[0].lad[0].Area);
              this.FreshBusinessDealForm.controls.city.setValue(this.datalist[0].dm[0].lc[0].lad[0].city);
              this.FreshBusinessDealForm.controls.pincode.setValue(this.datalist[0].dm[0].lc[0].lad[0].pincode);

              //other details data Binding

              //////////debugger;
              this.details = this.datalist[0].dm[0].lc[0].lad[0].loc;

              // if(this.details[0])
              for (var m = 0; m < this.details.length; m++) {
                //////////debugger;
                if (this.details[m].otherfullname != undefined && this.details[m].otheremail != undefined && this.details[m].othermobileno != undefined && this.details[m].otherdesignation != undefined) {
                  if (this.details[m].otherfullname != "" || this.details[m].otheremail != "" || this.details[m].othermobileno != "" || this.details[m].otherdesignation != "") {
                    const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
                    control.push(this.detailsgetUnit());
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['fullname'].patchValue(this.details[m].otherfullname);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['email'].patchValue(this.details[m].otheremail);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['Desgination'].patchValue(this.details[m].otherdesignation);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['mobileno'].patchValue(this.details[m].othermobileno);
                    this.otherdetailsShow = true;
                  }
                  else {
                    this.otherdetailsShow = false;
                  }
                } else {
                  this.otherdetailsShow = false;
                  const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
                  control.push(this.detailsgetUnit());
                }
              }

            } else {

              this.CompanyShow = true;
              this.Companyhide = false;

              this.Individualshow = false;
              this.Individualhide = true;

              ///should remove


              this.CompanyDetailsShowOnly = false;

              this.details = this.datalist[0].dm[0].lc[0].lad[0].loc;

              for (var m = 0; m < this.details.length; m++) {
                //////////debugger;
                if (this.details[m].otherfullname != undefined && this.details[m].otheremail != undefined && this.details[m].othermobileno != undefined && this.details[m].otherdesignation != undefined) {
                  if (this.details[m].otherfullname != "" || this.details[m].otheremail != "" || this.details[m].othermobileno != "" || this.details[m].otherdesignation != "") {
                    const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
                    control.push(this.detailsgetUnit());
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['fullname'].patchValue(this.details[m].otherfullname);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['email'].patchValue(this.details[m].otheremail);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['Desgination'].patchValue(this.details[m].otherdesignation);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['mobileno'].patchValue(this.details[m].othermobileno);
                    this.otherdetailsShow = true;
                  }
                  else {
                    this.otherdetailsShow = false;
                  }
                } else {
                  this.otherdetailsShow = false;
                  const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
                  control.push(this.detailsgetUnit());

                }
              }



            }


          }



        }
        else {

          this.FreshBusinessDealForm.controls.Addresstype.setValue("Individual")

          this.addresstype = "Individual";
          this.CompanyShow = false;
          this.Companyhide = true;

          this.Individualshow = false;
          this.Individualhide = true;

        }


        //////////debugger;

        this.FreshBusinessDealForm.controls.leadno.setValue(this.datalist[0].leadno)
        this.FreshBusinessDealForm.controls.customerid.setValue(this.datalist[0].dm[0].lc[0].leadcustomerid)
        this.FreshBusinessDealForm.controls.addressid.setValue(this.datalist[0].dm[0].lc[0].lad[0].addressid)
        this.FreshBusinessDealForm.controls.employeeid.setValue(this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].employeeid)
        this.FreshBusinessDealForm.controls.addresstype.setValue(this.datalist[0].dm[0].lc[0].lad[0].Addresstype)

      });

    });

    this.Edithide = true;
    this.EditShow = false;

  }
  GetManagerAndExecutiveId(ExeId: string) {

    ////////debugger;
    let kk = ExeId["ExecutiveID"]
    if (kk === undefined) {

      this.FreshBusinessDealForm.controls.assignto.setValue(ExeId["ManagerID"])
      this.FreshBusinessDealForm.controls.assignedto.setValue(ExeId["ManagerName"]);
    }
    else {
      this.FreshBusinessDealForm.controls.assignto.setValue(ExeId["ExecutiveID"])
      this.FreshBusinessDealForm.controls.assignedto.setValue(ExeId["ExecutiveName"]);
    }

    this.assignedTotreeShow = false;
  }
  ChangeAssignedtoClick() {

    ////////debugger;
    this.assignedTotreeShow = true;

  }
  AssignedToFocus() {
    ////////debugger;
    this.assignedTotreeShow = true;
  }

  displayCounter(count) {
    ////////debugger;
    this.valueChange.emit();
    this.Closemodel();
  }
  focusFunction(Data) {
    debugger;

    $('#leadSource').modal('show');
    this.UserService.notifyOthernew({ option: 'call_child', value: Data.value });

  }
  private getUnit() {
    ////////debugger
    return this.formBuilder.group({
      altmobileno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      countryduplicate: ['India', Validators.required],

    });

  }

  private addUnit() {
    ////////debugger

    if (this.FreshBusinessDealForm.controls['MobileNosAlt']["controls"].length < 1) {
      const control = <FormArray>this.FreshBusinessDealForm.controls['MobileNosAlt'];
      control.push(this.getUnit());
    }
  }

  private removeUnit(i: number) {
    ////////debugger
    const control = <FormArray>this.FreshBusinessDealForm.controls['MobileNosAlt'];
    control.removeAt(i);
    this.textdata = '+91';
  }

  // selectdrop(args) {
  //   ////////debugger;
  //   this.text = this.FreshBusinessDealForm.controls.country.value;
  // }
  // select(args) {
  //   ////////debugger;
  //   this.textdata = this.FreshBusinessDealForm.controls.MobileNosAlt["controls"][0].value.countryduplicate;

  // }
  selectdrop(args) {
    ////////debugger;
    let country = args.target.value;
    for (var i = 0; i < this.CountryList.length; i++) {
      if (country == this.CountryList[i].name) {
        this.text = this.CountryList[i].code;
        this.FreshBusinessDealForm.controls.contactno.setValue('');
      }
    }

    // this.text = this.FreshBusinessDealForm.controls.country.value;
  }
  select(args) {
    ////////debugger;
    //this.textdata=args.target.value;
    let country = args.target.value;
    for (var i = 0; i < this.CountryList.length; i++) {
      if (country == this.CountryList[i].name) {
        this.textdata = this.CountryList[i].code;
        this.FreshBusinessDealForm['controls']['MobileNosAlt']['controls'][0]['controls']['altmobileno'].setValue('');
      }
    }
    //this.textdata = this.FreshBusinessDealForm.controls.MobileNosAlt["controls"][0].value.countryduplicate;

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  UpdateDeals() {
    ////////debugger;

    this.leadservice.getDealList().then(res => {
      this.dealids = res as string

      this.dealids = JSON.parse(this.dealids);
      ////////debugger;
      this.dealids = this.dealids.deals;

      for (let i = this.dealids.length - 1; i >= 0; i--) {
        // if (this.dealids[i].dealname == this.data) {
        this.FreshBusinessDealForm.controls.dealid.setValue(this.dealids[i].dealid);
        this.FreshBusinessDealForm.controls.dealvalue.setValue(this.dealids[i].dealvalue);
        // this.FreshBusinessDealForm.controls.dealvalue.setValue('');        
        break;
        // }
      }

    });
  }

  // selectbussiness(args) {
  //   //debugger;

  //   this.dealdataID = this.FreshBusinessDealForm.controls.dealid.value;
  //   // this.dealids ;
  //   if (this.dealdataID == "") {
  //     this.FreshBusinessDealForm.controls.dealvalue.setValue('');
  //   }
  //   else {
  //     for (var i = 0; i <= this.dealids.length; i++) {
  //       if (this.dealids[i].dealid == this.dealdataID) {
  //         this.FreshBusinessDealForm.controls.dealvalue.setValue(this.dealids[i].dealvalue);
  //         break;
  //       }
  //     }
  //   }
  //   //this.LeadForm.controls.dealvalue.setValue(this.LeadForm.controls.dealname.value)
  // }

  selectbussiness(args) {
    debugger
    this.dealdata = this.FreshBusinessDealForm.controls.dealid.value;
    if (this.dealdata == "") {
      this.FreshBusinessDealForm.controls.dealvalue.setValue('');
    }
    else {
      for (var i = 0; i <= this.dealids.length; i++) {
        if (this.dealids[i].dealid == this.dealdata) {

          //dir
          this.data = this.cookieservice.get("savedformat")
          if (this.data == "India") {

            var result = this.dealids[i].dealvalue.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
              lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
              output += "." + result[1];
            }
            this.FreshBusinessDealForm.controls.dealvalue.setValue(output);
          }
          else {
            var result = this.dealids[i].dealvalue.toString().split('.');
            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
              lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
            if (result.length > 1) {
              output += "." + result[1];
            }
            this.FreshBusinessDealForm.controls.dealvalue.setValue(output);
          }
          break;
          //
        }
      }
    }
    //this.LeadForm.controls.dealvalue.setValue(this.LeadForm.controls.dealname.value)
  }

  CompanydetailsHideandShow(checked: string) {

    ////////debugger;
    if (checked == "individual") {

      this.CompanyShow = false;
      this.Companyhide = true;
      this.FreshBusinessDealForm.setControl('empdata', new FormArray([]));


      if (this.datalist[0].dm[0].lc[0].lad[0].Addresstype == "Individual") {

        this.FreshBusinessDealForm.controls.Address.setValue(this.datalist[0].dm[0].lc[0].lad[0].Address);
        this.FreshBusinessDealForm.controls.Area.setValue(this.datalist[0].dm[0].lc[0].lad[0].Area);
        this.FreshBusinessDealForm.controls.city.setValue(this.datalist[0].dm[0].lc[0].lad[0].city);
        this.FreshBusinessDealForm.controls.pincode.setValue(this.datalist[0].dm[0].lc[0].lad[0].pincode);
        this.FreshBusinessDealForm.controls.detailsDate.setValue(this.datalist[0].dm[0].lc[0].lad[0].Address);

      } else {

        this.FreshBusinessDealForm.controls.Address.setValue("");
        this.FreshBusinessDealForm.controls.Area.setValue("");
        this.FreshBusinessDealForm.controls.city.setValue("");
        this.FreshBusinessDealForm.controls.pincode.setValue("");
      }

    }
    else {
      this.CompanyShow = true;
      this.Companyhide = false;


      if (this.datalist[0].dm[0].lc[0].lad[0].Addresstype == "Company") {

        this.FreshBusinessDealForm.controls.Companyname.setValue(this.datalist[0].dm[0].lc[0].lad[0].Companyname);
        this.FreshBusinessDealForm.controls.Address.setValue(this.datalist[0].dm[0].lc[0].lad[0].Address);
        this.FreshBusinessDealForm.controls.Area.setValue(this.datalist[0].dm[0].lc[0].lad[0].Area);
        this.FreshBusinessDealForm.controls.city.setValue(this.datalist[0].dm[0].lc[0].lad[0].city);
        this.FreshBusinessDealForm.controls.pincode.setValue(this.datalist[0].dm[0].lc[0].lad[0].pincode);

        this.details = this.datalist[0].dm[0].lc[0].lad[0].loc;
        this.FreshBusinessDealForm.setControl('empdata', new FormArray([]));
        for (var m = 0; m < this.details.length; m++) {
          ////////debugger;
          const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
          control.push(this.detailsgetUnit());
          this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['fullname'].patchValue(this.details[m].otherfullname);
          this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['email'].patchValue(this.details[m].otheremail);
          this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['Desgination'].patchValue(this.details[m].otherdesignation);
          this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['mobileno'].patchValue(this.details[m].othermobileno);

        }

      }
      else {


        this.FreshBusinessDealForm.controls.Address.setValue("");
        this.FreshBusinessDealForm.controls.Area.setValue("");
        this.FreshBusinessDealForm.controls.city.setValue("");
        this.FreshBusinessDealForm.controls.pincode.setValue("");
        this.FreshBusinessDealForm.controls.Companyname.setValue("");
        // this.FreshBusinessDealForm.get('Companyname').setValidators(Validators.required);
        this.FreshBusinessDealForm.setControl('empdata', new FormArray([]));
        const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
        control.push(this.detailsgetUnit());
        //changed now
      }





    }
  }

  EditdetailsHideandShow(data: string) {
    debugger;
    if (data == "edit") {

      this.Edithide = false;
      this.EditShow = true;

      this.Editbuttonshow = false;
      this.EditCancelbuttonshow = true;

      this.UpdateButtonShow = true;



    }
    else {
      if (confirm("Do you want to Cancel Lead Data Edit")) {


        //Below code for delete the dynamic formarray control of empdata 
        const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
        for (let i = control.length - 1; i >= 0; i--) {
          control.removeAt(i)
        }

        //Below code for delete the dynamic formarray control of AlternateMobileNos 
        const Altmobilecontrol = <FormArray>this.FreshBusinessDealForm.controls['MobileNosAlt'];
        for (let i = Altmobilecontrol.length - 1; i >= 0; i--) {
          Altmobilecontrol.removeAt(i)
        }



        this.Edithide = true;
        this.EditShow = false;

        this.Editbuttonshow = true;
        this.EditCancelbuttonshow = false;

        this.UpdateButtonShow = false;



        this.FreshBusinessDealForm.controls.title.setValue(this.datalist[0].dm[0].lc[0].title);
        for (var t = 0; t <= this.titles.length; t++) {
          if (this.datalist[0].dm[0].lc[0].title == this.titles[t].name) {
            this.titlename = this.titles[t].name;
            break;
          }
        }

        this.FreshBusinessDealForm.controls.Customername.setValue(this.datalist[0].dm[0].lc[0].fullname);
        this.FreshBusinessDealForm.controls.contactno.setValue(this.datalist[0].contactno);

        for (var c = 0; c <= this.CountryList.length; c++) {

          if (this.datalist[0].country == this.CountryList[c].name) {

            this.FreshBusinessDealForm.controls.country.setValue(this.datalist[0].country);
            this.text = this.CountryList[c].code;
            this.countryname = this.CountryList[c].name;
            break;
          }
        }

        if (this.datalist[0].dm[0].lc[0].altmobileno != "") {

          const control = <FormArray>this.FreshBusinessDealForm.controls['MobileNosAlt'];
          control.push(this.getUnit());
          this.FreshBusinessDealForm['controls']['MobileNosAlt']['controls'][0]['controls']['altmobileno'].patchValue(this.datalist[0].dm[0].lc[0].altmobileno);
          this.alternatecontactno = this.datalist[0].dm[0].lc[0].altmobileno
          this.AltmobilenoShow = true;

          for (var c = 0; c <= this.CountryList.length; c++) {

            if (this.datalist[0].dm[0].lc[0].altcountry != "") {
              if (this.datalist[0].dm[0].lc[0].altcountry == this.CountryList[c].name) {
                ////////debugger;
                this.FreshBusinessDealForm['controls']['MobileNosAlt']['controls'][0]['controls']['countryduplicate'].setValue(this.datalist[0].dm[0].lc[0].altcountry);
                this.textdata = this.CountryList[c].code;
                this.alternatecountry = this.CountryList[c].name;
                break;
              }
            }

          }
        } else {
          this.textdata = '+91';
          this.AltmobilenoShow = false;
          //this.FreshBusinessDealForm['controls']['MobileNosAlt']['controls'][0]['controls']['countryduplicate'].patchValue('India');
        }

        this.FreshBusinessDealForm.controls.email.setValue(this.datalist[0].email);
        // for (var i = 0; i <= this.dealids.length; i++) {
        //   if (this.dealids[i].dealname == this.datalist[0].dm[0].Dealname) {
        //     this.FreshBusinessDealForm.controls.dealid.setValue(this.datalist[0].dm[0].dealid);
        //     this.dealname = this.datalist[0].dm[0].Dealname;
        //     this.FreshBusinessDealForm.controls.dealvalue.setValue(this.datalist[0].dealvalue);
        //     break;
        //   }
        // }
         for (var i = 0; i <= this.dealids.length; i++) {
          if (this.dealids[i].dealname == this.datalist[0].dm[0].Dealname) {
            this.FreshBusinessDealForm.controls.dealid.setValue(this.datalist[0].dm[0].dealid);
            this.dealname = this.datalist[0].dm[0].Dealname;

            this.data = this.cookieservice.get("savedformat")
            if (this.data == "India") {
              this.symbol = this.cookieservice.get("symbolofcurrency")
              var result = this.datalist[0].dealvalue.toString().split('.');
              var lastThree = result[0].substring(result[0].length - 3);
              var otherNumbers = result[0].substring(0, result[0].length - 3);
              if (otherNumbers != '')
                lastThree = ',' + lastThree;
              var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
              if (result.length > 1) {
                output += "." + result[1];
              }
              this.FreshBusinessDealForm.controls.dealvalue.setValue(output);
            }
            else {
              this.symbol = this.cookieservice.get("symbolofcurrency")
              var result = this.datalist[0].dealvalue.toString().split('.');
              var lastThree = result[0].substring(result[0].length - 3);
              var otherNumbers = result[0].substring(0, result[0].length - 3);
              if (otherNumbers != '')
                lastThree = ',' + lastThree;
              var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
              if (result.length > 1) {
                output += "." + result[1];
              }
              this.FreshBusinessDealForm.controls.dealvalue.setValue(output);
            }


            // this.FreshBusinessDealForm.controls.dealvalue.setValue(this.datalist[0].dealvalue);
            break;
          }
        }
         
        this.FreshBusinessDealForm.controls.query.setValue(this.datalist[0].query);
        this.FreshBusinessDealForm.controls.newsourcesubsource.setValue(this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].vw[0].subsourcename);
        // Below Two Lines Code is Adding Source&SubSource Ids 
        this.FreshBusinessDealForm.controls.subsourceid.setValue(this.datalist[0].subsourceid);
        this.FreshBusinessDealForm.controls.sourceid.setValue(this.datalist[0].sourceid);

        ////////debugger;
        this.FreshBusinessDealForm.controls.assignedto.setValue(this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].employeename);
        this.assignedtoId = this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].employeeid
        this.FreshBusinessDealForm.controls.assignto.setValue(this.datalist[0].dm[0].lc[0].lad[0].loc[0].lbd[0].em[0].employeeid)

        //below Line hideing the managers/exexutives tree in pageload 
        this.assignedTotreeShow = false;

        //Company || Individual details Data Binding

        if (this.datalist[0].dm[0].lc[0].lad[0].Addresstype != undefined) {

          if (this.datalist[0].dm[0].lc[0].lad[0].Addresstype == "Individual") {

            this.addresstype = this.datalist[0].dm[0].lc[0].lad[0].Addresstype;
            if (this.datalist[0].dm[0].lc[0].lad[0].Address != "" || this.datalist[0].dm[0].lc[0].lad[0].Area != "" || this.datalist[0].dm[0].lc[0].lad[0].city != "" || this.datalist[0].dm[0].lc[0].lad[0].pincode != "") {


              this.FreshBusinessDealForm.controls.Addresstype.setValue("Individual")

              this.FreshBusinessDealForm.controls.Addresstype.setValue(this.datalist[0].dm[0].lc[0].lad[0].Addresstype)

              this.FreshBusinessDealForm.controls.Companyname.setValue('');
              this.FreshBusinessDealForm.get('Companyname').clearValidators();
              this.FreshBusinessDealForm.get('Companyname').updateValueAndValidity();

              this.CompanyShow = false;
              this.Companyhide = true;

              this.Individualshow = true;
              this.Individualhide = false;


              this.FreshBusinessDealForm.controls.Address.setValue(this.datalist[0].dm[0].lc[0].lad[0].Address);
              this.FreshBusinessDealForm.controls.Area.setValue(this.datalist[0].dm[0].lc[0].lad[0].Area);
              this.FreshBusinessDealForm.controls.city.setValue(this.datalist[0].dm[0].lc[0].lad[0].city);
              this.FreshBusinessDealForm.controls.pincode.setValue(this.datalist[0].dm[0].lc[0].lad[0].pincode);
              this.FreshBusinessDealForm.controls.detailsDate.setValue(this.datalist[0].dm[0].lc[0].lad[0].Address);
            }
            else {

              this.FreshBusinessDealForm.controls.Addresstype.setValue("Individual")

              this.CompanyShow = false;
              this.Companyhide = true;

              this.Individualshow = false;
              this.Individualhide = false;
            }

          }
          else {

            this.FreshBusinessDealForm.controls.Addresstype.setValue("Company")
            this.addresstype = this.datalist[0].dm[0].lc[0].lad[0].Addresstype;

            if (this.datalist[0].dm[0].lc[0].lad[0].Companyname != "" || this.datalist[0].dm[0].lc[0].lad[0].Address != "" || this.datalist[0].dm[0].lc[0].lad[0].Area != "" || this.datalist[0].dm[0].lc[0].lad[0].city != "" || this.datalist[0].dm[0].lc[0].lad[0].pincode != "") {

              this.FreshBusinessDealForm.controls.Addresstype.setValue(this.datalist[0].dm[0].lc[0].lad[0].Addresstype)
              this.CompanyShow = true;
              this.Companyhide = false;

              this.Individualshow = false;
              this.Individualhide = true;

              this.CompanyDetailsShowOnly = true;

              this.FreshBusinessDealForm.controls.Companyname.setValue(this.datalist[0].dm[0].lc[0].lad[0].Companyname);
              this.FreshBusinessDealForm.controls.Address.setValue(this.datalist[0].dm[0].lc[0].lad[0].Address);
              this.FreshBusinessDealForm.controls.Area.setValue(this.datalist[0].dm[0].lc[0].lad[0].Area);
              this.FreshBusinessDealForm.controls.city.setValue(this.datalist[0].dm[0].lc[0].lad[0].city);
              this.FreshBusinessDealForm.controls.pincode.setValue(this.datalist[0].dm[0].lc[0].lad[0].pincode);

              //other details data Binding

              ////////debugger;
              this.details = this.datalist[0].dm[0].lc[0].lad[0].loc;

              // if(this.details[0])
              for (var m = 0; m < this.details.length; m++) {
                ////////debugger;
                if (this.details[m].otherfullname != undefined && this.details[m].otheremail != undefined && this.details[m].othermobileno != undefined && this.details[m].otherdesignation != undefined) {
                  if (this.details[m].otherfullname != "" || this.details[m].otheremail != "" || this.details[m].othermobileno != "" || this.details[m].otherdesignation != "") {
                    const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
                    control.push(this.detailsgetUnit());
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['fullname'].patchValue(this.details[m].otherfullname);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['email'].patchValue(this.details[m].otheremail);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['Desgination'].patchValue(this.details[m].otherdesignation);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['mobileno'].patchValue(this.details[m].othermobileno);
                    this.otherdetailsShow = true;
                  }
                  else {
                    this.otherdetailsShow = false;
                  }
                } else {
                  this.otherdetailsShow = false;
                  const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
                  control.push(this.detailsgetUnit());
                }
              }

            } else {

              this.CompanyShow = true;
              this.Companyhide = false;

              this.Individualshow = false;
              this.Individualhide = true;

              ///should remove


              this.CompanyDetailsShowOnly = false;

              this.details = this.datalist[0].dm[0].lc[0].lad[0].loc;

              for (var m = 0; m < this.details.length; m++) {
                ////////debugger;
                if (this.details[m].otherfullname != undefined && this.details[m].otheremail != undefined && this.details[m].othermobileno != undefined && this.details[m].otherdesignation != undefined) {
                  if (this.details[m].otherfullname != "" || this.details[m].otheremail != "" || this.details[m].othermobileno != "" || this.details[m].otherdesignation != "") {
                    const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
                    control.push(this.detailsgetUnit());
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['fullname'].patchValue(this.details[m].otherfullname);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['email'].patchValue(this.details[m].otheremail);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['Desgination'].patchValue(this.details[m].otherdesignation);
                    this.FreshBusinessDealForm['controls']['empdata']['controls'][m]['controls']['mobileno'].patchValue(this.details[m].othermobileno);
                    this.otherdetailsShow = true;
                  }
                  else {
                    this.otherdetailsShow = false;
                  }
                } else {
                  this.otherdetailsShow = false;
                  const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
                  control.push(this.detailsgetUnit());

                }
              }



            }


          }
        }
        else {

          this.FreshBusinessDealForm.controls.Addresstype.setValue("Individual")

          this.addresstype = "Individual";
          this.CompanyShow = false;
          this.Companyhide = true;

          this.Individualshow = false;
          this.Individualhide = true;


        }



      }

    }
  }

  EditCancelShow(data: string) {

    if (data == "edit") {

      this.Editbuttonshow = false;
      this.EditCancelbuttonshow = true;
    }
    else {
      this.Editbuttonshow = true;
      this.EditCancelbuttonshow = false;
    }

  }


  private detailsgetUnit() {
    return this.formBuilder.group({
      fullname: [''],
      email: [''],
      Desgination: [''],
      mobileno: ['']

    });
  }

  private detailsaddUnit() {
    if (this.FreshBusinessDealForm.controls['empdata']["controls"].length < 4) {
      const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
      control.push(this.detailsgetUnit());
    }
  }


  private detailsremoveUnit(i: number) {
    const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
    control.removeAt(i);
  }



  Closemodel() {

    debugger;

    //this.myChild.clear();
    this.UserService.notifToFollowup();

    ////////debugger;
    this.Edithide = true;
    this.EditShow = false;

    this.Editbuttonshow = true;
    this.EditCancelbuttonshow = false;

    //this.Editbuttonshow = false;
    // this.EditCancelbuttonshow = true;

    this.AltmobilenoShow = false;

    this.UpdateButtonShow = false;
    //Below code for delete the dynamic formarray control of empdata 
    const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i)
    }

    //Below code for delete the dynamic formarray control of AlternateMobileNos 
    const Altmobilecontrol = <FormArray>this.FreshBusinessDealForm.controls['MobileNosAlt'];
    for (let i = Altmobilecontrol.length - 1; i >= 0; i--) {
      Altmobilecontrol.removeAt(i)
    }

    //Unchecking the Individual&Company Radio Buttons
    this.FreshBusinessDealForm.controls.Addresstype.setValue('')

    //clearing subsource
    this.UserService.notifyOthernewupdatesubsource({ option: 'call_child', value: this.CardDataUnchanged.value });

    $('#FreshBusinessDeal').modal('hide');
    $('#SoldBusinessDealHistory').modal('hide');
    $('#CancelledBusinessDeal').modal('hide');
    this.FreshBusinessDealForm.reset();


  }

  getsourcedata(user: string) {
    ////////debugger;
    this.ChaildId = user.split('-C')[1].split('-P')[0]
    this.parentId = user.split('-C')[1].split('-P')[1]
    this.FreshBusinessDealForm.controls.newsourcesubsource.setValue(user.split('-C')[0]);
  }
  //this.ClickedCardData=res;
  SaveLeadEditdetails() {
    debugger;

    if (this.addresstype == "Company") {

      this.checkINDCMPdetails = (this.FreshBusinessDealForm.controls.Companyname.value != "" || this.FreshBusinessDealForm.controls.Address.value != "" || this.FreshBusinessDealForm.controls.Area.value != "" || this.FreshBusinessDealForm.controls.city.value != "" || this.FreshBusinessDealForm.controls.pincode.value != "") && (this.FreshBusinessDealForm.controls.Companyname.value != null || this.FreshBusinessDealForm.controls.Address.value != null || this.FreshBusinessDealForm.controls.Area.value != null || this.FreshBusinessDealForm.controls.city.value != null || this.FreshBusinessDealForm.controls.pincode.value != null)
      this.checkIndCmpNnNe = this.FreshBusinessDealForm.controls.Companyname.value != "" && this.FreshBusinessDealForm.controls.Companyname.value != null && this.FreshBusinessDealForm.controls.Address.value != "" && this.FreshBusinessDealForm.controls.Address.value != null && this.FreshBusinessDealForm.controls.Area.value != "" && this.FreshBusinessDealForm.controls.Area.value != null && this.FreshBusinessDealForm.controls.city.value != "" && this.FreshBusinessDealForm.controls.city.value != null && this.FreshBusinessDealForm.controls.pincode.value != "" && this.FreshBusinessDealForm.controls.pincode.value != null
      this.checkIndCmpNE = this.FreshBusinessDealForm.controls.Companyname.value == "" || this.FreshBusinessDealForm.controls.Companyname.value == null || this.FreshBusinessDealForm.controls.Address.value == "" || this.FreshBusinessDealForm.controls.Address.value == null || this.FreshBusinessDealForm.controls.Area.value == "" || this.FreshBusinessDealForm.controls.Area.value == null || this.FreshBusinessDealForm.controls.city.value == "" || this.FreshBusinessDealForm.controls.city.value == null || this.FreshBusinessDealForm.controls.pincode.value == "" || this.FreshBusinessDealForm.controls.pincode.value == null
    }
    else {

      this.checkINDCMPdetails = (this.FreshBusinessDealForm.controls.Address.value != "" || this.FreshBusinessDealForm.controls.Area.value != "" || this.FreshBusinessDealForm.controls.city.value != "" || this.FreshBusinessDealForm.controls.pincode.value != "") && (this.FreshBusinessDealForm.controls.Address.value != null || this.FreshBusinessDealForm.controls.Area.value != null || this.FreshBusinessDealForm.controls.city.value != null || this.FreshBusinessDealForm.controls.pincode.value != null)
      this.checkIndCmpNnNe = this.FreshBusinessDealForm.controls.Address.value != "" && this.FreshBusinessDealForm.controls.Address.value != null && this.FreshBusinessDealForm.controls.Area.value != "" && this.FreshBusinessDealForm.controls.Area.value != null && this.FreshBusinessDealForm.controls.city.value != "" && this.FreshBusinessDealForm.controls.city.value != null && this.FreshBusinessDealForm.controls.pincode.value != "" && this.FreshBusinessDealForm.controls.pincode.value != null
      this.checkIndCmpNE = this.FreshBusinessDealForm.controls.Address.value == "" || this.FreshBusinessDealForm.controls.Address.value == null || this.FreshBusinessDealForm.controls.Area.value == "" || this.FreshBusinessDealForm.controls.Area.value == null || this.FreshBusinessDealForm.controls.city.value == "" || this.FreshBusinessDealForm.controls.city.value == null || this.FreshBusinessDealForm.controls.pincode.value == "" || this.FreshBusinessDealForm.controls.pincode.value == null
    }


    if (this.checkINDCMPdetails) {
      // if ((this.FreshBusinessDealForm.controls.Address.value != "" || this.FreshBusinessDealForm.controls.Area.value != "" || this.FreshBusinessDealForm.controls.city.value != "" || this.FreshBusinessDealForm.controls.pincode.value != "") && (this.FreshBusinessDealForm.controls.Address.value != null || this.FreshBusinessDealForm.controls.Area.value != null || this.FreshBusinessDealForm.controls.city.value != null || this.FreshBusinessDealForm.controls.pincode.value != null)) {

       if (this.checkIndCmpNnNe) {
      //if (this.FreshBusinessDealForm.controls.Address.value != "" && this.FreshBusinessDealForm.controls.Address.value != null && this.FreshBusinessDealForm.controls.Area.value != "" && this.FreshBusinessDealForm.controls.Area.value != null && this.FreshBusinessDealForm.controls.city.value != "" && this.FreshBusinessDealForm.controls.city.value != null && this.FreshBusinessDealForm.controls.pincode.value != "" && this.FreshBusinessDealForm.controls.pincode.value != null) {

        if (this.FreshBusinessDealForm.invalid) {
          this.toastr.warning("Please fill all the required mandatory fields..!");
          return;
        }
        if (this.ChaildId !== undefined && this.parentId !== undefined) {
          this.FreshBusinessDealForm.controls.subsourceid.setValue(this.ChaildId);
          this.FreshBusinessDealForm.controls.sourceid.setValue(this.parentId);
        }

        this.FreshBusinessDealForm.value.addcompanyandindidual.push(0, { Companyname: this.FreshBusinessDealForm.controls.Companyname.value, Address: this.FreshBusinessDealForm.controls.Address.value, Area: this.FreshBusinessDealForm.controls.Area.value, city: this.FreshBusinessDealForm.controls.city.value, pincode: this.FreshBusinessDealForm.controls.pincode.value, detailsDate: this.FreshBusinessDealForm.controls.detailsDate.value, empdata: this.FreshBusinessDealForm.controls.empdata.value });

        let d = this.FreshBusinessDealForm.controls.dealvalue.value;
        let s = d.split(',');
        let n = s.join('')
        d = n;
        this.FreshBusinessDealForm.controls.dealvalue.setValue(d);

        let add = JSON.stringify(this.FreshBusinessDealForm.value)

        let httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        });
        let options = {
          headers: httpHeaders
        };

        ////////debugger;
        if (confirm("Are you sure  do you want to update lead...?")) {
          this.http.post(environment.apiURL + '/Leadupdate', add, options).subscribe(json => {
            ////////debugger;

            this.Editbuttonshow = true;
            this.EditCancelbuttonshow = false;

            this.Edithide = true;
            this.EditShow = false;

            this.UpdateButtonShow = false;
            //Below code for delete the dynamic formarray control of empdata 
            const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
            for (let i = control.length - 1; i >= 0; i--) {
              control.removeAt(i)
            }

            //Below code for delete the dynamic formarray control of AlternateMobileNos 
            const Altmobilecontrol = <FormArray>this.FreshBusinessDealForm.controls['MobileNosAlt'];
            for (let i = Altmobilecontrol.length - 1; i >= 0; i--) {
              Altmobilecontrol.removeAt(i)
            }


            this.FreshBusinessDealForm.setControl('addcompanyandindidual', new FormArray([]));
            this.Closemodel();
            // this.FreshBusinessDealForm.value.addcompanyandindidual.push(0,{});
            $('#FreshBusinessDeal').modal('hide');
            $('#SoldBusinessDealHistory').modal('hide');
            this.toastr.success("Well done!  lead updated successfully...")
            this.refreshfunnel.emit();

          });
        }


      }
      //else if (this.FreshBusinessDealForm.controls.Address.value == "" || this.FreshBusinessDealForm.controls.Address.value == null || this.FreshBusinessDealForm.controls.Area.value == "" || this.FreshBusinessDealForm.controls.Area.value == null || this.FreshBusinessDealForm.controls.city.value == "" || this.FreshBusinessDealForm.controls.city.value == null || this.FreshBusinessDealForm.controls.pincode.value == "" || this.FreshBusinessDealForm.controls.pincode.value == null) {
         else if (this.checkIndCmpNE) { 
        this.toastr.warning("Please Fill Complete Address Details..!");
      }


    } else {


      if (this.FreshBusinessDealForm.invalid) {
        this.toastr.warning("Please fill all the required mandatory fields..!");
        return;
      }
      if (this.ChaildId !== undefined && this.parentId !== undefined) {
        this.FreshBusinessDealForm.controls.subsourceid.setValue(this.ChaildId);
        this.FreshBusinessDealForm.controls.sourceid.setValue(this.parentId);
      }

      // this.FreshBusinessDealForm.value. addcompanyandindidual.

      this.FreshBusinessDealForm.value.addcompanyandindidual.push(0, { Companyname: this.FreshBusinessDealForm.controls.Companyname.value, Address: this.FreshBusinessDealForm.controls.Address.value, Area: this.FreshBusinessDealForm.controls.Area.value, city: this.FreshBusinessDealForm.controls.city.value, pincode: this.FreshBusinessDealForm.controls.pincode.value, detailsDate: this.FreshBusinessDealForm.controls.detailsDate.value, empdata: this.FreshBusinessDealForm.controls.empdata.value });

      let d = this.FreshBusinessDealForm.controls.dealvalue.value;
      let s = d.split(',');
      let n = s.join('')
      d = n;
      this.FreshBusinessDealForm.controls.dealvalue.setValue(d);

      let add = JSON.stringify(this.FreshBusinessDealForm.value)

      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      let options = {
        headers: httpHeaders
      };

      ////////debugger;
      if (confirm("Are you sure  do you want to update lead...?")) {
        this.http.post(environment.apiURL + '/Leadupdate', add, options).subscribe(json => {
          ////////debugger;

          this.Editbuttonshow = true;
          this.EditCancelbuttonshow = false;

          this.Edithide = true;
          this.EditShow = false;

          this.UpdateButtonShow = false;
          //Below code for delete the dynamic formarray control of empdata 
          const control = <FormArray>this.FreshBusinessDealForm.controls['empdata'];
          for (let i = control.length - 1; i >= 0; i--) {
            control.removeAt(i)
          }

          //Below code for delete the dynamic formarray control of AlternateMobileNos 
          const Altmobilecontrol = <FormArray>this.FreshBusinessDealForm.controls['MobileNosAlt'];
          for (let i = Altmobilecontrol.length - 1; i >= 0; i--) {
            Altmobilecontrol.removeAt(i)
          }


          this.FreshBusinessDealForm.setControl('addcompanyandindidual', new FormArray([]));
          this.Closemodel();
          // this.FreshBusinessDealForm.value.addcompanyandindidual.push(0,{});
          $('#FreshBusinessDeal').modal('hide');
          $('#SoldBusinessDealHistory').modal('hide');
          this.toastr.success("Well done!  lead updated successfully...")
          this.refreshfunnel.emit();

        });
      }

    }
  }








}
