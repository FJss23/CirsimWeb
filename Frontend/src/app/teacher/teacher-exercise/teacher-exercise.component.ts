import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Network } from 'vis';
import { TaskService } from 'src/app/services/task.service';
import { Exercise } from 'src/app/model/exercise';
import { Point } from 'src/app/model/point';
import { Connection } from '../../model/connection';
import { Image } from '../../model/image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-exercise',
  templateUrl: './teacher-exercise.component.html',
  styleUrls: ['./teacher-exercise.component.css']
})
export class TeacherExerciseComponent implements OnInit {

  @ViewChild('networkContainer') networkContainer: ElementRef;
  public url: any;
  public network : Network;
  public valueName: string;
  public valueSizePoint: number;
  public valueSizeConnection: number;
  public positionsImage: string[];
  public sizeImage: string[];
  public color: string;
  public canDelete: boolean;
  public defualtPosition: string;
  public defaultSize: string;
  public activeSelectionMode: boolean;

  constructor(private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.positionsImage = [
      'left top',
      'left center',
      'left bottom',
      'right top',
      'right center',
      'right bottom',
      'center top',
      'center center',
      'center bottom',
    ];
    this.sizeImage = [
      "auto",
      "contain"
    ];
    this.valueName = '';
    this.valueSizePoint = 10;
    this.valueSizeConnection = 5;
    this.color = '#000000';
    this.canDelete = false;
    this.defualtPosition = this.positionsImage[0];
    this.defaultSize = this.sizeImage[0];
    this.activeSelectionMode = false;

    this.setUpNetwork();
  }

  onSelectFile(event: any): void { 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => { 
        this.url = reader.result; 
        console.log(this.url);
        this.setBackgroundImage();
      }
    }
  }

  setUpNetwork(): void  {
    let data = { };
    let options = this.defineOptions();
    this.network = new Network(this.networkContainer.nativeElement, data, options);

    this.network.on('select', (properties: any) => {
      console.log(properties);
      if(this.canDelete){
        this.deleteSelected();
      } 
    });
  }

  setBackgroundImage(): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundImage = `url('${this.url}')`;
    sourceCanvas.style.backgroundRepeat = "no-repeat";
  }

  setPositionBackground(position: string): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundPosition = position;
  }
  setSizeBackground(size: string): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundSize = size;
  }

  addPointMode(): void {
    console.log(`Add point mode`);
    this.network.addNodeMode();
  } 

  addConnectionMode(): void {
    console.log(`Add connection mode`);
    this.deActivateDelete();
    this.network.addEdgeMode();
  }

  deleteSelected(): void {
    this.network.deleteSelected();
    console.log(`Delete mode`);
  }

  selectionMode(): void {
    console.log(`Selection mode`);
    this.activeSelectionMode = true;
    this.deActivateDelete();
    this.network.enableEditMode();
  }

  activateDelete(): void {
    this.canDelete = true;
  }

  deActivateDelete(): void {
    this.canDelete = false;
  }

  exerciseDone(): void {
    let title = 'título de prueba';
    let description = 'descripción de prueba para el ejercicio';
    let exercise = new Exercise(title, description,
    this.getConnections(), this.getImage());

    this.taskService.addExerciseCurrentTask(exercise);
    this.router.navigateByUrl('/teacher/task/new');
  }

  getImage(): Image {
    var position = 'center center';
    var size = 'auto';
    return new Image(this.url, position, size);
  }

  private getConnections(): Connection[] {
    let connectionsNetwork = this.network.body.data.edges._data;
    let connections: Connection[] = [];
    for(let elem in connectionsNetwork){
      let connection: Connection = {
        visId: connectionsNetwork[elem].id,
        from: this.getPoint(connectionsNetwork[elem].from),
        to: this.getPoint(connectionsNetwork[elem].to),
        width: connectionsNetwork[elem].width
      }
      connections.push(connection);
    }
    return connections;
  }

  private getPoint(input: any): Point {
    let correctPoint;
    this.getPoints().forEach(point => {
      if(point.visId == input){
        correctPoint = point;
      }
    });
    return correctPoint; 
  }
 
  private getPoints(): Point[] {
    let pointNetwork = this.network.body.data.nodes._data;
    let points: Point[] = [];
    for(let elem in pointNetwork){
      let point: Point = {
        visId: pointNetwork[elem].id,
        positionX: pointNetwork[elem].x,
        positionY: pointNetwork[elem].y,
        label: pointNetwork[elem].label,
        color: pointNetwork[elem].color,
        shape: pointNetwork[elem].shape,
        size: pointNetwork[elem].size
      }
      points.push(point);
    }
    return points;
  } 

  private defineOptions(): any {
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
        },
        chosen: {
          edge: (values: any, id: any, selected: any, hovering: any) => {
            values.color = '#5d8dc7';
          }
        }
      },
      nodes: {
        font: {
          strokeWidth: 6, 
          strokeColor: '#ffffff'
        },
        chosen: {
          node: (values: any, id: any, selected: any, hovering: any) => {
            values.color = '#5d8dc7';
            values.label =  this.valueName;
          }
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
        addNode: (nodeData: any, callback: any) => {
          nodeData.color = this.color;
          nodeData.label = this.valueName;
          nodeData.shape = 'dot';
          nodeData.size = this.valueSizePoint;
          callback(nodeData);
          this.network.addNodeMode();
        },
        addEdge: (nodeData: any, callback: any) => {
          nodeData.width = this.valueSizeConnection;
          callback(nodeData);
          this.network.addEdgeMode();
        },
        deleteNode: (nodeData: any, callback: any) => {
          if(this.canDelete){
            callback(nodeData);
          }
        },
        deleteEdge: (nodeData: any, callback: any) => {
          if(this.canDelete){
            callback(nodeData);
          }
        },
      }  
    }
  }

}
