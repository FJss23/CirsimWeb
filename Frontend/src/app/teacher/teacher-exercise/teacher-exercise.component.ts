import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Network } from 'vis';
import { Exercise } from 'src/app/model/exercise';
import { Point } from 'src/app/model/point';
import { Connection } from '../../model/connection';
import { Image } from '../../model/image';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-exercise',
  templateUrl: './teacher-exercise.component.html',
  styleUrls: ['./teacher-exercise.component.css']
})
export class TeacherExerciseComponent implements OnInit {
  @ViewChild('networkContainer') networkContainer: ElementRef;
  public titleExercise: string;
  public descriptionExercise: string;
  public url: any;
  public network : Network;
  public valueName: string;
  public valueSizePoint: number;
  public valueSizeConnection: number;
  public positionsImage: string[];
  public sizeImage: string[];
  public color: string;
  public canDelete: boolean;
  public activeSelectionMode: boolean;
  public selectedPosition: string;
  public selectedSize: string;
  public canApplyChanges: boolean;
  public canChange: boolean;
  config: any;

  constructor(private teacherService: TeacherService,
    private router: Router) { }

  ngOnInit() {
    this.config = environment.configurationVis;
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
    this.valueName = this.config.defaultValueName;
    this.valueSizePoint = this.config.defaultSizePoint;
    this.valueSizeConnection = this.config.defaultSizeConnection;
    this.color = this.config.defaultColor;
    this.canDelete = false;
    this.activeSelectionMode = false;
    this.canChange = false;

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
      if(this.canDelete){
        this.deleteSelected();
      } 
    });

    this.network.on('selectNode', (properties: any) => {
      /*if(this.activeSelectionMode){
        let points = this.network.body.data.nodes._data;
        let numPointsSelected = Object.keys(properties.nodes).length;
        if(numPointsSelected == 1){
          let node = points[properties.nodes[0]];
          this.network.body.data.nodes.update({
            id: node.id, 
            color: this.color,
            label:this.valueName,
            size: this.valueSizePoint
          });
          this.network.unselectAll();
        }
      }*/

      if(this.activeSelectionMode){
        let points = this.network.body.data.nodes._data;
        let numPointsSelected = Object.keys(properties.nodes).length;
        if(numPointsSelected == 1){
          let node = points[properties.nodes[0]];
          this.valueName = node.label;
        }
      }
    });

    this.network.on('deselectNode', (properties: any) => {
      if(this.activeSelectionMode){
        this.canChange = false;
      }
    });this.network.on('deselectNode', (properties: any) => {
      if(this.activeSelectionMode){
        this.canChange = false;
      }
    });
  }

  setBackgroundImage(): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundImage = `url('${this.url}')`;
    sourceCanvas.style.backgroundRepeat = "no-repeat";
    sourceCanvas.style.backgroundPosition =  this.positionsImage[0];
    sourceCanvas.style.backgroundSize = this.sizeImage[0];
  }

  setPositionBackground(position: string): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundPosition = position;
    this.selectedPosition = position;
  }
  
  setSizeBackground(size: string): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundSize = size;
    this.selectedSize = size;
  }

  addPointMode(): void {
    this.activeSelectionMode = false;
    console.log(`Add point mode`);
    this.network.addNodeMode();
  } 

  addConnectionMode(): void {
    this.activeSelectionMode = false;
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
    this.activeSelectionMode = false;
    this.canDelete = true;
  }

  deActivateDelete(): void {
    this.canDelete = false;
  }

  exerciseDone(): void {
    let points = this.getPoints();
    let exercise = new Exercise(this.titleExercise, this.descriptionExercise,
    this.getConnections(), points, this.getImage());
    this.teacherService.addExerciseCurrentTask(exercise);
    this.router.navigateByUrl('/teacher/task/new');
  }

  goBack(): void {
    this.router.navigateByUrl('/teacher/task/new');
  }

  applyChanges(): void {
    let points = this.network.getSelectedNodes();
    for(let point in points){
      let pointInfo = points[point];

      this.network.body.data.nodes.update({
        id: pointInfo, 
        color: this.color,
        label:this.valueName,
        size: this.valueSizePoint
      });
    }
    let connections = this.network.getSelectedEdges();
    for(let connection in connections){
      let conInfo = connections[connection];
      this.network.body.data.edges.update({
        id: conInfo, 
        color: this.color,
        width: this.valueSizeConnection
      });
    }
  }

  getImage(): Image {
    return new Image(this.url, this.selectedPosition, this.selectedSize);
  }

  private getConnections(): Connection[] {
    let connectionsNetwork = this.network.body.data.edges._data;
    let connections: Connection[] = [];
    for(let elem in connectionsNetwork){
      let connection: Connection = {
        visId: connectionsNetwork[elem].id,
        fromVisId: connectionsNetwork[elem].from,
        toVisId: connectionsNetwork[elem].to,
        width: connectionsNetwork[elem].width,
        color: connectionsNetwork[elem].color.color
      }
      connections.push(connection);
    }
    return connections;
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
    const config = environment.configurationVis;

    return {
      autoResize: config.autoResize,
      height: config.height,
      width: config.width,
      clickToUse: config.clickToUse,
      physics: config.physics,
      edges: {
        smooth: config.edges.smooth,
        chosen: {
          edge: (values: any, id: any, selected: any, hovering: any) => {
            if(this.selectionMode){
              this.color = values.color;
              this.valueSizeConnection = values.width;
              values.color = '#5d8dc7';
            }
          }
        },
        color: {
          inherit: false
        }
      },
      nodes: {
        font: config.nodes.font,
        chosen: {
          node: (values: any, id: any, selected: any, hovering: any) => {
            if(this.selectionMode){
              this.color = values.color;
              this.valueSizePoint = values.size;
              values.color = '#5d8dc7';
            }
          }
        }
      },
      interaction: {
        zoomView: this.config.interaction.zoomView,
        multiselect: this.config.interaction.multiselect,
        dragView: this.config.interaction.dragView,
        dragNodes: true
      },
      manipulation: {
        enabled: config.manipulation.enabled,
        initiallyActive: config.manipulation.initiallyActive,
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
          nodeData.color = { color: this.color };
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
