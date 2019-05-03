import { TestBed } from '@angular/core/testing';

import { InviteTeamServiceService } from './invite-team-service.service';

describe('InviteTeamServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InviteTeamServiceService = TestBed.get(InviteTeamServiceService);
    expect(service).toBeTruthy();
  });
});
