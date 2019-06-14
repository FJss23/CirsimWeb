import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationExerciseComponent } from './simulation-exercise.component';

describe('SimulationExerciseComponent', () => {
  let component: SimulationExerciseComponent;
  let fixture: ComponentFixture<SimulationExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
