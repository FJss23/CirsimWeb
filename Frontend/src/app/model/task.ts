import { Exercise } from './exercise';

export class Task { 
    author: string;
    grade: string;
    code: string;
    name: string;
    openDate: Date;
    exercises: Exercise[];

    constructor(author: string, grade: string, code: string, name: string){
        this.author = author;
        this.grade = grade;
        this.code = code;
        this.name = name;
        this.openDate = new Date();
        this.exercises = [];
    }
}