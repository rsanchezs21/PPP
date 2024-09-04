import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuarios: any[] = [];

  TotalRegistros: number = 0;
  TotalHombres: number = 0;
  TotalMujeres: number = 0;

  nombreFiltro: string = '';
  paisFiltro: string = '';
  apodoFiltro: string = '';

  constructor(private authService: AuthService){}

   isSidebarCollapsed = false;

   onSidebarCollapseChanged(isActive: boolean){
    this.isSidebarCollapsed = isActive;
   }

   ngOnInit(): void{
    this.authService.getUsers().subscribe(data =>{
      this.usuarios = data;
      this.calculateSummary();
    })
   }
   
   calculateSummary(): void{
    this.TotalRegistros = this.usuarios.length;
    this.TotalHombres = this.usuarios.filter(user => user.sex === 'Masculino').length;
    this.TotalMujeres = this.usuarios.filter(user => user.sex === 'Femenino').length;
   }

   buscar(): void{
    this.authService.getFilteredUsers(this.nombreFiltro, this.paisFiltro, this.apodoFiltro).subscribe(data =>{
      this.usuarios = data;
      this.calculateSummary();
    })
   }

}
