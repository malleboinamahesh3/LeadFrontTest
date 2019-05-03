import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';

declare let $: any;

@Component({
  selector: 'app-whocan',
  templateUrl: './whocan.component.html',
  styleUrls: ['./whocan.component.css']
})
export class WhocanComponent implements OnInit {

  WhoCanDoForm: FormGroup
  EmployeeData: any;
  MDEXids: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.WhoCanDoForm = this.formBuilder.group({
      //currencycode: [''],
      assignto: ['']
    })

    this.http.get(environment.apiURL + '/GetManagersAndExecutivesSql').subscribe(json => {
      this.EmployeeData = json;
      debugger
      console.log(json)
      this.EmployeeData = JSON.parse(this.EmployeeData);

    });

  }


  GetManagerAndExecutiveId(ExeId: string) {
    debugger;
    let kk = ExeId["ExecutiveID"]
    if (kk === undefined) {

      if (this.MDEXids == undefined) {
        this.MDEXids = ExeId["ManagerID"]
      }
      else{
        this.MDEXids += ',' + ExeId["ManagerID"]
      }
      // this.WhoCanDoForm.controls.assignto.setValue(ExeId["ManagerID"])

    }
    else {
      if (this.MDEXids == undefined) {
        this.MDEXids =  ExeId["ExecutiveID"]
      }
      else{
        this.MDEXids += ',' + ExeId["ExecutiveID"]
      }
      // this.WhoCanDoForm.controls.assignto.setValue(ExeId["ExecutiveID"])

    }

    this.WhoCanDoForm.controls.assignto.setValue(this.MDEXids)
  }

  SaveData() {
    debugger;
    let ids=this.MDEXids
    // this.WhoCanDoForm.reset();
    this.MDEXids=undefined
    $('input[name="exampleRadios"]').prop('checked', false);
    $('#WhoCan').modal('hide');
  }
  closemd() {
    debugger;
    $('#WhoCan').modal('hide');
    //this.WhoCanDoForm.reset();
    $('input[name="exampleRadios"]').prop('checked', false);
  }


}
