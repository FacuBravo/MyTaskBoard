import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../types/Task';
import { Board } from '../types/Board';
import { TasksService } from '../Services/tasks.service';

@Component({
  selector: 'app-form-task-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-task-edit.component.html',
  styleUrl: './form-task-edit.component.css'
})
export class FormTaskEditComponent {
  @Input() task: Task | null
  @Input() board: Board
  @Output() eventCloseTaskEdit = new EventEmitter()
  
  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService
  ) { }

  formTask = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    icon: ['', Validators.required],
    status: ['']
  })

  ngOnInit() {
    if (this.task) {
      this.formTask.setValue({
        name: this.task.name,
        description: this.task.description || '',
        icon: this.task.icon,
        status: this.task.status || ''
      })

      const iconBtn = document.querySelector('#icon_btn_' + this.task.icon.split('_')[0]) as HTMLButtonElement
      if (iconBtn) {
        iconBtn.style.backgroundColor = 'var(--yellow_500)'
      }
      document.querySelector('#status_btn_' + this.task.status)?.classList.add('status_selected')
    }
  }

  selectIcon(e: Event, icon: string) {
    e.preventDefault()

    document.querySelectorAll('.icon_btn').forEach(el => {
      const btn = el as HTMLButtonElement
      btn.style.backgroundColor = 'var(--grey_200)'
    })

    const clickedBtn = e.target as HTMLButtonElement
    clickedBtn.style.backgroundColor = 'var(--yellow_500)'

    this.formTask.get('icon')?.setValue(icon)
  }

  selectStatus(e: Event, status: string) {
    e.preventDefault()
    const clickedBtn = (e.target as HTMLElement).closest('.status_button') as HTMLButtonElement
    const selected = clickedBtn.classList.contains('status_selected')

    document.querySelectorAll('.status_button').forEach(el => {
      el.classList.remove('status_selected')
    })

    if (!selected) {
      clickedBtn.classList.add('status_selected')
      this.formTask.get('status')?.setValue(status)
    } else {
      this.formTask.get('status')?.setValue('')
    }
    
  }

  saveTask(e: Event) {
    e.preventDefault()
    const formValue = this.formTask.value

    if (formValue.name && formValue.icon) {
      let taskData: Task = {
        name: formValue.name,
        description: formValue.description || '',
        icon: formValue.icon,
        status: formValue.status || '',
        board_id: this.board.id
      }

      if (this.task?.id) {
        this.tasksService.updateTask(this.task.id, taskData)
      } else {
        this.tasksService.addTask(taskData)
      }

      this.eventCloseTaskEdit.emit()
    }
  }

  deleteTask(e: Event) {
    e.preventDefault()
    
    if (this.task?.id) {
      this.tasksService.deleteTask(this.task.id)
      this.eventCloseTaskEdit.emit()
    }
  }
}
