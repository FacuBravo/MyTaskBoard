import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../types/Task';
import { FormTaskEditComponent } from "../form-task-edit/form-task-edit.component";

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormTaskEditComponent],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
  @Output() eventCloseTaskEdit = new EventEmitter()
  @Output() eventSaveTask = new EventEmitter<Task>()
  @Output() eventDeleteTask = new EventEmitter<number>()
  @Input() task: Task | null
  @Input() nextId: number

  closeTaskEdit() {
    this.eventCloseTaskEdit.emit()
  }

  saveTask(nTask: Task) {
    this.eventSaveTask.emit(nTask)
  }

  deleteTask() {
    if (this.task) {
      this.eventDeleteTask.emit(this.task.id)
    }
  }
}
