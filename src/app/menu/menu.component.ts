import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isActive = false;
  isCollapsed = false; // Nueva variable para controlar el estado colapsado
  userPhotoUrl: string | null = null;

  constructor(private authService:AuthService){}

  @Output() ActiveChanged = new EventEmitter<boolean>();

  ngOnInit(){
    this.authService.getUserPhoto().then(photoUrl =>{
      this.userPhotoUrl = photoUrl;
    }).catch(error => {
      console.error('error en la carga de la foto', error);
    });
  }

  toggleSidebar(){
    this.isActive = !this.isActive;
    this.isCollapsed = this.isActive ? !this.isCollapsed : false; // Alterna entre colapsado y expandido
    this.ActiveChanged.emit(this.isActive)
  }


}
