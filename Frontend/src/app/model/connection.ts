import { Point } from './point';

export interface Connection {
    visId: string;
    from: Point;
    to: Point;
    width: number;
}