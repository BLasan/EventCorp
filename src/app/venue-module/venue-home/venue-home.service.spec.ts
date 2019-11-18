import { TestBed } from '@angular/core/testing';

import { VenueHomeService } from './venue-home.service';

describe('VenueHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenueHomeService = TestBed.get(VenueHomeService);
    expect(service).toBeTruthy();
  });
});
