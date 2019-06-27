import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSentTasksComponent } from './teacher-sent-tasks.component';

describe('TeacherHomeComponent', () => {
  let component: TeacherSentTasksComponent;
  let fixture: ComponentFixture<TeacherSentTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSentTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
