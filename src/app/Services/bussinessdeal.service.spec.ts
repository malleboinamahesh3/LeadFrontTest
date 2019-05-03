import { TestBed } from '@angular/core/testing';

import { BussinessdealService } from './bussinessdeal.service';

describe('BussinessdealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BussinessdealService = TestBed.get(BussinessdealService);
    expect(service).toBeTruthy();
  });
});
