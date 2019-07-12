import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTaskTodoComponent } from './student-task-todo.component';
import { SharedModule } from 'src/app/model/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('StudentTaskTodoComponent', () => {
  let component: StudentTaskTodoComponent;
  let fixture: ComponentFixture<StudentTaskTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTaskTodoComponent ],
      imports: [SharedModule, HttpClientModule]
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
