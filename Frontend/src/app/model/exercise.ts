import { Point } from './point';
import { Connection } from './connection';
import { Image } from './image';

export class Exercise { 
    title: string;
    description: string;
    connections: Connection[];
    points: Point[];
    image: Image;
    orderEx: number;

    constructor(title: string, description: string,
        connections: Connection[], points: Point[], image: Image){
        
        this.title = title;
        this.description = description;
        this.connections = connections;
        this.points = points;
        this.image = image;
    }

    setOrder(order: number): Exercise {
        this.orderEx = order;
        return this;
    }
}