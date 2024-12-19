import { Injectable } from '@angular/core';
import { Board } from '../types/Board';
import { BehaviorSubject } from 'rxjs';

const URL = 'https://6764340b52b2a7619f5bcf4a.mockapi.io/boards'

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private _board: Board = {
    ip: '',
    name: '',
    description: '',
    id: 0
  }

  board: BehaviorSubject<Board> = new BehaviorSubject<Board>(this._board)

  async getBoardByIp(ip: string) {
    const res = await fetch(URL + '?ip=' + ip)
    const boards: Board[] = await res.json()
    this._board = boards[0]
    this.board.next(this._board)
  }

  async setBoard(board: Object) {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(board),
    })

    this._board = await res.json()
    this.board.next(this._board)
  }

  async updateBoard(id: number, boardData: Object) {
    const res = await fetch(URL + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(boardData)
    })

    this._board = await res.json()
    this.board.next(this._board)
  }
}
