import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-new-task',
  templateUrl: './teacher-new-task.component.html',
  styleUrls: ['./teacher-new-task.component.css']
})
export class TeacherNewTaskComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router) 
  { }

  ngOnInit() {
    
  }

  addTask(): void {
    this.taskService.getCurrentTask().setName('Tarea de prueba')
    .setDescription('Descripción de la tarea de prueba');
    this.taskService.addTask().subscribe(() => {
        console.log(`New task Added`);
        this.router.navigateByUrl('/teacher');
      }
    );
  }
}
