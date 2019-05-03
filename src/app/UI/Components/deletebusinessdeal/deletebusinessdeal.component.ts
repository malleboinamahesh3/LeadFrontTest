import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { EditBusinessDealService } from "../../../Services/edit-business-deal.service";
import { UserserviceService } from 'src/app/Services/userservice.service';
import { LeadService } from 'src/app/Services/lead.service';

declare let $: any;
@Component({
  selector: 'app-deletebusinessdeal',
  templateUrl: './deletebusinessdeal.component.html',
  styleUrls: ['./deletebusinessdeal.component.css']
})
export class DeletebusinessdealComponent implements OnInit {
  deleteform: FormGroup;
  dealpopupdata: any;
  dealdata: any;
  dealname: any;
  dealvalue: any;
  dealid: any;
  dealids: any;


  constructor(private UserService: UserserviceService,private leadservice: LeadService, private formBuilder: FormBuilder, private editbussinessdealservice: EditBusinessDealService) { }

  ngOnInit() {
    debugger
    this.UserService.notifyObservabledeal$.subscribe((res) => {
      debugger
      //console.log(res);
      this.dealname = res.value.dealname;
      this.dealvalue = res.value.dealvalue;
      this.dealid = res.value.dealid;
      this.deleteform.controls.DealName.setValue(this.dealname);
      this.deleteform.controls.DealValue.setValue(this.dealvalue);
      this.deleteform.controls.Dealid.setValue(this.dealid);
    })
    this.leadservice.getDealList().then(res => {
      this.dealids = res as string
      debugger;
      this.dealids = JSON.parse(this.dealids);
      this.dealids = this.dealids.deals;
    });
    this.deleteform = this.formBuilder.group({
      DealName: [this.dealname],
      DealValue: [this.dealvalue],
      Dealid: [this.dealid],
      transferdealid: ['']
    })
  }

  onSubmit(){
    this.deleteform.reset();
  }
  get f() { return this.deleteform.controls; }

  Cancel(){
    this.deleteform.reset();
    $('#DeleteBusinessDeal').modal('hide');
  }
}
