import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InviteTeamModel } from '../Models/invite-team-model';
import { formatDate } from '@angular/common';
import { stringify } from '@angular/core/src/util';
import { Options } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class InviteTeamServiceService {
  formData: InviteTeamModel;
  List: InviteTeamModel[];
  employeename: any;
  edata: any;
  constructor(private http: HttpClient) { }
  saveOrUpdatelead(data: any) {
    // var body = {
    //   ...this.formData,
    //   InviteTeamModel: this.List
    // };
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders,
     
    };
    this.edata = data;
    if (confirm("Are you sure, do you want to Save ?")) {
      return this.http.post(environment.apiURL + '/EmployeeSave', data,options  );

    }
  }

  saveOrUpdateleadEdit(data: any) {
    // var body = {
    //   ...this.formData,
    //   InviteTeamModel: this.List
    // };
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders,
     
    };
    this.edata = data;
    if (confirm("Are you sure, do you want to Save ?")) {
      return this.http.post(environment.apiURL + '/EmployeeDetailsEdit', data,options  );

    }
  }
  getCountryList() {
    return this.http.get(environment.apiURL + '/GetManagersAndExecutives').toPromise();
  }
  getRoleList() {
    return this.http.get(environment.apiURL + '/Role').toPromise();
  }
  getReportingManagerList() {
    return this.http.get(environment.apiURL + '/Getmanagers').toPromise();
  }
  getdesignationList() {
    return this.http.get(environment.apiURL + '/GetDesignations').toPromise();
  }
  getinvitedata(employeename: any) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    this.employeename = employeename;
    let HttpParams = { 'employeename': this.employeename }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };
    return this.http.get(environment.apiURL + '/CheckEmployeeNameexist', options);
  }
}
