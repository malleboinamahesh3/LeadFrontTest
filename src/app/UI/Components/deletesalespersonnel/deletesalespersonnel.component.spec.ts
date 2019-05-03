import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesalespersonnelComponent } from './deletesalespersonnel.component';

describe('DeletesalespersonnelComponent', () => {
  let component: DeletesalespersonnelComponent;
  let fixture: ComponentFixture<DeletesalespersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletesalespersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesalespersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
