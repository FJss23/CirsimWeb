import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResolveExerciseComponent } from './student-resolve-exercise.component';
import { SharedModule } from 'src/app/model/modules/shared.module';
import { AdminRoutingModule } from 'src/app/admin/admin-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentResolveExerciseComponent', () => {
  let component: StudentResolveExerciseComponent;
  let fixture: ComponentFixture<StudentResolveExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentResolveExerciseComponent ],
      imports: [SharedModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentResolveExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
