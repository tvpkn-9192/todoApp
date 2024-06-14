import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/Task';
import { TASKS } from '../mocks/mock-tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

  deleteTask(task: Task): Observable<Task> {
    return of(task);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    return of(task);
  }

  addTask(task: Task): Observable<Task> {
    return of(task);
  }

  editTask(task: Task): Observable<Task> {
    return of(task);
  }
}