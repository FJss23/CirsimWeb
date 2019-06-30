import { TestBed } from '@angular/core/testing';

import { AuthServiceApi } from './auth-api.service';

describe('AuthServiceApi', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthServiceApi = TestBed.get(AuthServiceApi);
    expect(service).toBeTruthy();
  });
});
