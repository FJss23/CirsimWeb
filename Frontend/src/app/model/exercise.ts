import { Point } from './point';
import { Connection } from './connection';
import { Image } from './image';

export class Exercise { 
    title: string;
    description: string;
    points: Point;
    connections: Connection;
    image: Image;

    constructor(title: string, description: string, points: Point,
        connections: Connection, image: Image){
        
        this.title = title;
        this.description = description;
        this.points = points;
        this.connections = connections;
        this.image = image;
    }
}