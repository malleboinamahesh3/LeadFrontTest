import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AddsubsourceService } from "../../../Services/addsubsource.service";
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { Leadsourcemodel } from "../../../Models/leadsource-model";
import { AddnewchanelpartnerService } from "../../../Services/addnewchanelpartner.service";
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ChanelpartnerComponent } from '../chanelpartner/chanelpartner.component';
import { isNullOrUndefined, isUndefined, isBoolean } from 'util';
import { Options } from 'selenium-webdriver/safari';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { UserserviceService } from 'src/app/Services/userservice.service';


declare var $: any;

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css'],
  outputs: ['ChildEvent']
})
export class SourceComponent implements OnInit {

  private addsubsourceSubscribe: any;

  private result: any;
  private AddnewchanelpartnerSubscribe: any;
  private databody: any;
  sourcejson: any;
  subsource = [];
  source = [];
  _Source
  newsubsourceresult: string;
  M: any;
  subsourcename
  parentsourceid
  newsubsourcedata = [];


  sourceId: any;
  SourceAndSubSource
  @Output() OutputToparent = new EventEmitter<String>();

  constructor(private UserService: UserserviceService, private http: HttpClient, private _addsubsourceservice: AddsubsourceService, private _newchanelpartnerservice: AddnewchanelpartnerService, private toastr: ToastrService) { }
  @ViewChild(ChanelpartnerComponent) myChild;
  addsubsource: string = '';
  sourcesubsource: any;
  sourcesubsourceId: any;
  SourceAndSubSourceNew: any;
  SourceId: any;
  sourcename: string;
  EmployeeData = [];
  isStatus: boolean;
  isSaved: boolean;
  Tabinbex: any;
  sourcedata: any;
  check: any;
  Data: any;
  SelectingOtherSubSource: any;

  ngOnInit() {


    this.UserService.notifyObservablenew$.subscribe((res) => {
      ////debugger;

      

      let newdata = res.value;
      let sourcename=newdata.sourcename;
      let ParenrtSourcename=newdata.parentsourcename;
      this.parentsourceid=newdata.parentsourceid;
      let str = newdata.parentsourcename.replace(/\s/g, '');

      if (this.SelectingOtherSubSource !== undefined) {
        let otherSourceclicked = this.SelectingOtherSubSource
        let jj = otherSourceclicked[0].subsource.filter(function (clientstagename) {
          return clientstagename.status == true;
        });
        sourcename=jj[0].subsourcename;
        str=otherSourceclicked[0].source.replace(/\s/g, '');
        //newdata.sourcename = jj[0].subsourcename;
        //newdata.parentsourcename = otherSourceclicked[0].source;
      }

     

      if (ParenrtSourcename!= "Channel Partner") {
        this.UserService.notifyOthernewChannelClear({ option: 'call_child' });

        $('.nav-pills a[href="#' + str + '"]').tab('show');
        for (let i = 0; i < this.SourceAndSubSourceNew.length; i++) {
          let lr = this.SourceAndSubSourceNew[i]["subsource"];
          for (let j = 0; j < lr.length; j++) {
            if (lr[j].subsourcename == sourcename) {
              lr[j].status = true;
              this.Tabinbex=i;
            }
            else {
              lr[j].status = false;
            }
          }
          if (lr === undefined)
            this.SourceAndSubSourceNew[i]["subsource"] = [];
        }
      }
      else {

        $('.nav-pills a[href="#v-pills-home"]').tab('show');
        this.UserService.notifyOthernewChannel({ option: 'call_child', value: newdata });

      }

    });

    this.http.get(environment.apiURL + '/GetSources').subscribe(json => {
      this.sourcejson = json as string

      this.sourcejson = eval("(" + this.sourcejson + ')');

      this.SourceAndSubSource = this.sourcejson;
      this.SourceAndSubSource.Sources.shift();
      this.SourceAndSubSource = this.SourceAndSubSource.Sources;
      this.SourceAndSubSourceNew = this.SourceAndSubSource
      var i;
      // ////debugger;
      for (i = 0; i < this.SourceAndSubSourceNew.length; i++) {

        let lr = this.SourceAndSubSourceNew[i]["subsource"]


        if (lr === undefined)
          this.SourceAndSubSourceNew[i]["subsource"] = []

      }

      this.isStatus = true;
    });

    this.UserService.notifyObservablenewSourtceClear$.subscribe((res) => {
      ////debugger;

      for (let i = 0; i < this.SourceAndSubSourceNew.length; i++) {
        let lr = this.SourceAndSubSourceNew[i]["subsource"];
        for (let j = 0; j < lr.length; j++) {

          lr[j].status = false;

        }

      }

    });

    this.UserService.notifyObservablenewUpdateSbusource$.subscribe((res) => {
      ////debugger;
      this.SelectingOtherSubSource = undefined;
      let newdata = res.value;;

      let str = newdata.parentsourcename.replace(/\s/g, '');

      if (newdata.parentsourcename != "Channel Partner") {

        for (let i = 0; i < this.SourceAndSubSourceNew.length; i++) {
          let lr = this.SourceAndSubSourceNew[i]["subsource"];
          for (let j = 0; j < lr.length; j++) {
            if (lr[j].subsourcename == newdata.sourcename) {
              lr[j].status = true;
              this.Tabinbex=i;
            }
            else {
              lr[j].status = false;
            }
          }
          if (lr === undefined)
            this.SourceAndSubSourceNew[i]["subsource"] = [];
        }
      }
      else {


        this.UserService.notifyOthernewChannelupdatesubsource({ option: 'call_child', value: newdata });

      }

    });
  }

  selected(i, Tabinbex) {
    ////debugger;


    // this.M=i.subsource.length;

    // for(var l =0;this.M>=l;l++ ){
    //   this.subsource = i.subsource[l].;
    // }





    this.Tabinbex = Tabinbex;
    this.addsubsource = '';
    this.source = i.source;    //storing the source   
    this.subsource = i.subsource  //storing the subsources     
    this.parentsourceid = i.id;


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
  statusChange(da, j) {
    ////debugger;

    for (var s = 0; s < this.SourceAndSubSourceNew.length; s++) {
      for (var ss = 0; ss < this.SourceAndSubSourceNew[s].subsource.length; ss++) {
        this.SourceAndSubSourceNew[s].subsource[ss].status = false;
      }
    }
    if (this.subsource.length == 0) {

      this.subsource = da.subsource;
    }
    for (var k = 0; k < this.subsource.length; k++) {
      if (j == k) {
        this.subsource[k].status = true

        // this.sourcesubsource= this.source+" ( "+  this.subsource[k].subsourcename  +" )";
        this.sourcesubsource = this.subsource[k].subsourcename;
        this.sourcesubsourceId = this.subsource[k].sourceid;
        this.SourceId = this.parentsourceid;
        this.OutputToparent.emit(this.sourcesubsource + "-C" + this.sourcesubsourceId + "-P" + this.SourceId);


      } else {
        this.subsource[k].status = false
      }
    }
    ////debugger;
    this.SelectingOtherSubSource = this.SourceAndSubSourceNew.filter(function (clientstagename) {
      return clientstagename.id == da.id;
    });
    $('#leadSource').modal('hide');
    this.subsource = [];
  }

  receiveMsgfromchanelpartner($event) {
    this.sourcesubsource = $event;
    this.OutputToparent.emit(this.sourcesubsource);
  }
  //Add subsource metho =>used to add the subsource
  Addsubsourcesave(name: any, status: boolean): any {
    ////debugger;
    this.subsourcename = name.name;
    if (name.name == "") {

      //alert("empty field not inserted...")
      this.toastr.info("empty field not inserted...");
    }
    else {
      ////debugger;
      // if (this.subsource == undefined) {

      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });
      let HttpParams = { 'sourcename': name.name, 'parentsourceid': this.parentsourceid }
      let options = {
        headers: httpHeaders,
        params: HttpParams
      };

      this._Source = { "subsourcename": name.name, "parentsourceid": this.parentsourceid }
      this.http.get(environment.apiURL + '/CheckSourceNameexist', options).subscribe(json => {
        this.sourcedata = json
        ////debugger;
        this.check = this.sourcedata as string


        if (this.check == 0) {
          this.http.post(environment.apiURL + '/InsertSubsource', this._Source, options).subscribe(json => {
            this.newsubsourceresult = json as string
            ////debugger;
            var jjj = this.newsubsourceresult.split("&")[0]
            this.newsubsourceresult = JSON.parse(jjj)
            // this.SourceAndSubSourceNew[this.Tabinbex]["subsource"]={"subsourcename":"","sourceid":"" };
            // this.SourceAndSubSourceNew[this.Tabinbex].subsource.subsourcename= this.newsubsourceresult[0]["sourcename"]
            // this.SourceAndSubSourceNew[this.Tabinbex].subsource.sourceid= this.newsubsourceresult[0]["sourceid"] 
            // this.SourceAndSubSourceNew=this.SourceAndSubSourceNew;
            this.SourceAndSubSourceNew[this.Tabinbex].subsource.push({ "subsourcename": this.newsubsourceresult[0]["sourcename"], "sourceid": this.newsubsourceresult[0]["sourceid"] })
            this.addsubsource = '';



          });
        }
        if (this.check != 0) {
          this.toastr.info("You can't insert same Subsource Name again..!");
          this.addsubsource = '';
        }

      });


      // }
      // else {

      // for (var k = 0; k < this.subsource.length; k++) {

      //   if (name.name == this.subsource[k].subsourcename) {

      //     //alert("you can't insert same subsource name again...")
      //     //this.toastr.warning("You can't insert same Subsource Name again..!");
      //     this.isStatus = false;
      //     this.addsubsource = '';
      //     break;
      //   } else {
      //     this.isStatus = true;
      //   }
      // }
      // }

      //if (this.isStatus == true) {

      // let httpHeaders = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Cache-Control': 'no-cache'
      // });
      // let options = {
      //   headers: httpHeaders
      // };
      // // this.newsubsourcedata.push({"subsourcename":name.name,"parentsourceid":this.parentsourceid})
      // this._Source = { "subsourcename": name.name, "parentsourceid": this.parentsourceid }
      // ////debugger;

      // if(this.isStatus == true){
      //   this.http.post(environment.apiURL + '/InsertSubsource', this._Source, options).subscribe(json => {
      //     this.newsubsourceresult = json as string
      //     ////debugger;

      //     var jjj = this.newsubsourceresult.split("&")[0]
      //     this.newsubsourceresult = JSON.parse(jjj)
      //     this.SourceAndSubSourceNew[this.Tabinbex].subsource.push({ "subsourcename": this.newsubsourceresult[0]["sourcename"], "sourceid": this.newsubsourceresult[0]["sourceid"] })
      //     this.addsubsource = '';
      //   });
      //}


      //}
    }
  }


  //add new chanel partner method 
  Addnewchanelpartner(chanelptnr?: NgForm) {
    ////debugger;
    console.log(chanelptnr.value);

    // this.databody=chanelptnr.value
    this.AddnewchanelpartnerSubscribe = this._newchanelpartnerservice.addnewChanelpartner(chanelptnr.value).subscribe(
      (res): any => {
        this.result = res;
      },
      (err: HttpErrorResponse): any => {
        if (err.error instanceof Error) {
          console.log("client side error");
        }
        else {
          console.log("server side error");
        }
      });

  };

  close() {
    ////debugger;
    this.myChild.clear();
    $('#leadSource').modal('hide');
 
    this.subsource = [];
  }


}



