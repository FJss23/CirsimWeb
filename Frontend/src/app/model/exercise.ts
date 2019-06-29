import { Point } from './point';
import { Connection } from './connection';
import { Image } from './image';

export class Exercise { 
    title: string;
    description: string;
    connections: Connection[];
    points: Point[];
    image: Image;

    constructor(title: string, description: string,
        connections: Connection[], points: Point[], image: Image){
        
        this.title = title;
        this.description = description;
        this.connections = connections;
        this.points = points;
        this.image = image;
    }
}