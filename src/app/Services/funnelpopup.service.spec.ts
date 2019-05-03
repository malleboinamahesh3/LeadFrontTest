import { TestBed } from '@angular/core/testing';

import { FunnelpopupService } from './funnelpopup.service';

describe('FunnelpopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunnelpopupService = TestBed.get(FunnelpopupService);
    expect(service).toBeTruthy();
  });
});
