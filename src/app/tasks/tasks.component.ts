import { Component, Input } from '@angular/core';
import { BtnAddTaskComponent } from "../btn-add-task/btn-add-task.component";
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { Task } from '../types/Task';
import { TaskComponent } from "../task/task.component";
import { Board } from '../types/Board';
import { BoardsService } from '../Services/boards.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  nextId: number = 5
  board: Board
  ready = false
  @Input('id_board') idBoard: number

  constructor(
    private boardsService: BoardsService,
    private router: Router
  ) {
    this.getData()
  }

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
    },
    {
      id: 4,
      name: `Task To Do`,
      description: 'Work on a Challenge on devChallenges.io, learn TypeScript',
      icon: 'reading_📚'
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
    this.closeTaskEdit()
    const index = this.tasks.findIndex(e => e.id == task.id)

    if (index != -1) {
      this.tasks[index] = task
    } else {
      this.nextId = task.id + 1
      this.tasks.push(task)
    }
  }

  deleteTask(id: number) {
    this.closeTaskEdit()
    const index = this.tasks.findIndex(e => e.id == id)

    if (index != -1) {
      this.tasks.splice(index, 1)
    }
  }

  async getIp() {
    let res = await fetch('https://api.ipify.org/?format=json')
    let json = await res.json()
    return json.ip
  }

  async getData() {
    const ip = await this.getIp()

    if (this.idBoard) {
      try {
        const boardByUrl = await this.boardsService.getBoard(this.idBoard)

        if (boardByUrl.ip != ip) {
          this.router.navigateByUrl('/board')
          return
        }
  
        this.ready = true
      } catch (error) {
        console.error(error)
      }

      return
    }

    const boards = await this.boardsService.getBoards()
    const index = boards.findIndex(e => e.ip == ip)

    if (index == -1) {
      this.board = await this.boardsService.setBoard({ ip: ip })
    } else {
      this.board = boards[index]
    }

    this.router.navigate(['/board', this.board.id])
  }
}
