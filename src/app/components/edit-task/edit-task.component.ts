import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/Task';
import { Subscription } from 'rxjs';
import { UiService } from '../../service/ui.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  @Input() task!: Task;
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  
  id!: number;
  text!: string;
  day!: string;
  reminder: boolean = false;
  //showAddTask: boolean = false;
  showEditTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
  //   this.subscription = this.uiService.onAddToggle().subscribe(data => {
  //     Object.keys(data).forEach(key => {
  //        if(key.startsWith("showEditTask")) {
  //           //this.showAddTask = data[key];
  //           this.showEditTask = true;
  //        } 
  //     });
  //  });
    // this.subscription = this.uiService
    //   .onEditToggle()
    //   .subscribe((value: boolean) => (this.showEditTask = value));

    this.subscription = this.uiService
    .onEditToggle()
    .subscribe(
      data => {
        this.showEditTask = data.showEditTask;
        this.id = data.task.id;
        this.text = data.task.text;
        this.day = data.task.day;
        this.reminder = data.task.reminder;
        //this.showEditTask = true;
      }
    );

      // this.subscription = notification.notiCreated$.subscribe(
      //   data => {
      //      console.log(data.message1, data.message2);
      //      this.createNotification(data.message1, 'warning');
      // });
      // this.subscription = this.uiService
      // .onToggle()
      // // .subscribe((value: Task) => (this.task = value));
      // if(this.task) {
      //   this.text = this.task.text;
      //   this.day = this.task.day;
      //   this.reminder = this.task.reminder;
      //   this.showEditTask = true;
      // }
      // this.subscription = this.uiService
      // .onToggle()
      // .subscribe((value: boolean) => (this.showEditTask = value));
  }
  // ngOnInit() 
  // {
  //   if(this.task) {
  //     this.text = this.task.text;
  //     this.day = this.task.day;
  //     this.reminder = this.task.reminder;
  //     this.showEditTask = true;
  //   }
  // }
  
  //  ngOnDestroy() {
  //       this.subscription.unsubscribe();
  //   }

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
      this.showEditTask =!this.showEditTask;
      this.onEditTask.emit(newTask);
  
      // this.text = '';
      // this.day = '';
      // this.reminder = false;
    }
}
