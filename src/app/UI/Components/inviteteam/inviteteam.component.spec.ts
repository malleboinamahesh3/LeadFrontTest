import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteteamComponent } from './inviteteam.component';

describe('InviteteamComponent', () => {
  let component: InviteteamComponent;
  let fixture: ComponentFixture<InviteteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
