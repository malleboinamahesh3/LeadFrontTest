import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferleadsComponent } from './transferleads.component';

describe('TransferleadsComponent', () => {
  let component: TransferleadsComponent;
  let fixture: ComponentFixture<TransferleadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferleadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
