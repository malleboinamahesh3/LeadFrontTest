import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Leadsourcemodel } from "../Models/leadsource-model";
@Injectable({
  providedIn: 'root'
})
export class AddnewchanelpartnerService {

  formData: Leadsourcemodel;
  List: Leadsourcemodel[];
  
  constructor(private _http:HttpClient) { }

  addnewChanelpartner(newdetails):any{

    // var body = {
    //   ...this.formData,
    //   InviteTeamModel: this.List
    // };  
    return this._http.post(environment.apiURL + '/EmployeeSave', newdetails);
  };

  public Addsubsource(subsource:any):any{
    return this._http.post(environment.apiURL + '/EmployeeSave', subsource);
  
    }

}
