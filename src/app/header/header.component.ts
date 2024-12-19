import { Component, Input } from '@angular/core';
import { Board } from '../types/Board';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoardsService } from '../Services/boards.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() board: Board
  editMode: boolean = false

  constructor(
    private fb: FormBuilder,
    private boardsService: BoardsService
  ) { }

  formEditBoard = this.fb.group({
    'name': ['', Validators.required],
    'description': ['', Validators.required]
  })

  showEditBoard() {
    this.formEditBoard.patchValue({
      'name': this.board.name,
      'description': this.board.description
    })
    this.editMode = true
  }

  cancelEditBoard() {
    this.editMode = false
  }

  editBoard() {
    this.cancelEditBoard()
    const formValue = this.formEditBoard.value

    if (formValue.name && formValue.description) {
      let boardData = {
        name: formValue.name,
        description: formValue.description,
        ip: this.board.ip
      }
      this.boardsService.updateBoard(this.board.id, boardData)
    }
  }
}
