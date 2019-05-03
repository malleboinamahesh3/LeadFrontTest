import { Injectable } from '@angular/core';
import{ HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddsubsourceService {

  constructor(private _http:HttpClient) { }
  public Addsubsource(subsource:any):any{
  return this._http.post(environment.apiURL + '/EmployeeSave', subsource);

  }
}
