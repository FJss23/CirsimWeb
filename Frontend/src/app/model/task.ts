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

    addExercise(exercise: Exercise): void {
        this.exercises.push(exercise);
    }

    removeExercise(exercise: Exercise): void {
        this.exercises.forEach( (item, index) => {
            if(item === exercise) { 
                this.exercises.splice(index,1);
            }
        });
    }

    setTitle(name: string): Task {
        this.title = name;
        return this;
    }
    
}