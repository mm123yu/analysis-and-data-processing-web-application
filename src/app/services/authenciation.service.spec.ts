import { TestBed } from '@angular/core/testing';

import { AuthenciationService } from './authenciation.service';

describe('AuthenciationService', () => {
  let service: AuthenciationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenciationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
