import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { GroupByPipe } from './Custom.pipes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDate, DatePipe } from '@angular/common';
import 'rxjs/add/observable/timer';
import 'rxjs/Observable';
import { FunnelpopupdataService } from "../../../Services/funnelpopup.service";
import { FreshbusinessComponent } from "../../Components/freshbusiness/freshbusiness.component";
import { Subject } from "rxjs";
import { UserserviceService } from 'src/app/Services/userservice.service';
import { text } from '@angular/core/src/render3/instructions';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


declare let $: any;

@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.css'],
  providers: [GroupByPipe]
})
export class FunnelComponent implements OnInit {
  subscribe
  totaldata = [];
  data
  subscription: Subscription;

  popupdataofFunnel: Subject<any> = new Subject();
  @ViewChild(FreshbusinessComponent) myChildmethod;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  constructor(private UserService: UserserviceService, private groupByPipe: GroupByPipe, private http: HttpClient, private _funnelpopupdataservice: FunnelpopupdataService) {
    this.dpConfig.containerClass = 'theme-dark-blue'; //or whatever color
  }
  people = [
    { name: 'Sue', age: 25 },
    { name: 'Joe', age: 30 },
    { name: 'Frank', age: 25 },
    { name: 'Sarah', age: 35 }
  ];
  DatatableInIt: any;
  CardViewshow: boolean;
  Tableviewshow: boolean;
  Tabindexcount = 0;
  countFresh = 0;
  hotcount = 0;
  FreshLeads: any;
  FreshLeadsAll: any;
  TableLeads: any;
  FreshLeadsByDate: any;
  FreshLeadsByWeek: any;
  FreshLeadsByMonth: any;
  NowDate: any;
  dataDate: any;
  today = new Date();
  freshcount: any;
  FreshLeadsRefresh: any;
  Dealstages: any;
  Newdata: any;
  clientstagename: any;
  table = null;
  CardShow: boolean;
  Cardhide: boolean;
  Showcards = -1;
  private timerSubscription
  newcount: any;
  setActivetab: any;
  Groupbytype: any;
  tableViewcolumsshowandhide: any;
  columnshideids: any = [];
  tabclicked: string
  TableColumnsDynamic: any;

  LoadCount: any = 0;

  divshow: any;
  divhide: any;
  FilterClicked: any;
  ngOnInit() {
    debugger;
    this.setActivetab = "Fresh";
    this.tabclicked = "Card";
    this.Groupbytype = "leaddate";
    this.FilterClicked = "By Date";
    this.tableViewcolumsshowandhide = [{ id: 2, name: "Added on", checked: true }, { id: 3, name: "Name", checked: true }, { id: 4, name: "Query", checked: true }, { id: 5, name: "Business Deal", checked: true }, { id: 6, name: "Source", checked: true }, { id: 7, name: "Sub Source", checked: true }, { id: 8, name: "Email", checked: true }]
    debugger;
    this.refreshData();
    this.CardShow = false;
    this.Cardhide = true;
    this.NowDate = Date.now();
    this.Newdata = [];

    this.FreshLeads = [];

    this.FreshLeadsByDate = [];
    this.Showcards = -1;

    this.newcount = 0;

  }

  GetLeadsSatgeWise(Leds: any, DealNamefind: string) {
    debugger
    this.FreshLeads = Leds.filter(function (clientstagename) {
      return clientstagename.clientstagename == DealNamefind;
    });
  }
  trackByFn(index, item) {
    return index; // or item.id
  }



  ActiveTab(Index) {

    if (Index == 0) {

      return "tab-pane fade show active"

    }
    else {

      return "tab-pane fade"

    }
  }
  AcivateNav(Index) {
    if (Index == 0) {

      return "nav-link active show"

    }
    else {
      return "nav-link"

    }

  }


  BindRelateddat(Index, Dealstagename) {
    debugger
    this.columnshideids = [];
    this.setActivetab = Dealstagename;
    // this.GetLeadsSatgeWise(this.FreshLeadsAll, Dealstagename);
    this.FilterClicked = "By Date";

    if (Index == 0) {
      this.TableColumnsDynamic = [
        {
          "data": null, "sortable": false,
        },
        {
          "title": "S.No.", "data": null,
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        },
        { "title": "Added on", "data": "leaddate", className: 'leaddate' },
        {
          "data": "namemobile", class: "phone", "title": "Name / Phone", "render": function (data, type, full) {
            return full['fullname'] + '<br />' + ' # ' + full[('mobileno')];
          }
        },
        { "title": "Query", "data": "query", className: 'query' },
        { "title": "Business Deal", "data": "dealname", className: 'dealname' },
        { "title": "Source", "data": "parentsourcename", className: 'parentsourcename' },
        { "title": "Sub Source", "data": "sourcename", className: 'sourcename' },
        { "title": "Email", "data": "email", className: 'email' }
      ]
      this.LoadCount = 0;
      this.LoadMore('2', this.setActivetab, false)
      //this.data = this.groupByPipe.transform(this.FreshLeads, "leaddate")
      this.tableViewcolumsshowandhide = [{ id: 2, name: "Added on", checked: true }, { id: 3, name: "Name", checked: true }, { id: 4, name: "Query", checked: true }, { id: 5, name: "Business Deal", checked: true }, { id: 6, name: "Source", checked: true }, { id: 7, name: "Sub Source", checked: true }, { id: 8, name: "Email", checked: true }]
    }
    else if (Dealstagename == "Sold") {
      this.TableColumnsDynamic = [
        {
          "data": null, "sortable": false,
        },
        {
          "title": "S.No.", "data": null,
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        },
        { "title": "Added on", "data": "leaddate", className: 'leaddate' },
        {
          "data": "namemobile", class: "phone", "title": "Name / Phone", "render": function (data, type, full) {
            return full['fullname'] + '<br />' + ' # ' + full[('mobileno')];
          }
        },
        { "title": "Query", "data": "query", className: 'query' },
        { "title": "Business Deal", "data": "dealname", className: 'dealname' },
        { "title": "Source", "data": "parentsourcename", className: 'parentsourcename' },
        { "title": "Sub Source", "data": "sourcename", className: 'sourcename' },
        { "title": "Email", "data": "email", className: 'email' },
        // {
        //   "title": "Next FollowUp", "data": "nextfollowupdate", "render": function (data) {
        //     var date = new Date(data);
        //     var month = date.getMonth() + 1;
        //     return (date.getDate()) + "/" + "0" + month + "/" + date.getFullYear();
        //   }
        // },
        { "title": "Deal Value", "data": "finaldealvalue", className: 'finaldealvalue' },
        { "title": "Received", "data": "received", className: 'received' },
        { "title": "Receivable", "data": "receivable", className: 'receivable' },
      ]
      this.tableViewcolumsshowandhide = [{ id: 2, name: "Added on", checked: true }, { id: 3, name: "Name", checked: true }, { id: 4, name: "Query", checked: true }, { id: 5, name: "Business Deal", checked: true }, { id: 6, name: "Source", checked: true }, { id: 7, name: "Sub Source", checked: true }, { id: 8, name: "Email", checked: true }, { id: 9, name: "Deal Value", checked: true }, { id: 10, name: "Received", checked: true }, { id: 11, name: "Receivable", checked: true }]
      //this.Newdata = this.groupByPipe.transform(this.FreshLeads, "leaddate")
      this.LoadCount = 0;
      this.LoadMore('2', this.setActivetab, false)
    }
    else if (Dealstagename == "Cancel") {
      this.TableColumnsDynamic = [
        {
          "data": null, "sortable": false,
        },
        {
          "title": "S.No.", "data": null,
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        },
        { "title": "Added on", "data": "leaddate", className: 'leaddate' },
        {
          "data": "namemobile", class: "phone", "title": "Name / Phone", "render": function (data, type, full) {
            return full['fullname'] + '<br />' + ' # ' + full[('mobileno')];
          }
        },
        { "title": "Query", "data": "query", className: 'query' },
        { "title": "Business Deal", "data": "dealname", className: 'dealname' },
        { "title": "Source", "data": "parentsourcename", className: 'parentsourcename' },
        { "title": "Sub Source", "data": "sourcename", className: 'sourcename' },
        { "title": "Email", "data": "email", className: 'email' },
        // {
        //   "title": "Next FollowUp Date", "data": "nextfollowupdate", "render": function (data) {
        //     var date = new Date(data);
        //     var month = date.getMonth() + 1;
        //     return (date.getDate()) + "/" + "0" + month + "/" + date.getFullYear();
        //   }
        // },
        // { "title": "Next FollowUp Time", "data": "nextfollowuptime", className: 'nextfollowuptime' },

        // { "title": "Deal Value", "data": "dealvalue", className: 'dealvalue' },
        // { "title": "Received", "data": "received", className: 'received' },
        // { "title": "Receivable", "data": "receivable", className: 'receivable' },

      ]
      // this.tableViewcolumsshowandhide = [{ id: 2, name: "Added on", checked: true }, { id: 3, name: "Name", checked: true }, { id: 4, name: "Query", checked: true }, { id: 5, name: "Business Deal", checked: true }, { id: 6, name: "Source", checked: true }, { id: 7, name: "Sub Source", checked: true }, { id: 8, name: "Email", checked: true }, { id: 9, name: "Next Followup", checked: true },{ id: 10, name: "Deal Value", checked: true }, { id: 11, name: "Received", checked: true }, { id: 12, name: "Receivable", checked: true }]
      this.tableViewcolumsshowandhide = [{ id: 2, name: "Added on", checked: true }, { id: 3, name: "Name", checked: true }, { id: 4, name: "Query", checked: true }, { id: 5, name: "Business Deal", checked: true }, { id: 6, name: "Source", checked: true }, { id: 7, name: "Sub Source", checked: true }, { id: 8, name: "Email", checked: true }]
      //this.Newdata = this.groupByPipe.transform(this.FreshLeads, "leaddate")
      this.LoadCount = 0;
      this.LoadMore('2', this.setActivetab, false)

    }
    else {

      this.TableColumnsDynamic = [
        {
          "data": null, "sortable": false,

        },
        {
          "title": "S.No.", "data": null,
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          }
        },




        { "title": "Added on", "data": "leaddate", className: 'leaddate' },

        {
          "data": "namemobile", class: "phone", "title": "Name / Phone", "render": function (data, type, full) {
            return full['fullname'] + '<br />' + ' # ' + full[('mobileno')];
          }
        },
        { "title": "Query", "data": "query", className: 'query' },
        { "title": "Business Deal", "data": "dealname", className: 'dealname' },
        { "title": "Source", "data": "parentsourcename", className: 'parentsourcename' },
        { "title": "Sub Source", "data": "sourcename", className: 'sourcename' },
        { "title": "Email", "data": "email", className: 'email' },
        {
          "title": "Next FollowUp Date", "data": "nextfollowupdate", "render": function (data) {
            var date = new Date(data);
            var month = date.getMonth() + 1;
            return (date.getDate()) + "/" + "0" + month + "/" + date.getFullYear();
          }

        },
        { "title": "Next FollowUp Time", "data": "nextfollowuptime", className: 'nextfollowuptime' },

        // { "title": "Deal Value", "data": "dealvalue", className: 'dealvalue' },
        // { "title": "Received", "data": "received", className: 'received' },
        // { "title": "Receivable", "data": "receivable", className: 'receivable' },

      ]
      // this.tableViewcolumsshowandhide = [{ id: 2, name: "Added on", checked: true }, { id: 3, name: "Name", checked: true }, { id: 4, name: "Query", checked: true }, { id: 5, name: "Business Deal", checked: true }, { id: 6, name: "Source", checked: true }, { id: 7, name: "Sub Source", checked: true }, { id: 8, name: "Email", checked: true }, { id: 9, name: "Next Followup", checked: true },{ id: 10, name: "Deal Value", checked: true }, { id: 11, name: "Received", checked: true }, { id: 12, name: "Receivable", checked: true }]
      this.tableViewcolumsshowandhide = [{ id: 2, name: "Added on", checked: true }, { id: 3, name: "Name", checked: true }, { id: 4, name: "Query", checked: true }, { id: 5, name: "Business Deal", checked: true }, { id: 6, name: "Source", checked: true }, { id: 7, name: "Sub Source", checked: true }, { id: 8, name: "Email", checked: true }, { id: 9, name: "Next Followup Date", checked: true }, { id: 10, name: "Next Followup Time", checked: true }]
      //this.Newdata = this.groupByPipe.transform(this.FreshLeads, "leaddate")
      this.LoadCount = 0;
      this.LoadMore('2', this.setActivetab, false)

    }
    this.CardShow = false;
    this.Cardhide = true;
    let tableneme = '#Employee' + Dealstagename + ''

    if (this.DatatableInIt != null) {
      this.DatatableInIt.destroy();
    }

    debugger;
    this.DatatableInIt = $(tableneme).DataTable({
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
      'select': {
        'style': 'multi',

      },
      responsive: true,
      data: this.FreshLeads,
      dom: 'Bfrtip',
      columns: this.TableColumnsDynamic,


      buttons: [
        {
          extend: 'copyHtml5',
          exportOptions: {
            columns: ':visible'
          }

        },

        {
          extend: 'excelHtml5',
          exportOptions: {
            columns: ':visible',
            modifier: {
              selected: null
            },
            rows: { selected: true }
          }

        },
        {
          extend: 'csvHtml5',
          exportOptions: {
            columns: ':visible',
            modifier: {
              selected: null
            },
            rows: { selected: true }
          }

        },
        {
          extend: 'pdfHtml5',
          exportOptions: {
            columns: ':visible',
            modifier: {
              selected: null
            },
            rows: { selected: true }
          }

        },
        {
          extend: 'print',
          exportOptions: {
            columns: ':visible',
            modifier: {
              selected: null
            },
            rows: { selected: true }
          }

        },
        {
          extend: 'selectAll',
          exportOptions: {
            columns: ':visible',
            modifier: {
              selected: null
            },

          }

        }, {
          extend: 'selectNone',
          exportOptions: {
            columns: ':visible',
            modifier: {
              selected: null
            },

          }

        }
      ],

      initComplete: function () {
        var $buttons = $('.dt-buttons').hide();

      }


    });
    this.tabclicked = "Card";
    this.FunnelHideandShow('Card')

    $('.nav-pills a[href="#funnel-card' + Dealstagename + '"]').addClass('active');
    $('.nav-pills a[href="#funnel-table' + Dealstagename + '"]').removeClass('active')
  }
  ActivateTabCard() {

    if (this.tabclicked == "Card") {
      return "tab-pane active"
    }
    else {

      return "tab-pane fade"
    }
  }
  ActivateTabTable(Table) {

    if (this.tabclicked == "Table") {

      return "tab-pane active"
    }
    else {

      return "tab-pane fade"
    }
  }
  ExportDataPrint(stagename) {
    debugger;
    var $buttons = $('.dt-buttons').hide();
    let buttonSelected = $('#exportLink' + stagename + '').val(); //this.ButtonSelected
    let btnClass = "";
    let btnClassnew = "";
    if (buttonSelected == "Export as XLS") { btnClass = ".buttons-excel" }
    if (buttonSelected == "Copy to clipboard") { btnClass = ".buttons-copyHtml5" }
    if (buttonSelected == "Export as CSV") { btnClass = ".buttons-csv" }
    if (buttonSelected == "Export as PDF") { btnClass = ".buttons-pdf" }
    if (buttonSelected == "Export as Print") { btnClass = ".buttons-print" }
    if (buttonSelected == "Export All") { btnClassnew = ".buttons-select-all"; $buttons.find(btnClassnew).click(); btnClass = ".buttons-pdf" }
    $buttons.find(btnClass).click();
    if (buttonSelected == "Export All") {
      $buttons.find(".buttons-select-none").click();
    }
    $('#exportLink').val('More');

  }
  openpopUp(popupdata: any, TabName) {
    debugger;
    if (TabName != "Sold" && TabName != "Cancel") {

      this.UserService.notifyOther({ option: 'call_child', value: popupdata });
      this._funnelpopupdataservice.setFunnelpopupdata(popupdata);
      this.popupdataofFunnel.next(popupdata);
      $('#FreshBusinessDeal').modal('show');
      // this.myChildmethod.refreshLeadEditdata();

    }
    if (TabName == "Sold") {

      this.UserService.notifyOther({ option: 'call_child', value: popupdata });
      this._funnelpopupdataservice.setFunnelpopupdata(popupdata);
      this.popupdataofFunnel.next(popupdata);
      $('#SoldBusinessDealHistory').modal('show');
    } 
    if (TabName == "Cancel") {
      this.UserService.notifyOther({ option: 'call_child', value: popupdata });
      this._funnelpopupdataservice.setFunnelpopupdata(popupdata);
      this.popupdataofFunnel.next(popupdata);
      $('#CancelledBusinessDeal').modal('show');
    }

  }


  GetData(groupbytype: string, Dealstagename: string, tabIndex, FilterChecked) {

    this.Groupbytype = groupbytype;
    this.FilterClicked = FilterChecked;
    // this.GetLeadsSatgeWise(this.FreshLeadsAll, Dealstagename);
    if (tabIndex == "0") {
      this.LoadCount = 0;
      this.LoadMore('2', this.setActivetab, false)
    }
    else {
      this.LoadCount = 0;
      this.LoadMore('2', this.setActivetab, false)

    }
  }

  GetFreshLedsDayAndWeekAndMomthWise(clientstagename) {
    debugger;
    this.FreshLeads = this.FreshLeads.filter(
      book => {

        let kk = book.leaddate.split("-");
        let converteddate = kk[0] + "-" + kk[1] + "-" + kk[2]
        let dataDate = new DatePipe("en-IN").transform(new Date(converteddate), 'yyyy-MM-dd');
        let Systemdate = new DatePipe("en-IN").transform(this.NowDate, 'yyyy-MM-dd');
        book.leaddate = dataDate;

        let presentcheckdate = new Date(book.leaddate).toLocaleDateString()
        let Todaydate = new Date(Systemdate).toLocaleDateString()
        let now = new Date(Systemdate)
        let xx = 0;
        let oneweek = "";
        if (this.FilterClicked == "By Week") {
          xx = now.setDate(now.getDate() - 6);
          oneweek = new Date(xx).toLocaleDateString();

        }
        else if (this.FilterClicked == "By Month") {

          xx = now.setDate(now.getDate() - 30);
          oneweek = new Date(xx).toLocaleDateString();
        }

        var from = Date.parse(oneweek);
        var to = Date.parse(Todaydate);
        var check = Date.parse(presentcheckdate);

        if (this.FilterClicked == "By Month" || this.FilterClicked == "By Week") {
          if ((check <= to && check >= from)) {

            return book;
          }
        }
        else {
          if (check == to) {
            return book;
          }
        }
      });


  }




  FunnelHideandShow(checked: string) {


    if (checked == "Card") {

      this.CardShow = false;
      this.Cardhide = true;
      this.tabclicked = checked
      // this.refreshData();
    }
    else {
      this.CardShow = true;
      this.Cardhide = false;
      this.tabclicked = checked
      // this.refreshData();
    }


  }

  onFilterChange(value: string, Table: string) {

    let tableneme = '#Employee' + Table + ''

    var column = $(tableneme).DataTable().column(value);

    // Toggle the visibility
    column.visible(!column.visible());
    var isthere = this.columnshideids.includes(value);
    if (isthere != true) {
      this.columnshideids.push(value)
    }
    else {

      this.columnshideids = this.columnshideids.filter(item => item !== value)

    }
  }
  ngOnDestroy() {

  }
  displayCounter() {

    this.GetAllLeads();
  }
  private GetAllLeads(): void {

    this.http.get(environment.apiURL + '/Getdealstages').subscribe(json => {
      debugger;
      this.Dealstages = json;
      //this.freshcount = this.FreshLeads.length;
      this.Dealstages = JSON.parse(this.Dealstages);
      this.Dealstages = this.Dealstages.DM
      this.clientstagename = "Fresh";
      this.http.get(environment.apiURL + '/GetAllLeads').subscribe(json => {
        debugger;
        this.FreshLeads = json;
        //this.freshcount = this.FreshLeads.length;
        this.FreshLeadsAll = JSON.parse(this.FreshLeads);
        this.GetLeadsSatgeWise(this.FreshLeadsAll, this.setActivetab);
        debugger;



        if (this.setActivetab == 'Fresh') {
          this.TableColumnsDynamic = [
            {
              "data": null, "sortable": false,

            },
            {
              "title": "S.No.", "data": null,
              render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
              }
            },




            { "title": "Added on", "data": "leaddate", className: 'leaddate' },

            {
              "data": "namemobile", class: "phone", "title": "Name / Phone", "render": function (data, type, full) {
                return full['fullname'] + '<br />' + ' # ' + full[('mobileno')];
              }
            },
            { "title": "Query", "data": "query", className: 'query' },
            { "title": "Business Deal", "data": "dealname", className: 'dealname' },
            { "title": "Source", "data": "parentsourcename", className: 'parentsourcename' },
            { "title": "Sub Source", "data": "sourcename", className: 'sourcename' },
            { "title": "Email", "data": "email", className: 'email' },

          ]
          this.tableViewcolumsshowandhide = [{ id: 2, name: "Added on", checked: true }, { id: 3, name: "Name", checked: true }, { id: 4, name: "Query", checked: true }, { id: 5, name: "Business Deal", checked: true }, { id: 6, name: "Source", checked: true }, { id: 7, name: "Sub Source", checked: true }, { id: 8, name: "Email", checked: true }]
          //this.data = this.groupByPipe.transform(this.FreshLeads, this.Groupbytype)

          this.LoadMore('2', this.setActivetab, true)
        }
        else {
          this.TableColumnsDynamic = [
            {
              "data": null, "sortable": false,

            },
            {
              "title": "S.No.", "data": null,
              render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
              }
            },
            { "title": "Added on", "data": "leaddate", className: 'leaddate' },

            {
              "data": "namemobile", class: "phone", "title": "Name / Phone", "render": function (data, type, full) {
                return full['fullname'] + '<br />' + ' # ' + full[('mobileno')];
              }
            },
            { "title": "Query", "data": "query", className: 'query' },
            { "title": "Business Deal", "data": "dealname", className: 'dealname' },
            { "title": "Source", "data": "parentsourcename", className: 'parentsourcename' },
            { "title": "Sub Source", "data": "sourcename", className: 'sourcename' },
            { "title": "Email", "data": "email", className: 'email' },
            {
              "title": "Next FollowUp", "data": "nextfollowupdate", "render": function (data) {
                var date = new Date(data);
                var month = date.getMonth() + 1;
                return (date.getDate()) + "/" + "0" + month + "/" + date.getFullYear();
              }
            }

          ]
          this.tableViewcolumsshowandhide = [{ id: 2, name: "Added on", checked: true }, { id: 3, name: "Name", checked: true }, { id: 4, name: "Query", checked: true }, { id: 5, name: "Business Deal", checked: true }, { id: 6, name: "Source", checked: true }, { id: 7, name: "Sub Source", checked: true }, { id: 8, name: "Email", checked: true }, { id: 9, name: "Next Followup", checked: true }]
          // this.Newdata = this.groupByPipe.transform(this.FreshLeads, this.Groupbytype)
          this.LoadMore('2', this.setActivetab, true)
        }




        this.countFresh = 0;
        this.hotcount = 0;
        this.freshcount = this.FreshLeads.length;

        let Tabledata = this.FreshLeads;

        let tableneme = '#Employee' + this.setActivetab + ''


        if (this.DatatableInIt != null) {
          this.DatatableInIt.destroy();

        }

        this.DatatableInIt = $(tableneme).DataTable({
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
          'select': {
            'style': 'multi',

          },
          responsive: true,
          data: Tabledata,
          dom: 'Bfrtip',
          columns: this.TableColumnsDynamic,


          buttons: [
            {
              extend: 'copyHtml5',
              exportOptions: {
                columns: ':visible'
              }

            },

            {
              extend: 'excelHtml5',
              exportOptions: {
                columns: ':visible',
                modifier: {
                  selected: null
                },
                rows: { selected: true }
              }

            },
            {
              extend: 'csvHtml5',
              exportOptions: {
                columns: ':visible',
                modifier: {
                  selected: null
                },
                rows: { selected: true }
              }

            },
            {
              extend: 'pdfHtml5',
              exportOptions: {
                columns: ':visible',
                modifier: {
                  selected: null
                },
                rows: { selected: true }
              }

            },
            {
              extend: 'print',
              exportOptions: {
                columns: ':visible',
                modifier: {
                  selected: null
                },
                rows: { selected: true }
              }

            },
            {
              extend: 'selectAll',
              exportOptions: {
                columns: ':visible',
                modifier: {
                  selected: null
                },

              }

            }, {
              extend: 'selectNone',
              exportOptions: {
                columns: ':visible',
                modifier: {
                  selected: null
                },

              }

            }
          ],

          initComplete: function () {
            var $buttons = $('.dt-buttons').hide();

          }


        });

        for (var _i = 0; _i < this.columnshideids.length; _i++) {
          var num = this.columnshideids[_i];
          var column = $(tableneme).DataTable().column(num);

          // Toggle the visibility
          column.visible(!column.visible());

        }



      });
    });


  }
  private refreshData(): void {
    debugger;
    this.GetAllLeads();
    this.subscribeToData();
  }

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(120000).subscribe(() => this.refreshData());

  }
  test() {
    debugger;


  }
  LoadMore(CountToDisplay, ClientStagename, refresh) {
    debugger;
    if (refresh == true) {
      CountToDisplay = 0
      if (this.LoadCount == 0) {
        this.LoadCount = 2;
      }
    }

    let recordscount = parseInt(this.LoadCount) + parseInt(CountToDisplay)
    let OldCount = this.GeTCount(ClientStagename, "");
    let NewCountAfterFilter = this.GeTCount(ClientStagename, this.FilterClicked);

    var newdata = this.FreshLeads;
    var items = newdata.slice(0, recordscount);
    if (ClientStagename == "Fresh") {
      this.data = this.groupByPipe.transform(items, this.Groupbytype)
      if (this.data.length == 0) { recordscount = 1000000000000; }
    }
    else {

      this.Newdata = this.groupByPipe.transform(items, this.Groupbytype)
      if (this.Newdata.length == 0) { recordscount = 1000000000000; }
    }
    this.newcount = this.countFresh
    this.countFresh = this.newcount;
    this.LoadCount = recordscount;
    if (this.LoadCount > this.countFresh) {

      this.LoadCount = this.countFresh;
      if (this.data.length == 0) { this.LoadCount = 1000000000000; }
      if (ClientStagename != "Fresh")
        if (this.Newdata.length == 0) { this.LoadCount = 1000000000000; }

    }



  }

  GeTCount(Dealstagename, FilterClicked) {

    if (this.FreshLeadsAll !== undefined) {
      this.FreshLeads = this.FreshLeadsAll.filter(function (clientstagename) {
        return clientstagename.clientstagename == Dealstagename;
      });
    }
    if (FilterClicked == "By Month" || FilterClicked == "By Week" || FilterClicked == "By Today") {

      this.GetFreshLedsDayAndWeekAndMomthWise(Dealstagename);
    }

    this.countFresh = this.FreshLeads.length;
    return this.countFresh;
  }

  RefreshFunnelAfterLeadModify(event) {
    debugger;
    this.refreshData();
  }

}
