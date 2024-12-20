import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: 'board/:id_board', component: TasksComponent },
    { path: 'board', component: TasksComponent },
    { path: '', redirectTo: 'board', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
];
