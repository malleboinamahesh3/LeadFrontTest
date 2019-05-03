import { Component, OnInit, Input } from '@angular/core';
import { Subject } from "rxjs";
import { UserserviceService } from 'src/app/Services/userservice.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {NgxPrintModule, NgxPrintDirective} from  'ngx-print';

@Component({
  selector: 'app-followuphistory',
  templateUrl: './followuphistory.component.html',
  styleUrls: ['./followuphistory.component.css']
})
export class FollowuphistoryComponent implements OnInit {

  @Input()
  getleadid: Subject<any>

  leadid: any;
  FollowHistory: any;
  constructor(private http: HttpClient, private UserService: UserserviceService, ) { }

  ngOnInit() {
debugger;
    this.leadid = this.UserService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'call_child') {
 
        //console.log(res.value);
        // let   res.value.leadno
        // perform your other action from here


        let httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        });

        let HttpParams = { 'leadid': res.value.leadid }
        let options = {
          headers: httpHeaders,
          params: HttpParams
        };
        //let dealname = {'dealname':this.dealname}

        this.http.get(environment.apiURL + '/GetFollowuphistory', options).subscribe(json => {
       debugger;
          this.FollowHistory = json as string
          if (this.FollowHistory != "") {
            this.FollowHistory = JSON.parse(this.FollowHistory);
          }
          else{

            this.FollowHistory=[];
            
          }
         
        })


      }
    });

  }
  ngOnDestroy() {
      this.leadid.unsubscribe();
  }
}
