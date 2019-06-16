import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Network } from 'vis';
import { SimulationDialogComponent } from '../simulation-dialog/simulation-dialog.component';

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
  public connectionColor: string;
  public pointColor: string;
  public value: string;
  public positions: string[];
  public size: string[];
  public pointLabel: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.visibleStepOne = true;
    this.visibleStepTwo = false;
    this.visibleStepThree = false;
    this.numInputForImage = [];
    this.value = '';
    this.positions = [
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
    this.size = [
      "por defecto",
      "ajustado"
    ]
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

  changePointColor(newColor: string): void {
    console.log(`color seleccionado ${newColor}`);
    this.connectionColor = newColor;
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
    console.log(`calling then function`);
    let data = { };
    let options = this.defineOptions();
    this.network = new Network(this.networkContainer.nativeElement, data, options);
    this.setBackgroundImage();
  }

  setBackgroundImage(): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundImage = `url('${this.url}')`;
    sourceCanvas.style.backgroundRepeat = "no-repeat";
    //sourceCanvas.style.backgroundSize = "contain";
    //sourceCanvas.style.backgroundPosition = "center";
    console.log('Setting the background');
  }

  setPositionBackground(): void {

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
     console.log(`Delete mode`);
     this.network.deleteSelected();
  }

  selectionMode(): void {
    console.log(`Selection mode`);
    this.network.editNode();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SimulationDialogComponent, {
      width: '250px',
      data: this.pointLabel
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pointLabel = result;
      console.log(`The dialog was closed ${result}`);
    });
  }

  private defineOptions(): any {
    return {
      autoResize: true,
      height: "600px",
      width: "600px",
      locale: "en",
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
        color: {
          color: '#FF0000'
        },
        chosen: {
          edge: (values:any , id:any , selected:any , hovering:any) => {
            values.color = this.connectionColor;
          } 
        }
      },
      interaction: {
        zoomView: false
      },
      manipulation: {
        enabled: false,
        initiallyActive: true,
        addNode: (nodeData: any, callback: any) => {
          console.log(`Creating a new node`);
          this.openDialog();
          nodeData.label = '';
          callback(nodeData);
          this.network.addNodeMode();
        },
        addEdge: (nodeData: any, callback: any) => {
          nodeData.label = '';
          callback(nodeData);
          this.network.addEdgeMode();
        },
        deleteNode: true,
        deleteEdge: true,
      }  
    }
  }

}
