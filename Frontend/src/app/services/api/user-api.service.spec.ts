import { TestBed } from '@angular/core/testing';

import { UserApiService } from './user-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: UserApiService = TestBed.get(UserApiService);
    expect(service).toBeTruthy();
  });
});
