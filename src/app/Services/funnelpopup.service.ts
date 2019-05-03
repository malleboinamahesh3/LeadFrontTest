import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunnelpopupdataService {

  Funnelpopupdata:any;
  constructor() { }
  public setFunnelpopupdata(popupdata){
     this.Funnelpopupdata=popupdata;
  }
  public getFunnelpopupdata(){
    return this.Funnelpopupdata;
  }
}
