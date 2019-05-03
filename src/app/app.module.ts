import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { NavigationComponent } from './UI/Components/navigation/navigation.component';
import { SearchComponent } from './UI/Components/search/search.component';
import { DashboardComponent } from './UI/Components/dashboard/dashboard.component';
import { LeadComponent } from './UI/Components/lead/lead.component';
import { FunnelComponent } from './UI/Components/funnel/funnel.component';
import { TodoComponent } from './UI/Components/todo/todo.component';
import { ReportsComponent } from './UI/Components/reports/reports.component';
import { SettingsComponent } from './UI/Components/settings/settings.component';
import { SourceComponent } from './UI/Components/source/source.component';
import { InviteteamComponent } from './UI/Components/inviteteam/inviteteam.component';
import { DetailsComponent } from "./UI/Components/details/details.component";
import { BusinessdealComponent } from './UI/Components/businessdeal/businessdeal.component';
import { ChanelpartnerComponent } from './UI/Components/chanelpartner/chanelpartner.component';
//import { ToastrModule } from 'ngx-toastr';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe'; // <-- Import
import { GroupByPipe } from './UI/Components/funnel/Custom.pipes';
import { CountriesService } from './Services/Countries.service';
import { FreshbusinessComponent } from './UI/Components/freshbusiness/freshbusiness.component';
import { SoldbusinessComponent } from './UI/Components/soldbusiness/soldbusiness.component';
import { CancelledbusinessComponent } from './UI/Components/cancelledbusiness/cancelledbusiness.component';
import { FollowupComponent } from './UI/Components/followup/followup.component';
import { FollowuphistoryComponent } from './UI/Components/followuphistory/followuphistory.component';
import { DesignationComponent } from './UI/Components/designation/designation.component';
import { DatepickerModule, BsDatepickerModule  } from 'ngx-bootstrap/datepicker';
import {NgxPrintModule} from 'ngx-print';
import { LeadeditComponent } from './UI/Components/leadedit/leadedit.component';
import { InvitememberComponent } from './UI/Components/invitemember/invitemember.component';
import { SetsalestargetComponent } from './UI/Components/setsalestarget/setsalestarget.component';
import { SuspendteammemberComponent } from './UI/Components/suspendteammember/suspendteammember.component';
import { TransferleadsComponent } from './UI/Components/transferleads/transferleads.component';
import { EditmemberComponent } from './UI/Components/editmember/editmember.component';
import { DeletesalespersonnelComponent } from './UI/Components/deletesalespersonnel/deletesalespersonnel.component';
import { AddChannelpartnerComponent } from './UI/Components/add-channelpartner/add-channelpartner.component';
import { EditchannelpartnerComponent } from './UI/Components/editchannelpartner/editchannelpartner.component';
import { DeletechannelpartnerComponent } from './UI/Components/deletechannelpartner/deletechannelpartner.component';
import { AddbusinessdealsComponent } from './UI/Components/addbusinessdeals/addbusinessdeals.component';
import { EditbusinessdealComponent } from './UI/Components/editbusinessdeal/editbusinessdeal.component';
import { DeletebusinessdealComponent } from './UI/Components/deletebusinessdeal/deletebusinessdeal.component';
import { WhocanComponent } from './UI/Components/whocan/whocan.component';
import { AccessUsereportsComponent } from './UI/Components/access-usereports/access-usereports.component';
import { DeleteaccessComponent } from './UI/Components/deleteaccess/deleteaccess.component';
import { EditaccessreportsComponent } from './UI/Components/editaccessreports/editaccessreports.component';
import { InviteuserdomainComponent } from './UI/Components/inviteuserdomain/inviteuserdomain.component';
import { MycurrencyFormatterDirective } from './Directives/mycurrency-formatter.directive';
import { CookieService } from 'ngx-cookie-service';
import { MycurrencyPipe } from './Pipes/mycurrency.pipe';
import { MydateformatPipe } from './Pipes/mydateformat.pipe';
import { DatePipe } from '@angular/common'

const appRoutes: Routes = [
  { path:'', component: LeadComponent, data: { title: 'Add Lead' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dash Board' } },
  { path: 'search', component: SearchComponent, data: { title: 'Settings' } },  
  { path: 'leads', component: LeadComponent, data: { title: 'Add Lead' } },
  { path: 'funnel', component: FunnelComponent, data: { title: 'Funnel' } },
  { path: 'todo', component: TodoComponent, data: { title: 'To do' } },
  { path: 'reports', component: ReportsComponent, data: { title: 'Reports' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
  { path: 'source', component: SourceComponent, data: { title: 'source' } },
  { path: 'inviteteam', component: InviteteamComponent, data: { title: 'inviteteam' } },
  { path: 'details', component: DetailsComponent, data: { title: 'details' } },
  { path: 'Cancelledbusiness', component: CancelledbusinessComponent, data: { title: 'cancelledbusiness' } },
  { path: 'freshbusiness', component: FreshbusinessComponent, data: { title: 'Freshbusiness' } },
  { path: 'Soldbusiness', component: SoldbusinessComponent, data: { title: 'Soldbusiness' } },
  { path: 'Followup', component: FollowupComponent, data: { title: 'Followup' } },
  { path: 'Followuphistory', component: FollowuphistoryComponent, data: { title: 'Followuphistory' } }
];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchComponent,
    DashboardComponent,
    LeadComponent,
    FunnelComponent,
    TodoComponent,
    ReportsComponent,
    SettingsComponent,
    SourceComponent,
    InviteteamComponent,
    DetailsComponent,
    BusinessdealComponent,
    ChanelpartnerComponent,
    GroupByPipe,
    FreshbusinessComponent,
    SoldbusinessComponent,
    CancelledbusinessComponent,
    FollowupComponent,
    FollowuphistoryComponent,
    DesignationComponent,
    LeadeditComponent,
    InvitememberComponent,
    SetsalestargetComponent,
    SuspendteammemberComponent,
    TransferleadsComponent,
    EditmemberComponent,
    DeletesalespersonnelComponent,
    AddChannelpartnerComponent,
    EditchannelpartnerComponent,
    DeletechannelpartnerComponent,
    AddbusinessdealsComponent,
    EditbusinessdealComponent,
    DeletebusinessdealComponent,
    WhocanComponent,
    AccessUsereportsComponent,
    DeleteaccessComponent,
    EditaccessreportsComponent,
    InviteuserdomainComponent,
    MycurrencyFormatterDirective,
    MycurrencyPipe,
    MydateformatPipe
   
  ],
  imports: [
    OrderModule,
    BrowserModule,
    FilterPipeModule,
   // DatepickerModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() ,
    NgxPrintModule
   
  ],
  providers: [CountriesService,CookieService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
