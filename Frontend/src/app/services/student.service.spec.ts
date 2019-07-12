import { TestBed } from '@angular/core/testing';

import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';

describe('StudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: StudentService = TestBed.get(StudentService);
    expect(service).toBeTruthy();
  });
});
