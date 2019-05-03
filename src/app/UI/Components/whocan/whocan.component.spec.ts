import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhocanComponent } from './whocan.component';

describe('WhocanComponent', () => {
  let component: WhocanComponent;
  let fixture: ComponentFixture<WhocanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhocanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhocanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
