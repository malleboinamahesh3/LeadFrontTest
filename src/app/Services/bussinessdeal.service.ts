import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Bussinessdeal} from '../Models/bussinessdeal';

@Injectable({
  providedIn: 'root'
})
export class BussinessdealService {
formData : Bussinessdeal;
  constructor(private http:HttpClient) { }
  saveOrUpdatedeal() {
    var body = {
      ...this.formData
    };
    return this.http.post(environment.apiURL + '/SaveDeal', body);
  }
}
