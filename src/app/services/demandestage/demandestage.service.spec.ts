import { TestBed } from '@angular/core/testing';

import { DemandestageService } from './demandestage.service';

describe('DemandestageService', () => {
  let service: DemandestageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandestageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
