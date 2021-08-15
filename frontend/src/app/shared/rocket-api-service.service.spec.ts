import { TestBed } from '@angular/core/testing';

import { RocketApiServiceService } from './rocket-api-service.service';

describe('RocketApiServiceService', () => {
  let service: RocketApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RocketApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
