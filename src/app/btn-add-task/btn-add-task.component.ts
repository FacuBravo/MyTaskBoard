import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-add-task',
  standalone: true,
  imports: [],
  templateUrl: './btn-add-task.component.html',
  styleUrl: './btn-add-task.component.css'
})
export class BtnAddTaskComponent {
  @Output() eventShowTaskEdit = new EventEmitter()

  showTaskEdit() {
    this.eventShowTaskEdit.emit()
  }
}
