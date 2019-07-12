import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
