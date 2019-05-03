import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteaccessComponent } from './deleteaccess.component';

describe('DeleteaccessComponent', () => {
  let component: DeleteaccessComponent;
  let fixture: ComponentFixture<DeleteaccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteaccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
