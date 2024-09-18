import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  isActive = false;

  @Output() ActiveChanged = new EventEmitter<boolean>();

  toggleSidebar(){
    this.isActive = !this.isActive;
    this.ActiveChanged.emit(this.isActive)
  }
}
