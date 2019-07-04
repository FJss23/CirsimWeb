import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Point } from 'src/app/model/point';
import { Network } from 'vis';
import { StudentService } from 'src/app/services/student.service';
import { Connection } from 'src/app/model/connection';
import { Exercise } from 'src/app/model/exercise';
import { environment } from 'src/environments/environment';
import { MatDialog, MatButtonToggle } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-resolve-exercise',
  templateUrl: './student-resolve-exercise.component.html',
  styleUrls: ['./student-resolve-exercise.component.css']
})
export class StudentResolveExerciseComponent implements OnInit {
  @ViewChild('networkContainer') networkContainer: ElementRef;
  network : Network;
  config: any;

  // editor buttons
  @ViewChild('connection') btnConnection: MatButtonToggle;
  @ViewChild('delete') btnDelete: MatButtonToggle;

  // exercise infromation
  taskTitle: string;
  exerciseToResolve: Exercise;
  currentInfoLabel: string;

  // button config
  canDelete: boolean;
  canContinue: boolean;

  constructor(private studentService: StudentService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.config = environment.configurationVis;
    this.canContinue = false;
    this.taskTitle = this.studentService.obtainTaskTitle();
    this.setExerciseToResolve();
    this.currentInfoLabel = `Ejercicio ${this.studentService.obtainNumCurrentExercise()}
    /${this.studentService.obtainTotalExercises()}`;

    // loses the focus of the buttons, passing from one exercise to another
    this.loseFocus();
  }

  /**
   * get the exercise to solve, in case there is no redirect left to the main page
   */
  setExerciseToResolve() {
    this.exerciseToResolve = this.studentService.obtainExerciseToResolve();
    if(this.exerciseToResolve == null){
      this.router.navigateByUrl('/student');
    } else {
      this.canDelete = false;
      this.setUpNetwork();
    }
  }

  /**
   * initializes the network with a series of options and starting data. 
   * Includes vis.js events for the selection of a point or connection
   */
  setUpNetwork(): void  {
    // only points are obtained
    let data = {
      nodes: this.obtainData(),
      edges: []
    }
    let options = this.defineOptions();
    this.network = new Network(this.networkContainer.nativeElement, data, options);

    // the zoom/scale appears center at the position of the first node added, 
    // it must be centered at the origin
    this.network.moveTo({
      position: {x: 0, y: 0}
    });

    this.setBackground();

    // event that jumps when a point or connection is selected, if the delete 
    // button is active it will erase the selection
    this.network.on('select', (properties: any) => {
      if(this.canDelete){
        this.deleteSelected();
      } 
    });
  }

  /**
   * get the information of the points
   */
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

  /**
   * add the fund according to the set configuration
   */
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

  /**
   * activate the add connections mode
   */
  addConnectionMode(): void {
    this.deActivateDelete();
    this.network.addEdgeMode();
  }

  /**
   * allows you to activate the delete selection mode
   */
  activateDelete(): void {
    this.network.disableEditMode();
    this.canDelete = true;
  }

  /**
   * activate the delete selection mode
   */
  deleteSelected(): void {
    this.network.deleteSelected();
  }

  /**
   * check the connection made by the student with the correct
   */
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
            (con.toVisId == responseFrom &&
              con.fromVisId == responseTo)){
              founded--;
              break;
          }
        }
      });
    } 
    if(founded != 0){
      this.canContinue = false
    } else {
      this.canContinue = true
    }
    this.openDialog();
  }
  
  /**
   * opens the confirmation dialog that allows you to continue or 
   * continue with the following exercises
   */
  openDialog(): void {
    let messageDialog =  [`Se han encontrado errores en el ejercicio, ¿deseas continuar intentándolo?`, 
    `Has resuelto el ejercicio correctamente`];
    let titleDialog = [`¡Errores en el ejercicio!`, `¡Muy bien!`];

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '200px',
      data: {
        messageDialog: messageDialog[this.canContinue ? 1: 0],
        titleDialog: titleDialog[this.canContinue ? 1: 0],
        canContinue: this.canContinue
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'NEXT'){
        this.ngOnInit();
      }
   })
  }

  /**
  * global network options
  */
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
        // it activates the add connections and in case of being a correct connection, 
        // it controls that the color is the same as that of the solution
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
          // not applicable
        },
        editNode: (nodeData: any, callback: any) => {
          // not applicable
        }
      }
    }
  }

  /**
  * loses the focus of the buttons
  */
  loseFocus() {
    this.btnDelete.checked = false;
    this.btnConnection.checked = false;
  }

  randomColor(): String {
    return ['#660066', '#000000', '#ff0000',
    '#0000ff', '#daa520','#008000'][Math.random()*6|0];
  }

  deActivateDelete(): void {
    this.canDelete = false;
  }

}
