import { TestBed, async, inject } from '@angular/core/testing';

import { StudentGuard } from './student.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentGuard],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should ...', inject([StudentGuard], (guard: StudentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
