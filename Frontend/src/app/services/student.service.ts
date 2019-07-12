import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Exercise } from '../model/exercise';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private taskToResolveSubject: BehaviorSubject<Task>;
  taskToResolve: Observable<Task>;
  
  exercisesToResolved: Exercise[];
  numCurrentExercise: number;
  numTotalExercises: number;

  constructor(private exerciseService: ExerciseService) { }

  setTaskToResolve(task: Task): void {
    this.taskToResolveSubject = new BehaviorSubject<Task>(task);
    this.taskToResolve = this.taskToResolveSubject.asObservable();
    this.exercisesToResolved = task.exercises;
    this.exerciseService.sortByOrderEx(this.exercisesToResolved);
    this.numTotalExercises = task.exercises.length;
    this.numCurrentExercise = 0;
  }

  public get taskToResolveValue() {
    return this.taskToResolveSubject.value;
  }

  obtainExerciseToResolve(): Exercise {
    if(this.exercisesToResolved.length != 0){
      this.numCurrentExercise++;
      return this.exercisesToResolved.shift();
    }
    return null;
  }

  obtainNumCurrentExercise(): number {
    return this.numCurrentExercise;
  }

  obtainTotalExercises(): number {
    return this.numTotalExercises;
  }

}
