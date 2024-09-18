import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  isSidebarCollapsed = false;

   onSidebarCollapseChanged(isActive: boolean){
    this.isSidebarCollapsed = isActive;
   }

}
