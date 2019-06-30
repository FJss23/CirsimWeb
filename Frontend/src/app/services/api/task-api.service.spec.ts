import { TestBed } from '@angular/core/testing';

import { TaskServiceApi } from './task-api.service';

describe('TaskServiceApi', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskServiceApi = TestBed.get(TaskServiceApi);
    expect(service).toBeTruthy();
  });
});
