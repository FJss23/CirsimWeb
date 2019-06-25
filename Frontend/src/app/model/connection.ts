import { Point } from './point';

export interface Connection {
    visId: string;
    fromVisId: string;
    toVisId: string;
    width: number;
}