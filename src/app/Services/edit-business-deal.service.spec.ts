import { TestBed } from '@angular/core/testing';

import { EditBusinessDealService } from './edit-business-deal.service';

describe('EditBusinessDealService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditBusinessDealService = TestBed.get(EditBusinessDealService);
    expect(service).toBeTruthy();
  });
});
