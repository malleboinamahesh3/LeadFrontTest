import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaccessreportsComponent } from './editaccessreports.component';

describe('EditaccessreportsComponent', () => {
  let component: EditaccessreportsComponent;
  let fixture: ComponentFixture<EditaccessreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaccessreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaccessreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
