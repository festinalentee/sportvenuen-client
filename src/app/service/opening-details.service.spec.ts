import { TestBed } from '@angular/core/testing';

import { OpeningDetailsService } from './opening-details.service';

describe('OpeningDetailsService', () => {
  let service: OpeningDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
