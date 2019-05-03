import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessdealComponent } from './businessdeal.component';

describe('BusinessdealComponent', () => {
  let component: BusinessdealComponent;
  let fixture: ComponentFixture<BusinessdealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessdealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
