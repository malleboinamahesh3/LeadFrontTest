import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditBusinessDealService {
  editpopupdata:any;
  constructor() { }
  public seteditpopupdata(popupdata){
    this.editpopupdata=popupdata;
 }
 public geteditpopupdata(){
   return this.editpopupdata;
 }

 

 public setdeletepopupdata(popupdata){
  this.editpopupdata=popupdata;
}
public getdeletepopupdata(){
 return this.editpopupdata;
}
}
