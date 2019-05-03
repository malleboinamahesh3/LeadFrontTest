import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsalestargetComponent } from './setsalestarget.component';

describe('SetsalestargetComponent', () => {
  let component: SetsalestargetComponent;
  let fixture: ComponentFixture<SetsalestargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetsalestargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetsalestargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
