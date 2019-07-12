import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Exercise } from '../model/exercise';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private taskCreatedSubject: BehaviorSubject<Task>;
  taskCreated: Observable<Task>;

  exerciseToEditSubject: BehaviorSubject<Exercise>;
  exerciseToEdit: Observable<Exercise>;

  private taskToViewSubject: BehaviorSubject<Task>;
  taskToView: Observable<Task>;

  exercisesToView: Exercise[];
  totalExercises: number;
  orderExercises: number;

  editingCurrentTask: boolean = false;

  constructor(private exerciseService: ExerciseService) { 
  }

  public get taskCreatedValue(){
    return this.taskCreatedSubject.value;
  }

  initTask(task: Task): void {
    this.taskCreatedSubject = new BehaviorSubject<Task>(task);
    this.taskCreated = this.taskCreatedSubject.asObservable();
  }

  addExerciseCurrentTask(exercise: Exercise): void {
    if(!this.taskCreated){
      this.restartOrderExercise();
    }
    this.taskCreatedValue.exercises.push(exercise.setOrder(this.taskCreatedValue.exercises.length + 1));
  }

  restartOrderExercise(): void {
    this.orderExercises = 0;
  }

  getCurrentTask(): Task {
    return this.taskCreatedValue;
  }

  getExercisesOfCurrentTask(): Exercise[] {
    return this.taskCreatedValue.exercises;
  }

  setExerciseToEdit(exercise: Exercise) {
    this.exerciseToEditSubject = new BehaviorSubject<Exercise>(exercise);
    this.exerciseToEdit = this.exerciseToEditSubject.asObservable();
  }

  applyEditionExercise(exercise: Exercise): void {
    let position = -1;
    this.taskCreatedValue.exercises.forEach((exe, index) => {
      if(exe.id === exercise.id){
        position = index;
      }
    })

    if(position != -1){
      this.taskCreatedValue.exercises[position] = exercise;
    }
    this.setExerciseToEdit(null);
  }

  public get exerciseToEditValue() {
    let value = this.exerciseToEditSubject
    return  value? value.value: null;
  }

  public get taskToViewValue() {
    let value = this.taskToViewSubject;
    return  value? value.value: null;
  }

  viewTask(task: Task): void {
    this.taskToViewSubject = new BehaviorSubject<Task>(task);
    this.taskToView = this.taskToViewSubject.asObservable();
    this.exercisesToView = this.exerciseService.sortByOrderEx(task.exercises);
    this.totalExercises = task.exercises.length;
  }

  obtainExerciseView(): Exercise {
    if(this.exercisesToView.length != 0){
      return this.exercisesToView.shift();
    }
    return null;
  }

  changeOpenDate(date: Date): void {
    this.taskCreatedValue.openDate = date;
  }

  editingTask(edit: boolean) {
    this.editingCurrentTask = edit;
  }
}
