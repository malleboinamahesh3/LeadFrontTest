import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletechannelpartnerComponent } from './deletechannelpartner.component';

describe('DeletechannelpartnerComponent', () => {
  let component: DeletechannelpartnerComponent;
  let fixture: ComponentFixture<DeletechannelpartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletechannelpartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletechannelpartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
