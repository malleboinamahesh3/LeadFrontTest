import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DateFormatter } from 'ngx-bootstrap/datepicker/public_api';
import { DatePipe } from '@angular/common'

@Pipe({
  name: 'mydateformat'
})
export class MydateformatPipe implements PipeTransform {

  dateformat: any
  latest_date:any
  constructor(private cookieservice: CookieService, public datepipe: DatePipe) { }
  transform(value: any, args?: any): any {
    debugger;
    this.dateformat = this.cookieservice.get("saveddateformat");
    if(this.dateformat == "DD MM YYYY"){
      this.dateformat='dd MM yyyy'
      this.latest_date = this.datepipe.transform(value, this.dateformat);
    }
    if(this.dateformat == "MM DD YYYY"){
      this.dateformat='MM dd yyyy'
      this.latest_date = this.datepipe.transform(value, this.dateformat);
    }
    if(this.dateformat == "YYYY MM DD"){
      this.dateformat='yyyy MM dd'
      this.latest_date = this.datepipe.transform(value, this.dateformat);
    }
    if(this.dateformat == "DD/MM/YYYY"){
      this.dateformat='dd/MM/yyyy'
      this.latest_date = this.datepipe.transform(value, this.dateformat);
    }
    if(this.dateformat == "MM/DD/YYYY"){
      this.dateformat='MM/dd/yyyy'
      this.latest_date = this.datepipe.transform(value, this.dateformat);
    }
    if(this.dateformat == "YYYY/MM/DD"){
      this.dateformat='yyyy/MM/dd'
      this.latest_date = this.datepipe.transform(value, this.dateformat);
    }
    if(this.dateformat == "DD-MM-YYYY"){
      this.dateformat='dd-MM-yyyy'
      this.latest_date = this.datepipe.transform(value, this.dateformat);
    }
    if(this.dateformat == "MM-DD-YYYY"){
      this.dateformat='MM-dd-yyyy'
      this.latest_date = this.datepipe.transform(value, this.dateformat);
    }
    if(this.dateformat == "YYYY-MM-DD"){
      this.dateformat='yyyy-MM-dd'
      this.latest_date = this.datepipe.transform(value, this.dateformat);
    }

    return this.latest_date;
  }

}
