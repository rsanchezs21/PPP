import { Component } from '@angular/core';

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
