import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEditorExplanationComponent } from './teacher-editor-explanation.component';

describe('TeacherEditorExplanationComponent', () => {
  let component: TeacherEditorExplanationComponent;
  let fixture: ComponentFixture<TeacherEditorExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEditorExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEditorExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
