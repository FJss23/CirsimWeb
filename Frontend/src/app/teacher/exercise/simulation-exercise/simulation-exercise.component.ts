import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Network } from 'vis';

@Component({
  selector: 'app-simulation-exercise',
  templateUrl: './simulation-exercise.component.html',
  styleUrls: ['./simulation-exercise.component.css']
})
export class SimulationExerciseComponent implements OnInit {

  @ViewChild('networkContainer') networkContainer: ElementRef;
  public visibleStepOne: boolean;
  public visibleStepTwo: boolean;
  public visibleStepThree: boolean;
  public imagePath: string;
  public url: any;
  public network : Network;
  public numInputForImage: string[];
  public numSelectedLayout: number;
  public valueName: string;
  public valueSizePoint: number;
  public valueSizeConnection: number;
  public positionsImage: string[];
  public sizeImage: string[];
  public color: string;
  public canDelete: boolean;
  public defualtPosition: string;
  public defaultSize: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.visibleStepOne = true;
    this.visibleStepTwo = false;
    this.visibleStepThree = false;
    this.numInputForImage = [];
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
  }

  onSelectFile(event: any): void { 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => { 
        this.url = reader.result; 
        console.log(typeof(this.url));
      }
    }
  }

  nextStepTwo(): void {
    this.visibleStepOne = false;
    this.visibleStepTwo = true;
    this.numInputForImage = [];
    for(var i = 1; i <= this.numSelectedLayout; i++){
      this.numInputForImage.push(`Imagen layout ${i}`);
    }
  }

  nextStepThree(): void {
    this.visibleStepTwo = false;
    this.visibleStepThree = true;

    setTimeout(() => {
      this.setUpNetwork();
    }, 100);
  }

  backStepOne(): void {
    this.visibleStepOne = true;
    this.visibleStepTwo = false;
  }

  backStepTwo(): void {
    this.visibleStepTwo = true;
    this.visibleStepThree = false;
  }

  exerciseDone(): void {
    console.log(`Saving the exercise`);
  }

  setUpNetwork(): void  {
    let data = { };
    let options = this.defineOptions();
    this.network = new Network(this.networkContainer.nativeElement, data, options);
    this.setBackgroundImage();
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
    this.network.addEdgeMode();
  }

  deleteSelected(): void {
    this.network.deleteSelected();
    console.log(`Delete mode`);
  }

  selectionMode(): void {
    console.log(`Selection mode`);
    this.network.enableEditMode();
  }

  toggleChange(event: any):void  {
    let toggle = event.source;
    if(toggle){
      console.log(toggle);
      if(this.canDelete) {
        this.deleteSelected();
        this.canDelete = false;
        toggle.checked = false;
        toggle.disabled = true;
      }
    }
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
            this.canDelete = true;
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
            this.canDelete = true;
          }
        }
      },
      interaction: {
        zoomView: false,
        multiselect: true,
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
          callback(nodeData);
        },
        deleteEdge: (nodeData: any, callback: any) => {
          callback(nodeData);
        },
      }  
    }
  }

}
