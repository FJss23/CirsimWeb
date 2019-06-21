import { Exercise } from './exercise';
import { User } from './user';

export class Task { 
    name: string;
    openDate: Date;
    exercises: Exercise[];

    constructor(){
        this.openDate = new Date();
        this.exercises = [];
    }

    addExercise(exercise: Exercise): void {
        this.exercises.push(exercise);
    }

    setName(name: string): Task {
        this.name = name;
        return this;
    }
}