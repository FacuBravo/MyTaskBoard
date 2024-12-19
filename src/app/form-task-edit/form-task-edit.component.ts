import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../types/Task';

@Component({
  selector: 'app-form-task-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-task-edit.component.html',
  styleUrl: './form-task-edit.component.css'
})
export class FormTaskEditComponent {
  @Input() task?: Task

  constructor(private fb: FormBuilder) { }

  formTask = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    icon: ['', Validators.required],
    status: ['', Validators.required]
  })

  ngOnInit() {
    this.loadPreData()
  }

  loadPreData() {
    if (this.task) {
      this.formTask.setValue({
        name: this.task.name,
        description: this.task.description || '',
        icon: this.task.icon,
        status: this.task.status
      })

      const iconBtn = document.querySelector('#icon_btn_' + this.task.icon) as HTMLButtonElement
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

    document.querySelectorAll('.status_button').forEach(el => {
      el.classList.remove('status_selected')
    })

    const clickedBtn = (e.target as HTMLElement).closest('.status_button') as HTMLButtonElement
    clickedBtn.classList.add('status_selected')
    this.formTask.get('status')?.setValue(status)
  }
}
