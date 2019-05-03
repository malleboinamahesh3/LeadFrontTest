import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditchannelpartnerComponent } from './editchannelpartner.component';

describe('EditchannelpartnerComponent', () => {
  let component: EditchannelpartnerComponent;
  let fixture: ComponentFixture<EditchannelpartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditchannelpartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditchannelpartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
