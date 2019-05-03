import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SourceComponent } from "../source/source.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FilterPipe } from 'ngx-filter-pipe';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { LeadService } from 'src/app/Services/lead.service';
import { CountriesService } from 'src/app/Services/Countries.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DetailsComponent } from 'src/app/UI/Components/details/details.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';

declare let $: any;

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  @Output()
  LeadForm: FormGroup;
  submitted = false;
  parentId: any;
  ChaildId: any;
  CountryList: any;
  CountryListDuplicate: any;
  newsourcesubsource: string;
  subscription: Subscription;
  myData: any;
  EmployeeData: any;
  userFilter: any = { ManagerName: '' };
  titles: any;
  countrys: any;
  dealids: any;
  data: any;
  text: any;
  textdata: any;
  details: any;
  results: any;
  next: any;
  dealdata: any;
  today = new Date();
  symbol:any;

  MobileNosAlt: FormArray;
  ShowElement = true;
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

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private cookieservice:CookieService,private route: ActivatedRoute, private filterPipe: FilterPipe, private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private userservice: UserserviceService, private leadservice: LeadService, private countiresService: CountriesService, private toastr: ToastrService) {
    let employeeName: string = "John";
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'DD MMM YYYY';
    this.dpConfig.showWeekNumbers = false;
  }
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  @ViewChild(DetailsComponent) myChild;

  ngOnInit() {
    debugger;

    this.symbol=this.cookieservice.get("symbolofcurrency")

    this.http.get(environment.apiURL + '/GetManagersAndExecutivesSql').subscribe(json => {
      this.EmployeeData = json;
      debugger
      console.log(json)
      this.EmployeeData = JSON.parse(this.EmployeeData);
    });

    this.leadservice.getDealList().then(res => {
      this.dealids = res as string
      debugger;
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
    this.LeadForm = this.formBuilder.group({
      countrycode: ['+91', Validators.required],

      country: ['India'],
      title: ['', Validators.required],
      Customername: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      contactno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      dealid: ['', Validators.required],
      dealvalue: ['', Validators.required],
      //query: ['',[Validators.required]],
      query: [''],
      sourceid: [''],
      leaddate: [this.today],
      subsourceid: ["", Validators.required],
      assignto: [''],
      // newsourcesubsource:[],
      addcompanyandindidual: this.formBuilder.array([

      ]),
      MobileNosAlt: this.formBuilder.array([

      ])
      //a1=str.split(" ",3);

    });
    this.CountryList = this.countiresService.getData();
    this.text = '+91';
    this.textdata = '+91';
  }
  get f() { return this.LeadForm.controls; }

  private getUnit(i: number) {
    debugger
    return this.formBuilder.group({
      altmobileno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      countryduplicate: ['+91', Validators.required],
      altcountry: ['India']
    });

  }

  private addUnit(i: number) {
    debugger

    if (this.LeadForm.controls['MobileNosAlt']["controls"].length < 1) {
      const control = <FormArray>this.LeadForm.controls['MobileNosAlt'];
      control.push(this.getUnit(i));
    }
  }

  private removeUnit(i: number) {
    debugger
    const control = <FormArray>this.LeadForm.controls['MobileNosAlt'];
    control.removeAt(i);
    //   if(i=1)
    //   {
    //   this.ShowElement= false;
    // }
    this.textdata = '+91';
  }
  GetManagerAndExecutiveId(ExeId: string) {

    let kk = ExeId["ExecutiveID"]
    if (kk === undefined) {

      this.LeadForm.controls.assignto.setValue(ExeId["ManagerID"])

    }
    else {
      this.LeadForm.controls.assignto.setValue(ExeId["ExecutiveID"])

    }
  }

  getsourcedata(user: string) {
    debugger;
    this.ChaildId = user.split('-C')[1].split('-P')[0]
    this.parentId = user.split('-C')[1].split('-P')[1]
    this.newsourcesubsource = user.split('-C')[0];
  }
  getaddressdata() {
    this.data = this.userservice.getData();
    return this.data;
  }

  getBussinessdata() {

    this.data = this.userservice.getDataBusiness();
    return this.data;
    //console.log(this.data);

  }

  ChekDuplicateNos() {
    debugger;

    if (this.LeadForm['controls']['MobileNosAlt']['controls'][0]['controls']['altmobileno'].value != "") {
      if (this.LeadForm.controls.contactno.value == this.LeadForm['controls']['MobileNosAlt']['controls'][0]['controls']['altmobileno'].value) {
       
        this.LeadForm['controls']['MobileNosAlt']['controls'][0]['controls']['altmobileno'].setValue('');
        this.toastr.warning("contact no. and alternate contact no. should not be same")
      }
    }

  }


  onSubmit() {
    debugger;




    this.LeadForm.value;
    this.submitted = true;
    // stop here if form is invalid
    if ((this.ChaildId !== undefined && this.parentId !== undefined) || (this.ChaildId != "" && this.parentId != "")) {
      debugger;
      this.LeadForm.controls.subsourceid.setValue(this.ChaildId);
      this.LeadForm.controls.sourceid.setValue(this.parentId);
    }


    if (this.LeadForm.invalid) {

      if(  this.LeadForm['controls']['MobileNosAlt']['controls'][0]['controls']['altmobileno'].value ==''){
        this.toastr.warning("alternate phone number should not be empty");
        return;
      }else{
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;
      }

    }
    this.data = this.userservice.getData();

    debugger;
    this.LeadForm.value['addcompanyandindidual'].push(this.getaddressdata());

    this.LeadForm.controls.subsourceid.setValue(this.ChaildId);
    this.LeadForm.controls.sourceid.setValue(this.parentId);
    let d=this.LeadForm.controls.dealvalue.value;
    let s = d.split(',');
    let n = s.join('')
    d = n;
    this.LeadForm.controls.dealvalue.setValue(d);
    let add = JSON.stringify(this.LeadForm.value)


    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };

    debugger;
    if (confirm("Are you sure to Save")) {
      this.http.post(environment.apiURL + '/LeadEntrySave', add, options).subscribe(json => {

        debugger;

        //alert("Saved Successfully !");
        this.toastr.success("Well done! New lead has been saved")
        this.router.navigateByUrl("/funnel");
        this.ChaildId = "";
        this.parentId = "";
      });
    }
  }

  SaveLeadEntry() {

    this.submitted = true;
    // stop here if form is invalid
    if ((this.ChaildId !== undefined && this.parentId !== undefined) || (this.ChaildId != "" && this.parentId != "")) {
      debugger;
      this.LeadForm.controls.subsourceid.setValue(this.ChaildId);
      this.LeadForm.controls.sourceid.setValue(this.parentId);
    }

    //removing commas hear
    let d=this.LeadForm.controls.dealvalue.value;
    let s = d.split(',');
    let n = s.join('')
    d = n;
    this.LeadForm.controls.dealvalue.setValue(d);

    if (this.LeadForm.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;
    }
    this.data = this.userservice.getData();

    debugger;
    this.LeadForm.value['addcompanyandindidual'].push(this.getaddressdata());

    this.LeadForm.controls.subsourceid.setValue(this.ChaildId);
    this.LeadForm.controls.sourceid.setValue(this.parentId);
    let add = JSON.stringify(this.LeadForm.value)


    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };

    //debugger;
    if (confirm("Are you sure to Save")) {
      this.http.post(environment.apiURL + '/LeadEntrySave', add, options).subscribe(json => {

        //debugger;

        //alert("Saved Successfully !");
        this.toastr.success("Well done! New lead has been saved");
        this.text = '+91';
        this.textdata = '';
        //this.router.navigateByUrl("/funnel");
        this.LeadForm.reset();
        this.LeadForm.controls.countrycode.setValue('+91');
        this.LeadForm.controls.title.setValue('');
        this.LeadForm.controls.dealid.setValue('');
        $('input[name="exampleRadios"]').prop('checked', false);
        $('input[name="exampleRadios"]').prop('checked', false);
        $('input[name="newsourcesubsource"]').val("");
        this.LeadForm.setControl('MobileNosAlt', new FormArray([]));
        //this.LeadForm.setControl('addcompanyandindidual', new FormArray([]));

        this.LeadForm.value['addcompanyandindidual'].push('this.getaddressdata()');
        this.myChild.clear();

        //this.MobileNosAlt.setValue([]);
        //this.con
        //this.MobileNosAlt.controls.
        //this.LeadForm[this.MobileNosAlt].controls[countr].setValue('name')
        //this.MobileNosAlt.removeAt(0)
        //this.LeadForm.controls.subsourceid.setValue('');
        // this.LeadForm.controls.sourceid.setValue('');


        //this.LeadForm.
        //this.LeadForm.controls.countryduplicate.setValue('');
        this.ChaildId = "";
        this.parentId = "";
      });
    }
  }

  UpdateDeals() {
    debugger;
    this.leadservice.getDealList().then(res => {
      this.dealids = res as string

      this.dealids = JSON.parse(this.dealids);
      this.dealids = this.dealids.deals;
      this.data = this.userservice.getDataBusiness();
      //let _business = this.userservice.getDataBusiness();
      //this.LeadForm.controls.dealid.setValue(this.data);
      for (var i = 0; i <= this.dealids.length; i++) {
        if (this.dealids[i].dealname == this.data) {
          this.LeadForm.controls.dealid.setValue(this.dealids[i].dealid);
          this.LeadForm.controls.dealvalue.setValue(this.dealids[i].dealvalue);
          this.data = this.dealids[i].dealname;
          break;
        }
      }
      //this.LeadForm.controls.dealids.setValue('103');
    });
  }
  trackByFn(index, item) {

    return index; // or item.id
  }
  UpdateofInviteTeam() {

    this.http.get(environment.apiURL + '/GetManagersAndExecutivesSql').subscribe(json => {
      this.EmployeeData = json;
      console.log(json)
      this.EmployeeData = JSON.parse(this.EmployeeData);
    });

  }

  selectdrop(args) {
    debugger;

    //this.text = this.LeadForm.controls.country.value;
    this.text = args.target.value;
    let m1=args.target.options[args.target.selectedIndex].text
    let coun=m1.split(' -')[0]
    //this.countryname = args.target.value; 
    //this.countryname = args.target.options[args.target.selectedIndex].text; 
    this.LeadForm.controls.country.setValue(coun)
    this.LeadForm.controls.contactno.setValue('');

  }
  // selectbussiness(args) {
  //   debugger;

  //   this.dealdata = this.LeadForm.controls.dealid.value;
  //   // this.dealids ;
  //   if (this.dealdata == "") {
  //     this.LeadForm.controls.dealvalue.setValue('');
  //   }
  //   else {
  //     for (var i = 0; i <= this.dealids.length; i++) {
  //       if (this.dealids[i].dealid == this.dealdata) {
  //         this.LeadForm.controls.dealvalue.setValue(this.dealids[i].dealvalue);
  //         break;
  //       }
  //     }
  //   }
  //   //this.LeadForm.controls.dealvalue.setValue(this.LeadForm.controls.dealname.value)
  // }
  selectbussiness(args) {
    debugger;
    this.dealdata = this.LeadForm.controls.dealid.value;   
    if (this.dealdata == "") {
      this.LeadForm.controls.dealvalue.setValue('');
    }
    else {
      for (var i = 0; i <= this.dealids.length; i++) {
        if (this.dealids[i].dealid == this.dealdata) {
         
          //dir
          this.data=this.cookieservice.get("savedformat")
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
          this.LeadForm.controls.dealvalue.setValue(output); 
        }
        else{
          var result = this.dealids[i].dealvalue.toString().split('.');
          var lastThree = result[0].substring(result[0].length - 3);
          var otherNumbers = result[0].substring(0, result[0].length - 3);
          if (otherNumbers != '')
            lastThree = ',' + lastThree;
          var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
          if (result.length > 1) {
            output += "." + result[1];
          }        
          this.LeadForm.controls.dealvalue.setValue(output);
        }        
          break;
          //
        }
      }
    }
    //this.LeadForm.controls.dealvalue.setValue(this.LeadForm.controls.dealname.value)
  }


  select(args) {
    debugger;

    //this.textdata = this.LeadForm.controls.MobileNosAlt["controls"][0].value.countryduplicate;
    let m=args.target.options[args.target.selectedIndex].text
    let cou=m.split(' -')[0]
    this.textdata = args.target.value;
    this.LeadForm['controls']['MobileNosAlt']['controls'][0]['controls']['altcountry'].setValue(cou)
    //this.LeadForm.controls['altmobileno']['controls'][0].altcountry.setValue(args.target.options[args.target.selectedIndex].text)
    //this.LeadForm.controls.altmobileno['controls'][0].altcountry.setValue(args.target.options[args.target.selectedIndex].text)
    //this.LeadForm
    this.LeadForm['controls']['MobileNosAlt']['controls'][0]['controls']['altmobileno'].setValue('');
  }
}
