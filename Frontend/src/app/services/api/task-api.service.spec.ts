import { TestBed } from '@angular/core/testing';

import { TaskServiceApi } from './task-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('TaskServiceApi', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: TaskServiceApi = TestBed.get(TaskServiceApi);
    expect(service).toBeTruthy();
  });
});
