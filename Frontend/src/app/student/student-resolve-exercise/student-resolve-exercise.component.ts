import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/services/task.service';
import { Network } from 'vis';

@Component({
  selector: 'app-student-resolve-exercise',
  templateUrl: './student-resolve-exercise.component.html',
  styleUrls: ['./student-resolve-exercise.component.css']
})
export class StudentResolveExerciseComponent implements OnInit {
  @ViewChild('networkContainer') networkContainer: ElementRef;
  taskToResolve: Task;
  public network : Network;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskToResolve = this.taskService.getTaskToResolveByStudent();
    this.setUpNetwork();
  }

  setUpNetwork(): void  {
    let data = { };
    let options = this.defineOptions();
    this.network = new Network(this.networkContainer.nativeElement, data, options);
  }

  defineOptions(): any {
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
        }
      },
      nodes: {
        font: {
          strokeWidth: 6, 
          strokeColor: '#ffffff'
        }
      },
      interaction: {
        zoomView: false,
        multiselect: true,
        dragView: false
      }  
    }
  }

}
