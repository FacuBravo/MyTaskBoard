import { Component } from '@angular/core';

@Component({
  selector: 'app-form-task-edit',
  standalone: true,
  imports: [],
  templateUrl: './form-task-edit.component.html',
  styleUrl: './form-task-edit.component.css'
})
export class FormTaskEditComponent {
  selectIcon(e: Event) {
    e.preventDefault()

    document.querySelectorAll('.icon_btn').forEach(el => {
      el.setAttribute('style', 'background-color: var(--grey_200);')
    })

    const clickedBtn = e.target as HTMLButtonElement
    clickedBtn.style.backgroundColor = 'var(--yellow_500)'
  }

  selectStatus(e: Event) {
    e.preventDefault()

    document.querySelectorAll('.status_button').forEach(el => {
      el.classList.remove('status_selected')
    })

    const clickedBtn = e.target as HTMLButtonElement
    clickedBtn.classList.add('status_selected')
  }
}
