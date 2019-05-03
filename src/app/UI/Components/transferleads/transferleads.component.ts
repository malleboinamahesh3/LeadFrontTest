import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserserviceService } from 'src/app/Services/userservice.service';
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
//import { DataTableDirective } from 'angular-datatables';

declare let $: any;
@Component({
  selector: 'app-transferleads',
  templateUrl: './transferleads.component.html',
  styleUrls: ['./transferleads.component.css']
})
export class TransferleadsComponent implements OnInit {
  employeeid: any;
  Leadsdata: any;
  LeadsdataAll: any;
  DatatableInIt: any;
  TableColumnsDynamic: any;
  //FreshLeads: any;

  constructor(private UserService: UserserviceService, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.TableColumnsDynamic = [
      {
        "data": null, "sortable": false,

      },
      // {
      //   "title": "S.No.", "data": null,
      //   render: function (data, type, row, meta) {
      //     return meta.row + meta.settings._iDisplayStart + 1;
      //   }
      // },
      { "title": "Lead name", "data": "fullname"},
      { "title": "Business deal", "data": "dealname"},
      { "title": "Deal value", "data": "dealvalue"},
      { "title": "Status", "data": "clientstagename"}
    ]
    this.UserService.notifyObservablenTransferteam$.subscribe((res) => {
      debugger
      console.log(res);
      this.employeeid = res.value.employeeid;
      this.http.get(environment.apiURL + '/GetAllLeads').subscribe(json => {
        debugger;
        this.Leadsdata = json;
        //this.freshcount = this.FreshLeads.length;
        this.LeadsdataAll = JSON.parse(this.Leadsdata);
        this.GetLeadsemployeeWise(this.LeadsdataAll, this.employeeid);
        if (this.DatatableInIt != null) {
          this.DatatableInIt.destroy();
        }
        this.DatatableInIt = $('#employeedata').DataTable({
          language: { searchPlaceholder: "Search records", search: "" },
          "bDestroy": true,
          'columnDefs': [
            {
              'targets': 0,
              'checkboxes': {
                'selectRow': true
              }
            }
          ],
          "processing": true,
          // if(this.Leadsdata.length > 0){

          // }
          "bPaginate": false,
          "bInfo": false,
          "bFilter": true,
           //"Sort":false,
           //"bSort": false,
          'select': {
          'style': 'multi',
    
          },
          responsive: true,
          data: this.Leadsdata,
          dom: 'Bfrtip',
          columns: this.TableColumnsDynamic,
          initComplete: function () {
           var $buttons = $('.dt-buttons').hide();

          }
        });


      });

      
    });
  }

  GetLeadsemployeeWise(Leds: any, employeeid: string) {
    debugger
    this.Leadsdata = Leds.filter(function (assignto) {
      return assignto.assignto == employeeid;
    });
  }
}
