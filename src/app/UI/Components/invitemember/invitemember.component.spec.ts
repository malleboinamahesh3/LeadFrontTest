import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitememberComponent } from './invitemember.component';

describe('InvitememberComponent', () => {
  let component: InvitememberComponent;
  let fixture: ComponentFixture<InvitememberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitememberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitememberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
