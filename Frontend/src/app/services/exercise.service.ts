import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';
import { Point } from '../model/point';
import { Connection } from '../model/connection';
import { Image } from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor() { }

  obtainPoints(exercise: Exercise): any {
    let points: Point[] = exercise.points;
    let nodes = [];
    points.forEach(point => {
      nodes.push(
        {
          "id": point.visId,
          "x": point.positionX,
          "y": point.positionY,
          "label": point.label,
          "color": point.color,
          "shape": point.shape,
          "size": point.size
        }
      );
    });
    return nodes;
  }

  obtainConnections(exercise: Exercise): any {
    let connections: Connection[] = exercise.connections;
    let edges = [];
    connections.forEach(con => {
      edges.push(
        {
          "id": con.visId,
          "to": con.toVisId,
          "from": con.fromVisId,
          "color": {color: con.color},
          "width": con.width,
        }
      );
    });
    return edges;
  }

  sortByOrderEx(exercises: Exercise[]): Exercise[] {
    exercises.sort((a, b) => {
      return a.orderEx - b.orderEx;
    });

    return exercises;
  }
}
