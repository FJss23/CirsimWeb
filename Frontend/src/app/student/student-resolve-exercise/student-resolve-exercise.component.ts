import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/task';
import { Point } from 'src/app/model/point';
import { Network } from 'vis';
import { StudentService } from 'src/app/services/student.service';
import { Connection } from 'src/app/model/connection';
import { Exercise } from 'src/app/model/exercise';

@Component({
  selector: 'app-student-resolve-exercise',
  templateUrl: './student-resolve-exercise.component.html',
  styleUrls: ['./student-resolve-exercise.component.css']
})
export class StudentResolveExerciseComponent implements OnInit {
  @ViewChild('networkContainer') networkContainer: ElementRef;
  taskTitle: string;
  exerciseToResolve: Exercise;
  currentInfoLabel: string;
  public network : Network;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.taskTitle = this.studentService.obtainTaskTitle();
    this.exerciseToResolve = this.studentService.obtainNextExercise();
    this.currentInfoLabel = `Ejercicio ${this.studentService.obtainNumCurrentExercise()}
    /${this.studentService.obtainTotalExercises()}`;
    this.setUpNetwork();
    console.log(`Escala: ${this.network.getScale()} Zoom:`);
    console.log(this.network.getViewPosition());
  }

  setUpNetwork(): void  {
    let data = {
      nodes: this.obtainData(),
      edges: []
    }
    let options = this.defineOptions();
    this.network = new Network(this.networkContainer.nativeElement, data, options);
    this.network.moveTo({
      position: {x: 0, y: 0}
    });
    this.setBackground();
  }

  obtainData(): any {
    let points: Point[] = this.exerciseToResolve.points;
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
    console.log(nodes);
    return nodes;
    /* let connections: Connection[] = this.obtaintConnections();
    return {
      "nodes":[
      {"id":"1", "label":"Node 1"}
      ,{"id":"2", "label":"Node 2\nline 2"}
      ,{"id":"3", "label":"Node 3"}
      ,{"id":"4", "label":"Node 4"}
      ,{"id":"5", "label":"Node 5"}
    ],
    "edges":[
      {"from":"1", "to":"2", "label":"apples"}
      ,{"from":"1", "to":"3", "label":"bananas"}
      ,{"from":"2", "to":"4", "label":"cherries"}
      ,{"from":"2", "to":"5", "label":"dates"}
      ,{"from":"2", "to":"3", "label":"EAGLES!", "color":{"color":"green", "highlight":"blue"}, "arrows":{"to":{"scaleFactor":"1.25", "type":"circle"}}}
    ]
    } */
  }

  setBackground(): void {
    let url = this.exerciseToResolve.image.imageb64;
    let position = this.exerciseToResolve.image.position;
    let size = this.exerciseToResolve.image.size;
    let sourceCanvas = document.querySelector('canvas');

    sourceCanvas.style.backgroundImage = `url('${url}')`;
    sourceCanvas.style.backgroundRepeat = "no-repeat";
    sourceCanvas.style.backgroundPosition = position;
    sourceCanvas.style.backgroundSize = size;
  }

  defineOptions(): any {
    return {
      autoResize: true,
      height: "650px",
      width: "600px",
      clickToUse: true,
      physics:{
        enabled: false,
      },
      edges: {
        smooth: {
          type: "cubicBezier",
          forceDirection: "none",
          roundness: 1
        }
      },
      nodes: {
        font: {
          strokeWidth: 6, 
          strokeColor: '#ffffff'
        }
      },
      interaction: {
        zoomView: false,
        multiselect: true,
        dragView: false
      },
      manipulation: {
        enabled: false,
        initiallyActive: true,  
      }
    }
  }

}
