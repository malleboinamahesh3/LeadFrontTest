import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {



  private notify = new Subject<any>();
  private notifydeal = new Subject<any>();
  private notifyeditchannel = new Subject<any>();
  private notifyeditchannelnew = new Subject<any>();
  private notifyeditchannelnewedit = new Subject<any>();
  private notifydeleteInvite = new Subject<any>();
 
  private notifyInvitenew = new Subject<any>();
  private notifynew = new Subject<any>();
  private notifychannel = new Subject<any>();
  private notifyUpdate = new Subject<any>();
  private notifyChannelUpdate = new Subject<any>();
  private notifyChannelClear = new Subject<any>();
  private notifySourceClear = new Subject<any>();
  private notifyFollowuoToClear = new Subject<any>();
  private notifyeditInvite = new Subject<any>();
  private notifysuspendteam = new Subject<any>();
  private notifyTransferteam = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  notifyObservablenew$ = this.notifynew.asObservable();
  notifyObservablenewChannel$ = this.notifychannel.asObservable();
  notifyObservablenewUpdateSbusource$ = this.notifyUpdate.asObservable();
  notifyObservablenewChannelUpdateSbusource$ = this.notifyChannelUpdate.asObservable();

  notifyObservablenewChannelClear$ = this.notifyChannelClear.asObservable();
  notifyObservablenewSourtceClear$ = this.notifySourceClear.asObservable();

  notifyObservableFollowupClear$ = this.notifyFollowuoToClear.asObservable();
  notifyObservabledeal$ = this.notifydeal.asObservable();
  notifyObservablechannel$ = this.notifyeditchannel.asObservable();
  notifyObservablechannelnew$ = this.notifyeditchannelnew.asObservable();
  notifyObservablechannelnewedit$ = this.notifyeditchannelnewedit.asObservable();

  notifyObservableInvite$ = this.notifydeleteInvite.asObservable();
  notifyobservableInviteEdit$ = this.notifyeditInvite.asObservable();
  notifyObservableInviteNew$ = this.notifyInvitenew.asObservable();
  notifyObservablensuspendteam$ = this.notifysuspendteam.asObservable();
  notifyObservablenTransferteam$ = this.notifyTransferteam.asObservable();
  
  constructor() { }
  private data: any = [];


  public notifToFollowup() {
    this.notifyFollowuoToClear.next();
  }


  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  public notifyOtherdeal(data: any) {
    if (data) {
      this.notifydeal.next(data);
    }
  }
  public notifyOtherchannel(data: any) {
    if (data) {
      this.notifyeditchannel.next(data);
    }
  }
  public notifyOtherchannelnew(data: any) {
    if (data) {
      this.notifyeditchannelnew.next(data);
    }
  }
  public notifyOtherchanneledit(data: any) {
    if (data) {
      this.notifyeditchannelnewedit.next(data);
    }
  }
  public notifyOtherInvite(data: any) {
    if (data) {

      this.notifydeleteInvite.next(data);
    }
  }
  
  public notifyOtherInvitenew(data: any) {
    if (data) {

      this.notifyInvitenew.next(data);
    }
  }

  public notifyOtherInviteEdit(data: any) {
    if (data) {

      this.notifyeditInvite.next(data);
    }
  }


  public notifyOthernew(data: any) {
    if (data) {
      this.notifynew.next(data);
    }
  }
  public notifyOthernewChannel(data: any) {
    if (data) {
      this.notifychannel.next(data);
    }
  }
  public notifyOthernewupdatesubsource(data: any) {
    if (data) {
      this.notifyUpdate.next(data);
    }
  }

  public notifyOthernewChannelupdatesubsource(data: any) {
    if (data) {
      this.notifyChannelUpdate.next(data);
    }
  }

  public notifyOthernewChannelClear(data: any) {
    if (data) {
      this.notifyChannelClear.next(data);
    }
  }

  public notifyOthernewSourceClear(data: any) {
    if (data) {
      this.notifySourceClear.next(data);
    }
  }
  public notifyOtherInvitesuspend(data: any) {
    if (data) {
      this.notifysuspendteam.next(data);
    }
  }

  public notifyOtherInviteTransfer(data: any) {
    if (data) {
      this.notifyTransferteam.next(data);
    }
  }

  SetData(data: any) {
    this.data = data;
  }

  getData(): any {

    return this.data;
  }
  SetDataBusiness(data: any) {
    this.data = data;
  }
  getDataBusiness(): any {

    return this.data;
  }
  SetDesignation(data: any) {
    this.data = data;
  }
  getDesignation(): any {

    return this.data;
  }
}
