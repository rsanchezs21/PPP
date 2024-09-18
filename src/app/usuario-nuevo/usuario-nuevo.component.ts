import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrl: './usuario-nuevo.component.css'
})

  export class UsuarioNuevoComponent {
    //  propiedades para enlazar con el formulario
    name: string = '';
    email: string = '';
    password: string = '';

    // Método para manejar el envío del formulario
    onSubmit() {
      console.log('Formulario enviado');
      console.log('Nombre:', this.name);
      console.log('Email:', this.email);
      console.log('Contraseña:', this.password);

    }
  }

