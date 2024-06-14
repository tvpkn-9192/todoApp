import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from '../../service/ui.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService
      .onAddToggle()
      .subscribe((value) => (this.showAddTask = value));

    //   this.subscription = this.uiService.onAddToggle().subscribe(data => {
    //     Object.keys(data).forEach(key => {
    //        if(key.startsWith("showAddTask")) {
    //           this.showAddTask = true;
    //        } 
    //     });
    //  });
  }

  ngOnInit(): void {}
  
   ngOnDestroy() {
     this.subscription.unsubscribe();
   }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
