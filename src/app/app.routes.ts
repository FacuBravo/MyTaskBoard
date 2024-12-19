import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
    { path: '', redirectTo: 'board', pathMatch: 'full' },
    { path: 'board', component: TasksComponent },
    { path: 'board/:id_board', component: TasksComponent }
];
