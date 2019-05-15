import { TestBed } from '@angular/core/testing';

import { BoatService } from './boat.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoatService = TestBed.get(BoatService);
    expect(service).toBeTruthy();
  });
});
