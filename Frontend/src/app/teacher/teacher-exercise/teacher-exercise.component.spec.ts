import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExerciseComponent } from './teacher-exercise.component';
import { SharedModule } from 'src/app/model/modules/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TeacherEditorExplanationComponent } from '../teacher-editor-explanation/teacher-editor-explanation.component';

describe('TeacherExerciseComponent', () => {
  let component: TeacherExerciseComponent;
  let fixture: ComponentFixture<TeacherExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExerciseComponent, TeacherEditorExplanationComponent ],
      imports: [SharedModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
