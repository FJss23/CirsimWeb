import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherNewTaskComponent } from './teacher-new-task.component';

describe('NewTaskComponent', () => {
  let component: TeacherNewTaskComponent;
  let fixture: ComponentFixture<TeacherNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherNewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
