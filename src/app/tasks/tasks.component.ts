import { Component, Input } from '@angular/core';
import { BtnAddTaskComponent } from "../btn-add-task/btn-add-task.component";
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { Task } from '../types/Task';
import { TaskComponent } from "../task/task.component";
import { Board } from '../types/Board';
import { BoardsService } from '../Services/boards.service';
import { Router } from '@angular/router';
import { TasksService } from '../Services/tasks.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [BtnAddTaskComponent, TaskEditComponent, TaskComponent, HeaderComponent],
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
    await this.boardsService.getBoardByIp(ip)
    this.boardsService.board.subscribe(e => 
      this.board = e
    )

    if (!this.board.id) {
      await this.boardsService.setBoard({
        name: 'My Task Board',
        description: 'Tasks to keep organised',
        ip: ip
      })
      await this.loadDefaultTasks()
    }

    this.getTasks()
    this.ready = true

    this.router.navigate(['/board', this.board.id])
  }

  getTasks() {
    this.tasksService.getTasks(this.board.id)
    this.tasksService.tasks.subscribe(t => {
      this.tasks = t
    })
  }

  async loadDefaultTasks() {
    await this.tasksService.addTask({
      name: 'Task in Progress',
      icon: 'time_⏰',
      description: '',
      board_id: this.board.id,
      status: 'progress'
    })

    await this.tasksService.addTask({
      name: 'Task Completed',
      icon: 'strongWork_🏋️‍♀️',
      description: '',
      board_id: this.board.id,
      status: 'done'
    })

    await this.tasksService.addTask({
      name: 'Task Won’t Do',
      icon: 'break_☕',
      description: '',
      board_id: this.board.id,
      status: 'wontDo'
    })

    await this.tasksService.addTask({
      name: 'Task To Do',
      icon: 'reading_📚',
      description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
      board_id: this.board.id,
      status: ''
    })
  }
}
