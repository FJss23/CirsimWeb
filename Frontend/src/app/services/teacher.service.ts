import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  taskCreated: Task;
  
  constructor() { }

  initTask(task: Task): void {
    this.taskCreated = task;
  }

  addExerciseCurrentTask(exercise: Exercise): void {
    if(!this.taskCreated){
      this.taskCreated = new Task();
    }
    this.taskCreated.addExercise(exercise);
  }

  getCurrentTask(): Task {
    return this.taskCreated;
  }

  getExercisesOfCurrentTask(): Exercise[] {
    return this.taskCreated.exercises;
  }
}
