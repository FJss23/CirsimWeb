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
  network : Network;
  config: any;

  // exercise information
  titleExercise: string;
  descriptionExercise: string;
  imageUrl: any;

  // exercise configuration
  selectedPositionImage: string;
  selectedSizeImage: string;
  color: string;
  valueNamePoint: string;
  valueSizePoint: number;
  valueSizeConnection: number;

  // information to select
  positionsImage: string[];
  sizeImage: string[];

  // button config
  canDelete: boolean;
  activeSelectionMode: boolean;

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
    this.selectedPositionImage = this.positionsImage[0];
    this.sizeImage = [
      "auto",
      "contain"
    ];
    this.selectedSizeImage = this.sizeImage[0];
    this.canDelete = false;
    this.activeSelectionMode = false;
    
    this.valueNamePoint = this.config.defaultValueName;
    this.valueSizePoint = this.config.defaultSizePoint;
    this.valueSizeConnection = this.config.defaultSizeConnection;
    this.color = this.config.defaultColor;

    this.setUpNetwork();
  }

  /**
   * load the selected image by the user to put it in the background
   */
  onSelectFile(event: any): void { 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => { 
        this.imageUrl = reader.result; 
        this.setBackgroundImage();
      }
    }
  }

  /**
   * initializes the network with a series of options and starting data. 
   * Includes vis.js events for the selection of a point or connection
   */
  setUpNetwork(): void  {
    let data = { };
    let options = this.defineOptions();
    this.network = new Network(this.networkContainer.nativeElement, data, options);

    // event that jumps when a point or connection is selected, if the delete 
    // button is active it will erase the selection
    this.network.on('select', (properties: any) => {
      if(this.canDelete){
        this.deleteSelected();
      } 
    });

    // event that jumps when selecting a point, it is used only to add the 
    // name of the point in the corresponding input
    this.network.on('selectNode', (properties: any) => {
      if(this.activeSelectionMode){
        let points = this.network.body.data.nodes._data;
        let numPointsSelected = Object.keys(properties.nodes).length;
        if(numPointsSelected == 1){
          let node = points[properties.nodes[0]];
          this.valueNamePoint = node.label;
        }
      }
    });
  }

  /**
   * place the selected image as a background
   */
  setBackgroundImage(): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundImage = `url('${this.imageUrl}')`;
    sourceCanvas.style.backgroundRepeat = "no-repeat";
    sourceCanvas.style.backgroundPosition =  this.positionsImage[0];
    sourceCanvas.style.backgroundSize = this.sizeImage[0];
  }

  /**
   * place the image in the position that is passed as a parameter, 
   * the options are available by css backgroundPosition
   */
  setPositionBackground(position: string): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundPosition = position;
    this.selectedPositionImage = position;
  }
  
  /**
   *  place the image with the size that is passed as a parameter, 
   *  the options are available by css backgroundSize
   */
  setSizeBackground(size: string): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundSize = size;
    this.selectedSizeImage = size;
  }

  /**
   * activate the add points mode
   */
  addPointMode(): void {
    this.deActivateEdit();
    this.network.addNodeMode();
  } 

  /**
   * activate the add connections mode
   */
  addConnectionMode(): void {
    this.deActivateEdit();
    this.deActivateDelete();
    this.network.addEdgeMode();
  }

   /**
   * activates the erase mode, to later allow deleting the selected element
   */
  activateDelete(): void {
    this.deActivateEdit();
    this.canDelete = true;
  }

 
  deleteSelected(): void {
    this.network.deleteSelected();
  }

  /**
   * activate the edit mode
   */
  selectionMode(): void {
    this.activateEdit();
    this.deActivateDelete();
    this.network.enableEditMode();
  }

  /**
   * create the exercise with the added information and redirect
   */
  exerciseDone(): void {
    let points = this.getPoints();
    let exercise = new Exercise(this.titleExercise, this.descriptionExercise,
    this.getConnections(), points, this.getImage());
    this.teacherService.addExerciseCurrentTask(exercise);
    this.router.navigateByUrl('/teacher/task/new');
  }

  /**
   * redirect to the task creation window
   */
  goBack(): void {
    this.router.navigateByUrl('/teacher/task/new');
  }

  /**
   * called by the "Apply changes" button adds all changes to the selected 
   * point or connection
   */
  applyChanges(): void {
    let points = this.network.getSelectedNodes();
    for(let point in points){
      let pointInfo = points[point];

      this.network.body.data.nodes.update({
        id: pointInfo, 
        color: this.color,
        label:this.valueNamePoint,
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

  /**
   * returns the image created with the added information, 
   * contains the image in Base64
   */
  getImage(): Image {
    return new Image(this.imageUrl, this.selectedPositionImage, this.selectedSizeImage);
  }

  /**
   * get all the connections added in the exercise
   */
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
 
  /**
   * get all the points added in the exercise
   */
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

  /**
   * global network options
   */
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
          // is activated when selecting a connection and adds 
          // the information in the editor options...
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
          // is activated by selecting a point and adds the 
          // information in the editor options
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
        // is activated when you add a point and create it 
        //with the selected options
        addNode: (nodeData: any, callback: any) => {
          nodeData.color = this.color;
          nodeData.label = this.valueNamePoint;
          nodeData.shape = 'dot';
          nodeData.size = this.valueSizePoint;
          callback(nodeData);
          this.network.addNodeMode();
        },
        // is activated when you add a connection and create 
        // it with the selected options
        addEdge: (nodeData: any, callback: any) => {
          nodeData.width = this.valueSizeConnection;
          nodeData.color = { color: this.color };
          callback(nodeData);
          this.network.addEdgeMode();
        },
        // it is activated when a point is deleted, if the erase mode 
        // is not activated, it is not deleted
        deleteNode: (nodeData: any, callback: any) => {
          if(this.canDelete){
            callback(nodeData);
          }
        },
        // it is activated when a connection is deleted, if the erase mode 
        // is not activated, it is not deleted
        deleteEdge: (nodeData: any, callback: any) => {
          if(this.canDelete){
            callback(nodeData);
          }
        },
      }  
    }
  }

  deActivateDelete(): void {
    this.canDelete = false; 
  }

  activateEdit(): void {
    this.activeSelectionMode = true;
  }

  deActivateEdit(): void {
    this.activeSelectionMode = false;
  }

}
