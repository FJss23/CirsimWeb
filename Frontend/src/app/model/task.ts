import { Exercise } from './exercise';
import { User } from './user';

export class Task { 
    author: User;
    grade: string;
    name: string;
    openDate: Date;
    exercises: Exercise[];

    constructor(author: User){
        this.author = author;
        this.openDate = new Date();
        this.exercises = [];
    }

    addExercise(exercise: Exercise): void {
        this.exercises.push(exercise);
    }

    setGrade(grade: string): Task {
        this.grade = grade;
        return this;
    }

    setName(name: string): Task {
        this.name = name;
        return this;
    }
}