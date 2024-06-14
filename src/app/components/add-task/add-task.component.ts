import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../models/Task';
import { UiService } from '../../service/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Input() task!: Task;
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  
  id!: number;
  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {

  //   this.subscription = this.uiService.onAddToggle().subscribe(data => {
  //     Object.keys(data).forEach(key => {
  //        if(key.startsWith("showAddTask")) {
  //           //this.showAddTask = data[key];
  //           this.showAddTask = true;
  //        } 
  //     });
  //  });
    this.subscription = this.uiService
      .onAddToggle()
      .subscribe((value: boolean) => (this.showAddTask = value));
      // this.subscription = this.uiService
      // .onToggle()
      // .subscribe((value: Task) => (this.task = value));
      // this.subscription = this.uiService
      // .onToggle()
      // .subscribe((value: boolean) => (this.showEditTask = value));
  }
  ngOnInit() 
  {
    // if(this.task) {
    //   this.text = this.task.text;
    //   this.day = this.task.day;
    //   this.reminder = this.task.reminder;
    //   this.showEditTask = true;
    // }
  }
  
   ngOnDestroy() {
        this.subscription.unsubscribe();
    }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

      const newTask: Task = {
        id: this.id,
        text: this.text,
        day: this.day,
        reminder: this.reminder,
      };
  
      this.onAddTask.emit(newTask);
  
      this.text = '';
      this.day = '';
      this.reminder = false;
      this.showAddTask = !this.showAddTask;
    }
}