import { TestBed } from '@angular/core/testing';

import { SoldserviceService } from './soldservice.service';

describe('SoldserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoldserviceService = TestBed.get(SoldserviceService);
    expect(service).toBeTruthy();
  });
});
