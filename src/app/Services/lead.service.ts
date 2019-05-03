import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadService {


  constructor(private http:HttpClient) { }
  // saveOrUpdatelead() {
  //   var body = {
  //     ...this.formData,
  //     lead: this.LeadList
  //   };
  //   return this.http.post(environment.apiURL + '/LeadSave', body);
  // }
  getCountryList(){
    return this.http.get(environment.apiURL+'/GetManagersAndExecutives').toPromise();
   }
   getDealList()
   {
    return this.http.get(environment.apiURL+'/GetDeals').toPromise();
   }
   getTitleList()
   {
    return this.http.get(environment.apiURL+'/GetManagersAndExecutives').toPromise();
   }
}
