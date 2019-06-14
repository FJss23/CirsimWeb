import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Network } from 'vis';

@Component({
  selector: 'app-simulation-exercise',
  templateUrl: './simulation-exercise.component.html',
  styleUrls: ['./simulation-exercise.component.css']
})
export class SimulationExerciseComponent implements OnInit {
  @ViewChild('networkContainer') networkContainer: ElementRef;
  public imagePath: string;
  public url: any;
  public network : Network;
  public numInputForImage: string[] = [];
  public numSelectedLayout: number;

  constructor() { }

  ngOnInit() {
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
        this.setBackgroundImage();
      }
    }
  }

  makeInputs(): void {
    this.numInputForImage = [];
    for(var i = 1; i <= this.numSelectedLayout; i++){
      this.numInputForImage.push(`Imagen layout ${i}`);
    }
  }

  setBackgroundImage(): void {
    let sourceCanvas = document.querySelector('canvas');
    sourceCanvas.style.backgroundImage = `url('${this.url}')`;
    sourceCanvas.style.backgroundRepeat = "no-repeat";
    sourceCanvas.style.backgroundSize = "contain";
    sourceCanvas.style.backgroundPosition = "center";
    console.log('Setting the background');
  }

  addNode(): void {
    console.log(`Add node mode`);
   this.network.addNodeMode();
  } 

  addEdge(): void {
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
        }    
      },
      interaction: {
        zoomView: false,
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
