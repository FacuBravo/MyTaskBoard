import { Injectable } from '@angular/core';
import { Task } from '../types/Task';
import { BehaviorSubject } from 'rxjs';

const URL = 'https://6764340b52b2a7619f5bcf4a.mockapi.io/tasks'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _tasks: Task[] = []
  tasks: BehaviorSubject<Task[]> = new BehaviorSubject(this._tasks)

  async getTasks(boardId: number) {
    const res = await fetch(URL + '?board_id=' + boardId)
    
    if (res.ok) {
      this._tasks = await res.json()
      this.tasks.next(this._tasks)
    }
  }

  async addTask(task: Task) {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    this._tasks.push(await res.json())
    this.tasks.next(this._tasks)
  }

  async updateTask(id: number, task: Task) {
    const res = await fetch(URL + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const index = this._tasks.findIndex(e => e.id == id)

    if (index != -1) {
      task.id = id
      this._tasks[index] = task
      this.tasks.next(this._tasks)
    }
  }

  async deleteTask(id: number) {
    const res = await fetch(URL + '/' + id, {
      method: 'DELETE'
    })

    const index = this._tasks.findIndex(e => e.id == id)

    if (index != -1) {
      this._tasks.splice(index, 1)
      this.tasks.next(this._tasks)
    }
  }
}
