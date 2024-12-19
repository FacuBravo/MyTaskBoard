import { Injectable } from '@angular/core';
import { Board } from '../types/Board';

const URL = 'https://6764340b52b2a7619f5bcf4a.mockapi.io/boards'

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  async getBoards(): Promise<Board[]> {
    const res = await fetch(URL)
    return await res.json()
  }

  async getBoard(id: number): Promise<Board> {
    const res = await fetch(URL + '/' + id)
    return await res.json()
  }

  async setBoard(board: Object): Promise<Board> {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(board),
    })

    return await res.json()
  }
}
