import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  taskToResolve: Task;
  exercisesToResolved: Exercise[];
  numCurrentExercise: number;
  numTotalExercises: number;

  constructor() { }

  setTaskToResolve(task: Task): void {
    this.taskToResolve = task;
    this.exercisesToResolved = task.exercises;
    this.numTotalExercises = task.exercises.length;
    this.numCurrentExercise = 0;
  }

  getTaskToResolve(): Task {
    return this.taskToResolve;
  }

  obtainNextExercise(): Exercise {
    this.numCurrentExercise++;
    return this.exercisesToResolved.shift();
  }

  obtainCurrentTask(): Task {
    return this.taskToResolve;
  }

  obtainNumCurrentExercise(): number {
    return this.numCurrentExercise;
  }

  obtainTotalExercises(): number {
    return this.numTotalExercises;
  }

  obtainTaskTitle(): string {
    return this.taskToResolve.title;
  }
}
