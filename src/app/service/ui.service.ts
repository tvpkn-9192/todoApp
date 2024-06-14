import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private showEditTask: boolean = false;
  private subjectAdd = new Subject<any>();
  private subjectEdit = new Subject<any>();


  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subjectAdd.next(this.showAddTask);
  }

   toggleEditTask(task: Task): void {
    this.showEditTask = !this.showEditTask;
    this.subjectEdit.next({ showEditTask: this.showEditTask, task });
  }

  onAddToggle(): Observable<any> {
    return this.subjectAdd.asObservable();
  }

  onEditToggle(): Observable<any> {
    return this.subjectEdit.asObservable();
  }
}