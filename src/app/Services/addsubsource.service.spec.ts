import { TestBed } from '@angular/core/testing';

import { AddsubsourceService } from './addsubsource.service';

describe('AddsubsourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddsubsourceService = TestBed.get(AddsubsourceService);
    expect(service).toBeTruthy();
  });
});
