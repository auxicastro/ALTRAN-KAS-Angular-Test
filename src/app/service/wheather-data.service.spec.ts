import { TestBed } from '@angular/core/testing';

import { WheatherDataService } from './wheather-data.service';

describe('WheatherDataService', () => {
  let service: WheatherDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WheatherDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
