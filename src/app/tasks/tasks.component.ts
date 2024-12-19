import { Component } from '@angular/core';
import { BtnAddTaskComponent } from "../btn-add-task/btn-add-task.component";
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { Task } from '../types/Task';
import { TaskComponent } from "../task/task.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [BtnAddTaskComponent, TaskEditComponent, TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  showTaskedit = false
  currentTask: Task | null
  nextId: number = 4

  tasks: Task[] = [
    {
      id: 1,
      name: 'Task in Progress',
      icon: 'time_⏰',
      status: 'progress'
    },
    {
      id: 2,
      name: 'Task Completed',
      icon: 'strongWork_🏋️‍♀️',
      status: 'done'
    },
    {
      id: 3,
      name: `Task Won't Do`,
      icon: 'break_☕',
      status: 'wontDo'
    }
  ]

  showTaskEdit(task?: Task) {
    this.currentTask = task || null
    this.showTaskedit = true
  }

  closeTaskEdit() {
    this.showTaskedit = false
    this.currentTask = null
  }

  saveTask(task: Task) {
    const index = this.tasks.findIndex(e => e.id == task.id)
    
    if (index != -1) {
      this.tasks[index] = task
    } else {
      this.nextId = task.id + 1
      this.tasks.push(task)
    }
  }
}
