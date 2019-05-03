import { TestBed } from '@angular/core/testing';

import { CancelservicesService } from './cancelservices.service';

describe('CancelservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CancelservicesService = TestBed.get(CancelservicesService);
    expect(service).toBeTruthy();
  });
});
