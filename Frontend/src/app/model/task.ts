import { Exercise } from './exercise';

export class Task { 
    name: string;
    openDate: Date;
    exercises: Exercise[];
    description: string;

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
    
    setDescription(description: string): Task {
        this.description = description;
        return this;
    }
}