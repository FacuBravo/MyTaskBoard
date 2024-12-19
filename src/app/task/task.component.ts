import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../types/Task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task: Task
  @Output() eventEditTask = new EventEmitter<Task>()

  editTask() {
    this.eventEditTask.emit(this.task)
  }
}
