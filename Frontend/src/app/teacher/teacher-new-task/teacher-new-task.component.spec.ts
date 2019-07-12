import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherNewTaskComponent } from './teacher-new-task.component';
import { SharedModule } from 'src/app/model/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TeacherNewTaskComponent', () => {
  let component: TeacherNewTaskComponent;
  let fixture: ComponentFixture<TeacherNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherNewTaskComponent ],
      imports: [SharedModule, HttpClientModule, RouterTestingModule]
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
