import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledbusinessComponent } from './cancelledbusiness.component';

describe('CancelledbusinessComponent', () => {
  let component: CancelledbusinessComponent;
  let fixture: ComponentFixture<CancelledbusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledbusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
