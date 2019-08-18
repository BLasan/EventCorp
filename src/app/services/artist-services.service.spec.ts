import { TestBed } from '@angular/core/testing';

import { ArtistServicesService } from './artist-services.service';

describe('ArtistServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistServicesService = TestBed.get(ArtistServicesService);
    expect(service).toBeTruthy();
  });
});
