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
    mark?: number;
    complete?: number;
    exercises?: Exercise[];

    constructor(author: string, grade: string, code: string, name: string, openDate: Date, 
        closeDate: Date, state: string, mark?: number, complete?: number, exercises?: Exercise[]){

        this.author = author;
        this.grade = grade;
        this.code = code;
        this.name = name;
        this.openDate = openDate;
        this.closeDate = closeDate;
        this.state = state;
        this.mark = mark;
        this.complete = complete;
        this.exercises = exercises;
    }
    
}