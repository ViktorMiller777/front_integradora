import { TestBed } from '@angular/core/testing';

import { MeminGuard } from './memin.guard';

describe('MeminGuard', () => {
  let guard: MeminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MeminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
