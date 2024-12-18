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
  @Input() task?: Task

  closeTaskEdit() {
    this.eventCloseTaskEdit.emit()
  }
}