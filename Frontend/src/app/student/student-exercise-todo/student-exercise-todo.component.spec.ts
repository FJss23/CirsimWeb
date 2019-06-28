import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExerciseTodoComponent } from './student-exercise-todo.component';

describe('StudentExerciseTodoComponent', () => {
  let component: StudentExerciseTodoComponent;
  let fixture: ComponentFixture<StudentExerciseTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExerciseTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExerciseTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
