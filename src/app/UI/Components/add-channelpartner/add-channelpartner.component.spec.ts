import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChannelpartnerComponent } from './add-channelpartner.component';

describe('AddChannelpartnerComponent', () => {
  let component: AddChannelpartnerComponent;
  let fixture: ComponentFixture<AddChannelpartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChannelpartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChannelpartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
