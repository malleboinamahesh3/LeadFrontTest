import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshbusinessComponent } from './freshbusiness.component';

describe('FreshbusinessComponent', () => {
  let component: FreshbusinessComponent;
  let fixture: ComponentFixture<FreshbusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreshbusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
