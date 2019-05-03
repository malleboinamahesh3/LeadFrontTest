import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbusinessdealComponent } from './editbusinessdeal.component';

describe('EditbusinessdealComponent', () => {
  let component: EditbusinessdealComponent;
  let fixture: ComponentFixture<EditbusinessdealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbusinessdealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbusinessdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
