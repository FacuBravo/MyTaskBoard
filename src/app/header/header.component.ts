import { Component, Input } from '@angular/core';
import { Board } from '../types/Board';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() board: Board
}
