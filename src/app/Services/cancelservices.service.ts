import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CancelservicesService {

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

  public GetCustomerpayments(leadid) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let HttpParams = { 'leadid': leadid }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };

   
    return this.http.get(environment.apiURL + '/GetCustomerpayments', options);
  }

  public GetChannelpartnerinfo(leadid) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let HttpParams = { 'referalid': leadid }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };

   
    return this.http.get(environment.apiURL + '/GetChannelpartnerinfo', options);
  }

  public GetCPPayments(leadid) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let HttpParams = { 'leadid': leadid }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };

   
    return this.http.get(environment.apiURL + '/GetCPPayments', options);
  }

  
  public SaveCanceldetails(data){

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
  
    let options = {
      headers: httpHeaders,    
    };

    return this.http.post(environment.apiURL+'/InsertLeadinvoiceCancel',data, options);

  }
  

}
