import { TestBed } from '@angular/core/testing';

import { LettreaffectationService } from './lettreaffectation.service';

describe('LettreaffectationService', () => {
  let service: LettreaffectationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LettreaffectationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
