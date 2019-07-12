import { TestBed } from '@angular/core/testing';

import { AuthServiceApi } from './auth-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthServiceApi', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: AuthServiceApi = TestBed.get(AuthServiceApi);
    expect(service).toBeTruthy();
  });
});
