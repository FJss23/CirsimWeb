import { Exercise } from './exercise';

export class Task { 
    author: string;
    grade: string;
    code: string;
    name: string;
    numExercise: number;
    openDate: Date;
    closeDate: Date;
    state: string;
    mark: number;
    complete: number;
    exercises: Exercise[];

    constructor(author: string, grade: string, code: string, name: string, openDate: Date, 
        closeDate: Date, state: string){

        this.author = author;
        this.grade = grade;
        this.code = code;
        this.name = name;
        this.numExercise = 0;
        this.openDate = openDate;
        this.closeDate = closeDate;
        this.state = state;
        this.mark = 0;
        this.complete = 0;
        this.exercises = [];
    }

    setMark(mark: number): void {
        this.mark = mark;
    }
    
    setComplete(complete: number): void {
        this.complete = complete;
    }

    setExercises(exercises: Exercise[]): void {
        if(exercises != null){
            this.exercises = exercises;
            this.numExercise = exercises.length;
        }
    }

    addExercise(exercise: Exercise): void {
        this.exercises.push(exercise);
        this.numExercise++;
    }
}