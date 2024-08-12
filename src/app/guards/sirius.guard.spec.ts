import { TestBed } from '@angular/core/testing';

import { SiriusGuard } from './sirius.guard';

describe('SiriusGuard', () => {
  let guard: SiriusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SiriusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
