import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExerciseComponent } from './teacher-exercise.component';

describe('SimulationExerciseComponent', () => {
  let component: TeacherExerciseComponent;
  let fixture: ComponentFixture<TeacherExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
