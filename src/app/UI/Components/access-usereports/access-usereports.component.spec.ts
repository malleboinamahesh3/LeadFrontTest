import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUsereportsComponent } from './access-usereports.component';

describe('AccessUsereportsComponent', () => {
  let component: AccessUsereportsComponent;
  let fixture: ComponentFixture<AccessUsereportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessUsereportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessUsereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
