import { TestBed } from '@angular/core/testing';

import { LocationExistsGuard } from './location-exists.guard';

describe('LocationExistsGuard', () => {
  let guard: LocationExistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LocationExistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
