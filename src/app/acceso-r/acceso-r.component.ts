import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceso-r',
  templateUrl: './acceso-r.component.html',
  styleUrl: './acceso-r.component.css'
})
export class AccesoRComponent {

  isSidebarCollapsed = false;

  onSidebarCollapseChanged(isActive: boolean){
   this.isSidebarCollapsed = isActive;
  }


}
