import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UiService } from '../../service/ui.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  faEdit = faEdit;
  showAddTask: boolean = false;
  showEditTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onAddToggle()
      .subscribe((value: boolean) => (this.showAddTask = value));
      this.subscription = this.uiService
      .onEditToggle()
      .subscribe((value: boolean) => (this.showEditTask = value));
    //   this.subscription = this.uiService.onAddToggle().subscribe(data => {
    //     Object.keys(data).forEach(key => {
    //        if(key.startsWith("showEditTask")) {
    //           this.showEditTask = true;
    //        } else {
    //         this.showEditTask = true;
    //        }
    //     });
    //  });
  }

  ngOnInit(): void {}

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }

  onEdit(task: Task) {
    //this.onToggle(task);
    this.uiService.toggleEditTask(task);
    //this.onEditTask.emit(task);
  }
}