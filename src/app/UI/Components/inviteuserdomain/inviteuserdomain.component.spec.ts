import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteuserdomainComponent } from './inviteuserdomain.component';

describe('InviteuserdomainComponent', () => {
  let component: InviteuserdomainComponent;
  let fixture: ComponentFixture<InviteuserdomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteuserdomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteuserdomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
