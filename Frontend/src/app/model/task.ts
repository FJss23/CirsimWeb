import { Exercise } from './exercise';

export class Task { 
    id: number;
    title: string;
    openDate: Date;
    exercises: Exercise[];
    description: string;

    constructor(){
        this.openDate = new Date();
        this.exercises = [];
    }

    setTitle(name: string): Task {
        this.title = name;
        return this;
    }
    
}