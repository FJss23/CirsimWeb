import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResolveExerciseComponent } from './student-resolve-exercise.component';

describe('StudentResolveExerciseComponent', () => {
  let component: StudentResolveExerciseComponent;
  let fixture: ComponentFixture<StudentResolveExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentResolveExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentResolveExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
