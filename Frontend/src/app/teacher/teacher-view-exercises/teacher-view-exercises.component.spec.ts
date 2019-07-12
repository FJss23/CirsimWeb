import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewExercisesComponent } from './teacher-view-exercises.component';

describe('TeacherViewExercisesComponent', () => {
  let component: TeacherViewExercisesComponent;
  let fixture: ComponentFixture<TeacherViewExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherViewExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherViewExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
