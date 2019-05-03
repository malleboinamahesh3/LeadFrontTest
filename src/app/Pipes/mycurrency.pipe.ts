import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Pipe({
  name: 'mycurrency'
})
export class MycurrencyPipe implements PipeTransform {

  data:any
  symbol:any;
  returnvalue:any
  constructor(private cookieservice:CookieService){}
  transform(value: any, args?: any): any {

debugger;
    this.data=this.cookieservice.get("savedformat")
    if (this.data == "India") {
      this.symbol=this.cookieservice.get("symbolofcurrency")
    var result = value.toString().split('.');
    var lastThree = result[0].substring(result[0].length - 3);
    var otherNumbers = result[0].substring(0, result[0].length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    if (result.length > 1) {
      output += "." + result[1];
    }    
    this.returnvalue= this.symbol+' '+output
   // this.soldform.controls.dealvalue.setValue(output); 
  }
  else{
    this.symbol=this.cookieservice.get("symbolofcurrency")
    var result =value.toString().split('.');
    var lastThree = result[0].substring(result[0].length - 3);
    var otherNumbers = result[0].substring(0, result[0].length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
    if (result.length > 1) {
      output += "." + result[1];
    }      
    this.returnvalue=  this.symbol+' '+output  
   // this.soldform.controls.dealvalue.setValue(output);
  } 


    return  this.returnvalue;

  }

}
