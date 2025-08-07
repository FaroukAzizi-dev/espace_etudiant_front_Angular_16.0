import { TestBed } from '@angular/core/testing';

import { InternshipofferService } from './internshipoffer.service';

describe('InternshipofferService', () => {
  let service: InternshipofferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternshipofferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
