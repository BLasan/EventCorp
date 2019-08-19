import { TestBed } from '@angular/core/testing';

import { VenueCalendarService } from './venue-calendar.service';

describe('VenueCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenueCalendarService = TestBed.get(VenueCalendarService);
    expect(service).toBeTruthy();
  });
});
