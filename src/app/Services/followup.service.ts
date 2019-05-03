import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowupService {

  constructor(private http: HttpClient) { }

  public GetfollwupthroughButtons() {

    return this.http.get(environment.apiURL + '/Getfollowupthrough');
  }

  public GetfollwupstageButtons() {
debugger;
    return this.http.get(environment.apiURL + '/Getdealstages');
  }

  public FollowupSave(source) {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };

    return this.http.post(environment.apiURL + '/InsertSubsource', source)
  }

}
