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
  selector: 'app-chanelpartner',
  templateUrl: './chanelpartner.component.html',
  styleUrls: ['./chanelpartner.component.css']
})
export class ChanelpartnerComponent implements OnInit {

  _ChanelPartner
  _Source
  Chanelpartnerresult
  text: any;
  submitted = false;
  Chanelpartnerjson
  public AddnewchanelpartnerSubscribe: any;
  public result: any;
  userForm: FormGroup;
  firstdata: string;
  countrys: any;
  public SubSourcename: string;
  subsource = [];
  source = [];
  addsubsource: string = '';
  ParentID: any;
  sourcesubsourceId: any;
  sourcesubsource: string;
  sourcename: string;
  SourceAndSubSource
  ChanelpartnerBodyData
  channeldata: any;
  ChannelListShow: boolean;
  ChannelListhide: boolean;
  Data: any;
  CountryList: any;
  newChannelparnerClicked: any;
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  //@Output() OutputToparent=new EventEmitter<String>();
  @Output() OutputToparentfromchanelpartner = new EventEmitter<String>();

  constructor(private UserService: UserserviceService, private fb: FormBuilder, private _newchanelpartnerservice: AddnewchanelpartnerService, private http: HttpClient, private toastr: ToastrService, private countiresService: CountriesService) {

    this.userForm = this.fb.group({
      referalname: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(100)]],
      countrycode: ['+91',Validators.required],
      country:['India'],
      referalcontactno: ['', [Validators.required, MobileNovalidator]],
      referalemail: ['', [Validators.required, Validators.email,,Validators.maxLength(50)]],
      address: ['', [Validators.minLength(2), Validators.required,Validators.maxLength(250)]],
      // BankAccounttype: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      // bankaccountname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      // bankaccountno: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      // bankIFSCCode: ['', [Validators.required, IFSCcodevalidator]]
      BankAccounttype: [''],
      bankaccountname: [''],
      bankaccountno: [''],
      bankIFSCCode: ['']
    });
    this.text = '+91';
  }
  trackByFn(index, item) {

    return index; // or item.id
  }
  RefreshData() {

  }


  ngOnInit() {

    ////debugger

    this.UserService.notifyObservablenewChannel$.subscribe((res) => {
      ////debugger;

      this.UserService.notifyOthernewSourceClear({ option: 'call_child' });

      let Data = res.value;

      let sourceid =Data.sourceid;
      let kk = this.newChannelparnerClicked;
      if (kk !== undefined) {


        //Data["sourceid"] = kk[0].referalid
        sourceid = kk[0].referalid
      }


      for (let index = 0; index < this.Chanelpartnerjson.length; index++) {

        if (this.Chanelpartnerjson[index].referalid == sourceid) {

          this.Chanelpartnerjson[index]["status"] = true;
        }
        else {
          this.Chanelpartnerjson[index]["status"] = false;
        }

      }

    });

    this.UserService.notifyObservablenewChannelUpdateSbusource$.subscribe((res) => {
      ////debugger;


      this.newChannelparnerClicked=undefined;

      this.Data = res.value;



      for (let index = 0; index < this.Chanelpartnerjson.length; index++) {

        if (this.Chanelpartnerjson[index].referalid == this.Data.sourceid) {

          this.Chanelpartnerjson[index]["status"] = true;
        }
        else {
          this.Chanelpartnerjson[index]["status"] = false;
        }

      }

    });

    this.UserService.notifyObservablenewChannelClear$.subscribe((res) => {
      ////debugger;


      for (let index = 0; index < this.Chanelpartnerjson.length; index++) {
        this.Chanelpartnerjson[index]["status"] = false;
      }

      this.newChannelparnerClicked=undefined;

    });
    this.Chanelpartnerjson = [];

    $("#chnptnrfullname").keypress(function (e) {

      $("#error_sp_msg").remove();
      var k = e.keyCode,
        $return = ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
      if (!$return) {
        $("<span/>", {
          "id": "error_sp_msg",
          "html": "Special characters not allowed !!!!!"
        }).insertAfter($(this));
        return false;
      }
    })

    $("#bankIFSCCode").keypress(function (e) {

      $("#error_sp_msg").remove();
      var k = e.keyCode,
        $return = ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
      if (!$return) {
        $("<span/>", {
          "id": "error_sp_msg",
          "html": "Special characters not allowed !!!!!"
        }).insertAfter($(this));
        return false;
      }
    })





    this.ChannelListShow = false;
    this.ChannelListhide = true;

    this.http.get(environment.apiURL + '/GetChannelpartners').subscribe(json => {
      ////debugger;
      this.Chanelpartnerjson = json as string //return
      if (this.Chanelpartnerjson == "") { this.Chanelpartnerjson = []; }

      this.Chanelpartnerjson = JSON.parse(this.Chanelpartnerjson)


      this.Chanelpartnerjson = this.Chanelpartnerjson.CP;

      this.SourceAndSubSource = this.Chanelpartnerjson;


    });

    this.CountryList = this.countiresService.getData();

  }



  statusChangedforreferral(r) {
    ////debugger;
    this.subsource = this.SourceAndSubSource;
    for (var l = 0; l < this.SourceAndSubSource.length; l++) {
      if (r == l) {
        this.subsource[l].status = true
        //this.sourcesubsource= this.SourceAndSubSource[0].source+" ( "+  this.subsource[l].subsourcename  +" )"; 
        this.sourcesubsource = this.subsource[l].referalname;
        this.sourcesubsourceId = this.subsource[l].referalid;
        this.ParentID = this.subsource[l].parentsourceid;
        this.OutputToparentfromchanelpartner.emit(this.sourcesubsource + "-C" + this.sourcesubsourceId + "-P" + this.ParentID);


      }
      else {
        this.subsource[l].status = false
      }
    }
    let jj = this.subsource.filter(function (clientstagename) {
      return clientstagename.status == true;
    });
    this.newChannelparnerClicked = jj;
    $('#leadSource').modal('hide');
  }

  selectdrop(args) {

    //this.text = this.userForm.controls.country.value;
    this.text = args.target.value;
  
    let m1=args.target.options[args.target.selectedIndex].text
    let coun=m1.split(' -')[0]
    //this.countryname = args.target.value; 
    //this.countryname = args.target.options[args.target.selectedIndex].text; 
    this.userForm.controls.country.setValue(coun)
   // this.userForm.controls.country.setValue(args.target.options[args.target.selectedIndex].text);
    this.userForm.controls.referalcontactno.setValue('');
  }

  ChannelPartnerHideandShowList(checked: string) {

    if (checked == "Channel") {

      this.ChannelListShow = false;
      this.ChannelListhide = true;
    }
    else {
      this.ChannelListShow = true;
      this.ChannelListhide = false;

    }


    this.userForm.reset();
    this.userForm.controls.countrycode.setValue('+91');
    this.userForm.controls.BankAccounttype.setValue('');
    this.text = '+91';
  }

  onSubmit() {
    debugger

    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      this.toastr.warning("Please fill all the required mandatory fields..!");
      return;

    }
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    //this.channeldata = this.userForm.controls.referalname.value;
    let Source = JSON.stringify(this.userForm.value);

    let HttpParams = { 'sourcename': this.userForm.controls.referalname.value }
    let options = {

      headers: httpHeaders,
      params: HttpParams
    };
    //let dealname = {'dealname':this.dealname}

    this.http.get(environment.apiURL + '/CheckCPSourceNameexist', options).subscribe(json => {
      this.channeldata = json

      this.result = this.channeldata as string
      if (this.result == 0) {
        if (confirm("Are you sure, do you want to Save ?")) {

          let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          });
          let options = {
            headers: httpHeaders
          };
          this.http.post(environment.apiURL + '/InsertChannelPartner', Source, options).subscribe(json => {
            this.Chanelpartnerresult = json as string

            debugger;


            var jjj = this.Chanelpartnerresult.split("&")[0]
            this.Chanelpartnerresult = JSON.parse(jjj)

            this.Chanelpartnerjson.push({ "parentsourceid": this.Chanelpartnerresult[0]["parentsourceid"], "referalname": this.Chanelpartnerresult[0]["referalname"], "referalid": this.Chanelpartnerresult[0]["referalid"] })

            //this.SourceAndSubSourceNew[this.Tabinbex].subsource.push({ "subsourcename": this.newsubsourceresult[0]["sourcename"], "sourceid": this.newsubsourceresult[0]["sourceid"] })


            // this.Chanelpartnerresult = JSON.parse(this.Chanelpartnerresult)
            this.toastr.success("Well done! New channel partner has been saved ")
            this.ChannelListShow = false;
            this.ChannelListhide = true;
            this.userForm.reset();
            this.userForm.controls.countrycode.setValue('');
            this.userForm.controls.BankAccounttype.setValue('');
            this.text = '';
          });
        }
      }
      if (this.result != 0) {
        this.toastr.info("Channel name already exists..!");
      }
    });

    // let options = {
    //   headers: httpHeaders
    // };


  };

  clear() {
    ////debugger;
    this.ChannelListShow = false;
    this.ChannelListhide = true;
    this.userForm.reset();
    this.userForm.controls.countrycode.setValue('');
    this.userForm.controls.BankAccounttype.setValue('');
    //this.newChannelparnerClicked = undefined;
  }

}