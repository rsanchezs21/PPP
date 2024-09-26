import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrl: './finanzas.component.css'
})
export class FinanzasComponent {
  usuarios: any[] = [];
  filteredUsuarios: any[] = [];

  constructor (private authService: AuthService){}

  isSidebarCollapsed = false;

  onSidebarCollapseChanged(isActive: boolean){
    this.isSidebarCollapsed = isActive;
   }

   ngOnInit(): void {
    this.authService.getUsers().subscribe(data => {
      this.usuarios = data;
      this.filteredUsuarios = data;
    });

  }}
