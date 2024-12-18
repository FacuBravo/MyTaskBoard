import { Component } from '@angular/core';
import { BtnAddTaskComponent } from "../btn-add-task/btn-add-task.component";
import { TaskEditComponent } from '../task-edit/task-edit.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [BtnAddTaskComponent, TaskEditComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  showTaskedit = true

  showTaskEdit() {
    this.showTaskedit = true
  }

  closeTaskEdit() {
    this.showTaskedit = false
  }
}
