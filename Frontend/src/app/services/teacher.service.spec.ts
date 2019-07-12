import { TestBed } from '@angular/core/testing';

import { TeacherService } from './teacher.service';
import { HttpClientModule } from '@angular/common/http';

describe('TeacherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: TeacherService = TestBed.get(TeacherService);
    expect(service).toBeTruthy();
  });
});
