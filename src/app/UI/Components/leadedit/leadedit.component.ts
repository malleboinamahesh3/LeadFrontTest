import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FreshbusinessComponent } from '../freshbusiness/freshbusiness.component';

import { UserserviceService } from 'src/app/Services/userservice.service';
import { FollowupComponent } from '../followup/followup.component';



declare let $: any;


@Component({
  selector: 'app-leadedit',
  templateUrl: './leadedit.component.html',
  styleUrls: ['./leadedit.component.css']
})
export class LeadeditComponent implements OnInit {


  stagename: any;
  @Output() valueChange = new EventEmitter();
  @Output() refreshfunnel = new EventEmitter();
  constructor(private UserService: UserserviceService) { }

  @ViewChild(FreshbusinessComponent) frechbusinesscomp;
  @ViewChild(FollowupComponent) follwupcomp;


  ngOnInit() {

    this.UserService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'call_child') {      
        // this.leadid= res.value.leadid
        this.stagename = res.value.clientstagename;
      }
    });

  }

  RefreshFunnelAfterLeadModify(event) {
   debugger;
    this.refreshfunnel.emit();
  }
  displayCounter(count) {
    debugger;
    this.valueChange.emit();
    this.frechbusinesscomp.Closemodel();
  }


  Closepopup() {

   
    this.frechbusinesscomp.Closemodel();

  }

}
