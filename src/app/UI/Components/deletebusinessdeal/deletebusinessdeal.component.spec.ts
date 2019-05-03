import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletebusinessdealComponent } from './deletebusinessdeal.component';

describe('DeletebusinessdealComponent', () => {
  let component: DeletebusinessdealComponent;
  let fixture: ComponentFixture<DeletebusinessdealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletebusinessdealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletebusinessdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
