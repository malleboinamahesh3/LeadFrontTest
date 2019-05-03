import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbusinessdealsComponent } from './addbusinessdeals.component';

describe('AddbusinessdealsComponent', () => {
  let component: AddbusinessdealsComponent;
  let fixture: ComponentFixture<AddbusinessdealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbusinessdealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbusinessdealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
