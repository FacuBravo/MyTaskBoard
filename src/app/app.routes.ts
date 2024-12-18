import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
    { path: '', redirectTo: 'board/1', pathMatch: 'full' },
    { path: 'board/1', component: TasksComponent }
];
