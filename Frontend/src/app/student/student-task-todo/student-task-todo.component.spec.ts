import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTaskTodoComponent } from './student-task-todo.component';

describe('StudentHomeComponent', () => {
  let component: StudentTaskTodoComponent;
  let fixture: ComponentFixture<StudentTaskTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTaskTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTaskTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
