import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanelpartnerComponent } from './chanelpartner.component';

describe('ChanelpartnerComponent', () => {
  let component: ChanelpartnerComponent;
  let fixture: ComponentFixture<ChanelpartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanelpartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanelpartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
