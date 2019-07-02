import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  taskCreated: Task;
  orderExercises: number;

  constructor() { 
    this.restartOrderExercise();
  }

  initTask(task: Task): void {
    this.taskCreated = task;
    this.restartOrderExercise();
  }

  addExerciseCurrentTask(exercise: Exercise): void {
    if(!this.taskCreated){
      this.taskCreated = new Task();
      this.restartOrderExercise();
    }
    this.taskCreated.addExercise(exercise.setOrder(this.orderExercises++));
  }

  restartOrderExercise(): void {
    this.orderExercises = 0;
  }

  getCurrentTask(): Task {
    return this.taskCreated;
  }

  getExercisesOfCurrentTask(): Exercise[] {
    return this.taskCreated.exercises;
  }
}
