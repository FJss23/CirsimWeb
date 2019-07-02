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
    this.sortByOrderEx(this.exercisesToResolved);
    this.numTotalExercises = task.exercises.length;
    this.numCurrentExercise = 0;
  }

  sortByOrderEx(exercises: Exercise[]): void {
    exercises.sort((a, b) => {
      return a.orderEx - b.orderEx;
    });
  }

  getTaskToResolve(): Task {
    return this.taskToResolve;
  }

  obtainExerciseToResolve(): Exercise {
    if(this.exercisesToResolved.length != 0){
      this.numCurrentExercise++;
      return this.exercisesToResolved.shift();
    }
    return null;
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
