import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../types/Task';
import { FormTaskEditComponent } from "../form-task-edit/form-task-edit.component";
import { Board } from '../types/Board';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormTaskEditComponent],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
  @Output() eventCloseTaskEdit = new EventEmitter()
  @Input() task: Task | null
  @Input() board: Board

  closeTaskEdit() {
    this.eventCloseTaskEdit.emit()
  }
}
