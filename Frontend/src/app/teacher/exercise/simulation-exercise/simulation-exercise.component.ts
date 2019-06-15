import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    this.visibleStepOne = true;
    this.visibleStepTwo = false;
    this.visibleStepThree = false;
    this.numInputForImage = [];
    let data = { };
    let options = this.defineOptions();
    this.network = new Network(this.networkContainer.nativeElement, data, options);
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
    this.setBackgroundImage();
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

  setBackgroundImage(): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundImage = `url('${this.url}')`;
    sourceCanvas.style.backgroundRepeat = "no-repeat";
    sourceCanvas.style.backgroundSize = "contain";
    sourceCanvas.style.backgroundPosition = "center";
    console.log('Setting the background');
  }

  addPointMode(): void {
    console.log(`Add node mode`);
   this.network.addNodeMode();
  } 

  addConnectionMode(): void {
    console.log(`Add edge mode`);
    this.network.addEdgeMode();
  }

  private defineOptions(): any {
    return {
      autoResize: true,
      height: '800px',
      width: '800px',
      locale: 'en',
      clickToUse: true,
      physics:{
        enabled: false,
      },
      edges: {
        smooth: {
          enabled: false,
          type: "dynamic",
          roundness: 0.5
        }, 
        color: {
          color: '#FF0000'
        }   
      },
      interaction: {
        zoomView: false
      },
      manipulation: {
        enabled: true,
        initiallyActive: true,
        addNode: (nodeData: any, callback: any) => {
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
