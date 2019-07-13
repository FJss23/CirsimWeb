import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Network } from 'vis';
import { Exercise } from 'src/app/model/exercise';
import { Point } from 'src/app/model/point';
import { Connection } from '../../model/connection';
import { Image } from '../../model/image';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/model/errors/myErrorStateMatcher';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ImageInfo } from 'src/app/model/global/imageInfo';

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
  imageUrl: any;

  // exercise configuration
  public selectedPositionImage: string;
  public selectedSizeImage: string;
  color: string;
  valueNamePoint: string;
  valueSizePoint: number;
  valueSizeConnection: number;

  // information to select
  sizeImage: ImageInfo[];
  imageInfo: ImageInfo[];


  // button config
  @ViewChild('documentEditForm') documentEditForm: FormGroupDirective; 
  canDelete: boolean;
  activeSelectionMode: boolean;
  exerciseForm: FormGroup;
  matcher: MyErrorStateMatcher;

  exerciseToEdit: Exercise;

  constructor(private teacherService: TeacherService,
    private router: Router,
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseForm  =  this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.matcher = new MyErrorStateMatcher();
    this.config = environment.configurationVis;
    this.imageInfo = [
      { name:'left top', nameSig: 'izquierda arriba', position: 1 },
      { name:'left center', nameSig: 'izquierda centro', position: 2 },
      { name:'left bottom', nameSig: 'izquierda abajo', position: 3 },
      { name:'right top', nameSig: 'derecha arriba', position: 4 },
      { name:'right center', nameSig: 'derecha centro', position: 5 },
      { name:'right bottom', nameSig:  'derecha abajo', position: 6 },
      { name:'center top', nameSig: 'centro arriba', position: 7 },
      { name:'center center', nameSig: 'centro centro', position: 8 },
      { name:'center bottom', nameSig: 'centro abajo', position: 9 },
    ]
    this.sizeImage = [
      { name:'auto', nameSig: 'tamaño original', position: 1 },
      { name:'contain', nameSig: 'ajustado al lienzo', position: 2 },
    ];
    this.canDelete = false;
    this.activeSelectionMode = false;
    this.valueNamePoint = this.config.defaultValueName;
    this.valueSizePoint = this.config.defaultSizePoint;
    this.valueSizeConnection = this.config.defaultSizeConnection;
    this.color = this.config.defaultColor;
    this.exerciseToEdit = this.teacherService.exerciseToEditValue;

    if(this.exerciseToEdit){
      this.setUpEditExercise();
    } else {
      this.setUpNewExercise();
    }
  }

  ngAfterViewInit(){
    if(this.exerciseToEdit && this.exerciseToEdit.image && this.exerciseToEdit.image.imageb64){
      let image = this.exerciseToEdit.image;
      this.setBackgroundImage(image.imageb64, image.position, image.size);
    } 
  }

  setUpNewExercise(): void {
    this.setUpNetwork();
  }

  setUpEditExercise(): void {
    this.setUpNetwork(this.setUpExercise(this.exerciseToEdit))
    if(this.exerciseToEdit.image != null){
      this.selectedPositionImage = this.exerciseToEdit.image.position;
      console.log(this.selectedPositionImage);
      this.selectedSizeImage =  this.exerciseToEdit.image.size;
      this.imageUrl = this.exerciseToEdit.image.imageb64;
    }
    this.selectionMode();
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
  setUpNetwork(editData?: any): void  {
    let data = (editData) ? editData : {};
    let options = this.defineOptions();
    console.log('data to import');
    console.log(data);
    this.network = new Network(this.networkContainer.nativeElement, data, options);

    // event that jumps when a point or connection is selected, if the delete 
    // button is active it will erase the selection
    this.network.on('select', (properties: any) => {
      if(this.canDelete){
        this.deleteSelected();
      } 
      if(!this.activeSelectionMode){
        this.network.unselectAll();
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

    this.network.on('dragEnd', (properties: any) => {
      if(this.activeSelectionMode){
        console.log('active dragend')
        let points: Point [] = this.getPoints()
        for(let elem in properties.nodes){
          points.forEach(point => {
            if(properties.nodes[elem] == point.visId){
              this.network.body.data.nodes.update({
                id: point.visId, 
                color: point.color,
                label: point.label,
                size: point.size,
                x: properties.pointer.canvas.x,
                y: properties.pointer.canvas.y
              });
            }
          });
        }
      }
    });

    // the zoom/scale appears center at the position of the first node added, 
    // it must be centered at the origin
    this.network.moveTo({
      position: {x: 0, y: 0}
    });
  }

  /**
   * place the selected image as a background
   */
  setBackgroundImage(image?: string, pos?: string, size?: string): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundImage = `url('${(image) ? image : this.imageUrl}')`;
    sourceCanvas.style.backgroundRepeat = "no-repeat";
    sourceCanvas.style.backgroundPosition =  (pos) ? pos : this.imageInfo[0].name;
    sourceCanvas.style.backgroundSize = (size) ? size : this.sizeImage[0].name;
    this.selectedPositionImage = 'left top';
    this.selectedSizeImage = 'auto';
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
    if(this.exerciseForm.invalid){
      this.exerciseForm.get('title').markAsTouched();
      this.exerciseForm.get('description').markAsTouched();
      return
    }
    let points = this.getPoints();
    let connections = this.getConnections();
    let image = this.getImage();
    let title = this.exerciseForm.value.title;
    let description = this.exerciseForm.value.description;

    console.log(points)

    if(this.exerciseToEdit){
      this.exerciseToEdit.points = points;
      this.exerciseToEdit.connections = connections;
      this.exerciseToEdit.image = image;
      this.exerciseToEdit.title = title;
      this.exerciseToEdit.description = description;
      this.teacherService.applyEditionExercise(this.exerciseToEdit);
    } else {
      let exercise = new Exercise(title, description,
        connections, points, image);
      this.teacherService.addExerciseCurrentTask(exercise);
    }
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
    let pointsPriority = false;
    let points = this.network.getSelectedNodes();
    let connections = this.network.getSelectedEdges();
    
    if(points.length > 0 && connections.length > 0){
      pointsPriority = true
    }

    for(let point in points){
      let pointInfo = points[point];

      this.network.body.data.nodes.update({
        id: pointInfo, 
        color: this.color,
        label:this.valueNamePoint,
        size: this.valueSizePoint
      });
    }

    if(!pointsPriority){
      for(let connection in connections){
        let conInfo = connections[connection];
        this.network.body.data.edges.update({
          id: conInfo, 
          color: { color: this.color },
          width: this.valueSizeConnection
        });
      }
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
  private defineOptions(dragNodes?: boolean): any {
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
              if(this.network.getSelectedNodes().length == 0){
                values.color = '#5d8dc7';
              }
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
        dragNodes: (dragNodes != null)?dragNodes:true
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
    this.network.setOptions(this.defineOptions(true));
  }

  deActivateEdit(): void {
    this.activeSelectionMode = false;
    this.network.setOptions(this.defineOptions(false));
    this.network.unselectAll();
  }

  setUpExercise(exerciseEdit: Exercise): any {
    let data = { 
      nodes: this.exerciseService.obtainPoints(exerciseEdit),
      edges: this.exerciseService.obtainConnections(exerciseEdit),
    }
    this.exerciseForm.get('title').setValue(exerciseEdit.title);
    this.exerciseForm.get('description').setValue(exerciseEdit.description);
    return data;
  }
}
