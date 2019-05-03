import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendteammemberComponent } from './suspendteammember.component';

describe('SuspendteammemberComponent', () => {
  let component: SuspendteammemberComponent;
  let fixture: ComponentFixture<SuspendteammemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendteammemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendteammemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
