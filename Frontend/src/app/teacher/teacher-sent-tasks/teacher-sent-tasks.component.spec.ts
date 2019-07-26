import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSentTasksComponent } from './teacher-sent-tasks.component';
import { SharedModule } from 'src/app/model/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TeacherSentTaskComponent', () => {
  let component: TeacherSentTasksComponent;
  let fixture: ComponentFixture<TeacherSentTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSentTasksComponent ],
      imports: [SharedModule, HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
