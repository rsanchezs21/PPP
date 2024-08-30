import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AccesoRComponent } from './acceso-r/acceso-r.component';

const routes: Routes = [
    {path: '',redirectTo:'/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'acceso-r', component: AccesoRComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
