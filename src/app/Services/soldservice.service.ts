import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoldserviceService {

  constructor(private http: HttpClient) { }
  public Getleaddata(leadid) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let HttpParams = { 'leadid': leadid }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };

   
    return this.http.get(environment.apiURL + '/GetLeaddata', options);
  }


  public GetLeadpayment(leadid) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let HttpParams = { 'leadid': leadid }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };

   
    return this.http.get(environment.apiURL + '/CheckLeadBankDetailsexist', options);
  }

  public Getchannelcheck(channelid){
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let HttpParams = { 'referalid': channelid }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };
    return this.http.get(environment.apiURL + '/GetChannelpartnerinfo', options);
  }
  public Savesolddetails(data){
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
   // let HttpParams = { 'referalid': channelid }
    let options = {
      headers: httpHeaders,
     // params: HttpParams
    };
    return this.http.post(environment.apiURL+'/InsertLeadinvoice',data, options);

  }
  // this.http.post(environment.apiURL + '/Leadupdate', add, options).subscribe(json => {}
  // }
}
