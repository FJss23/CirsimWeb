import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/task';
import { Point } from 'src/app/model/point';
import { Network } from 'vis';
import { StudentService } from 'src/app/services/student.service';
import { Connection } from 'src/app/model/connection';
import { Exercise } from 'src/app/model/exercise';
import { environment } from 'src/environments/environment';

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
  canDelete: boolean;
  config: any;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.config = environment.configurationVis;
    this.taskTitle = this.studentService.obtainTaskTitle();
    this.exerciseToResolve = this.studentService.obtainNextExercise();
    this.currentInfoLabel = `Ejercicio ${this.studentService.obtainNumCurrentExercise()}
    /${this.studentService.obtainTotalExercises()}`;
    this.canDelete = false;
    this.setUpNetwork();
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

    this.network.on('select', (properties: any) => {
      console.log(properties);
      if(this.canDelete){
        this.deleteSelected();
      } 
    });
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
    return nodes;
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

  addConnectionMode(): void {
    console.log(`Add connection mode`);
    this.deActivateDelete();
    this.network.addEdgeMode();
  }

  activateDelete(): void {
    this.network.disableEditMode();
    this.canDelete = true;
  }

  deActivateDelete(): void {
    this.canDelete = false;
  }

  deleteSelected(): void {
    this.network.deleteSelected();
    console.log(`Delete mode`);
  }

  checkResponse(): void {
    let connectionsNetwork = this.network.body.data.edges._data;
    let connections: Connection[] = this.exerciseToResolve.connections;
    let founded = connections.length;
    let numStudentPoints = Object.keys(connectionsNetwork).length;
    if(connections.length == numStudentPoints){
      connections.forEach(con => {
        for(let elem in connectionsNetwork){
          let responseTo = connectionsNetwork[elem].to;
          let responseFrom = connectionsNetwork[elem].from;

          if((con.toVisId == responseTo 
            && con.fromVisId == responseFrom) || 
            (con.toVisId == responseFrom)){
              founded--;
              break;
          }
        }
      });
    } 
    if(founded != 0){
      console.log(`tienes errores`);
    }
  }
  

  defineOptions(): any {
    return {
      autoResize: this.config.autoResize,
      height: this.config.height,
      width: this.config.width,
      clickToUse: this.config.clickToUse,
      physics: this.config.physics,
      edges: {
        smooth: this.config.edges.smooth,
        color: {
          inherit: false
        }
      },
      nodes: {
        font: this.config.nodes.font,
      },
      interaction: {
        zoomView: this.config.interaction.zoomView,
        multiselect: this.config.interaction.multiselect,
        dragView: this.config.interaction.dragView,
        dragNodes: false
      },
      manipulation: {
        enabled: this.config.manipulation.enabled,
        initiallyActive: this.config.manipulation.initiallyActive,
        addEdge: (nodeData: any, callback: any) => {  
          nodeData.width = this.config.defaultSizeConnection;
          nodeData.color = { color: this.randomColor() };
          let connections: Connection[] = this.exerciseToResolve.connections;
          connections.forEach(connection => {
            // there is connection and the user has made it from one direction or another
              if((nodeData.from == connection.fromVisId &&
                nodeData.to == connection.toVisId) || 
                (nodeData.to == connection.fromVisId &&
                  nodeData.from == connection.toVisId)){
                  
                  nodeData.color = { color: connection.color};
                  nodeData.width = connection.width;
              }
            }
          );
          callback(nodeData);
          this.network.addEdgeMode();
        },
        deleteEdge: (nodeData: any, callback: any) => {
          if(this.canDelete){
            callback(nodeData);
          }
        },
        deleteNode: (nodeData: any, callback: any) => {
          console.log(`Nothing to delete`);
        },
        editNode: (nodeData: any, callback: any) => {
          console.log(`Nothing to delete`);
        }
      }
    }
  }

  private randomColor(): String {
    return ['#660066', '#000000', '#ff0000',
    '#0000ff', '#daa520','#008000'][Math.random()*6|0];
  }

}
