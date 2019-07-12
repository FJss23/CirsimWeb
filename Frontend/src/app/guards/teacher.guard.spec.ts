import { TestBed, async, inject } from '@angular/core/testing';

import { TeacherGuard } from './teacher.guard';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TeacherGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherGuard],
      imports: [HttpClientModule, RouterTestingModule]
    });
  });

  it('should ...', inject([TeacherGuard], (guard: TeacherGuard) => {
    expect(guard).toBeTruthy();
  }));
});
