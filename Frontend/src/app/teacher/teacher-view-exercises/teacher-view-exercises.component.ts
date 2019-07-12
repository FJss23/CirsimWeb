import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Network } from 'vis';
import { environment } from 'src/environments/environment';
import { Exercise } from 'src/app/model/exercise';
import { TeacherService } from 'src/app/services/teacher.service';
import { Router } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-teacher-view-exercises',
  templateUrl: './teacher-view-exercises.component.html',
  styleUrls: ['./teacher-view-exercises.component.css']
})
export class TeacherViewExercisesComponent implements OnInit {
  @ViewChild('networkContainer') networkContainer: ElementRef;
  network : Network;
  config: any;

  // exercise information
  title: string;
  exercise: Exercise;
  numeration: string
  
  constructor(private teacherService: TeacherService,
    private router: Router,
    private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.config = environment.configurationVis;
    this.setExerciseToView();
  }

  next(): void {
    this.ngOnInit();
  }

  setExerciseToView() {
    this.exercise = this.teacherService.obtainExerciseView();
    if(this.exercise == null){
      this.router.navigateByUrl('/teacher');
    } else {
      this.setUpNetworkView();
      this.title = this.teacherService.taskToViewValue.title;
      this.numeration = `Ejercicio ${this.exercise.orderEx}/${this.teacherService.totalExercises}`
    }
  }

  setUpNetworkView() {
    // only points are obtained
    let data = {
      nodes: this.exerciseService.obtainPoints(this.exercise),
      edges: this.exerciseService.obtainConnections(this.exercise)
    }
    let options = this.defineOptions();
    this.network = new Network(this.networkContainer.nativeElement, data, options);

    // the zoom/scale appears center at the position of the first node added, 
    // it must be centered at the origin
    this.network.moveTo({
      position: {x: 0, y: 0}
    });

    this.setBackground();
  }

    /**
   * add the fund according to the set configuration
   */
  setBackground(): void {
    if(this.exercise.image && this.exercise.image.imageb64){
      let url = this.exercise.image.imageb64;
      let position = this.exercise.image.position;
      let size = this.exercise.image.size;
      let sourceCanvas = document.querySelector('canvas');
  
      sourceCanvas.style.backgroundImage = `url('${url}')`;
      sourceCanvas.style.backgroundRepeat = "no-repeat";
      sourceCanvas.style.backgroundPosition = position;
      sourceCanvas.style.backgroundSize = size;
    }
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
      initiallyActive: false,
    }
  }
}
}
