import { Component, Input } from '@angular/core';
import { BtnAddTaskComponent } from "../btn-add-task/btn-add-task.component";
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { Task } from '../types/Task';
import { TaskComponent } from "../task/task.component";
import { Board } from '../types/Board';
import { BoardsService } from '../Services/boards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../Services/tasks.service';

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
  board: Board
  ready = false
  @Input('id_board') idBoard: number

  constructor(
    private boardsService: BoardsService,
    private tasksService: TasksService,
    private router: Router
  ) {
    this.getBoard()
  }

  tasks: Task[] = []

  showTaskEdit(task?: Task) {
    this.currentTask = task || null
    this.showTaskedit = true
  }

  closeTaskEdit() {
    this.showTaskedit = false
    this.currentTask = null
  }

  async getIp() {
    let res = await fetch('https://api.ipify.org/?format=json')
    let json = await res.json()
    return json.ip
  }

  async getBoard() {
    const ip = await this.getIp()

    if (this.idBoard) {
      try {
        this.board = await this.boardsService.getBoard(this.idBoard)

        if (this.board.ip != ip) {
          this.router.navigateByUrl('/board')
          return
        }

        this.getTasks()
        this.ready = true
      } catch (error) {
        console.error(error)
      }

      return
    }

    this.board = await this.boardsService.getBoardByIp(ip)
    
    if (!this.board) {
      this.board = await this.boardsService.setBoard({ ip: ip })
    }

    this.router.navigate(['/board', this.board.id])
  }

  getTasks() {
    this.tasksService.getTasks(this.board.id)
    this.tasksService.tasks.subscribe(t => {
      this.tasks = t
    })
  }
}
