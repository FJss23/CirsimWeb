import { CorrectionPhase } from './correctionPhase';
import { SolutionPhase } from './solutionPhase';
import { Transition } from './transition';

export class Exercise { 
    grade: string;
    attemps: number;
    correctionPhase: CorrectionPhase;
    solutionPhase: SolutionPhase;
    transitions: Transition[];

    constructor(){
        
    }
}