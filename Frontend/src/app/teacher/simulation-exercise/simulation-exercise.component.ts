import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulation-exercise',
  templateUrl: './simulation-exercise.component.html',
  styleUrls: ['./simulation-exercise.component.css']
})
export class SimulationExerciseComponent implements OnInit {
  public imagePath: string;
  public url: any;
  public imagesB64: [];

  constructor() { }

  ngOnInit() {
  }

  onSelectFile(event: any): void { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.imagePath = event.target.files;
      console.log(this.imagePath);
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = () => { // called once readAsDataURL is completed
        this.url = reader.result; //add source to image
        console.log(this.url);
      }
    }
  }
  
  addImage(image: any): void{

  }
}
