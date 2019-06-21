import { Point } from './point';
import { Connection } from './connection';
import { Image } from './image';

export class Exercise { 
    title: string;
    description: string;
    connections: Connection[];
    image: Image;

    constructor(title: string, description: string,
        connections: Connection[], image: Image){
        
        this.title = title;
        this.description = description;
        this.connections = connections;
        this.image = image;
    }
}