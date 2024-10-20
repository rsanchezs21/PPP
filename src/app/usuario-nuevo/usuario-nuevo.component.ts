import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent {

  userForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Inicializa el formulario del usuario
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],  // Campo para la contraseña
    });
  }

  // Método para seleccionar el archivo
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Método para guardar el usuario y la foto
  onSaveUser(): void {
    if (this.userForm.valid && this.selectedFile) {
      const userData = this.userForm.value;  // Incluye la contraseña

      // Primero guarda los datos del usuario
      this.userService.createUser(userData).then((userRef) => {
        const userId = userRef.id; // Obtén el ID del usuario generado

        // Si se seleccionó un archivo, sube la foto
        if (this.selectedFile) {
          this.userService.uploadUserPhoto(userId, this.selectedFile)
            .pipe(
              finalize(() => {
                console.log('Upload complete');
              })
            )
            .subscribe((photoURL: string) => {
              // Actualiza el documento del usuario con la URL de la foto
              this.userService.updateUserPhoto(userId, photoURL).then(() => {
                console.log('Usuario y foto guardados correctamente');
              });
            });
        }
      }).catch(error => {
        console.error('Error al crear el usuario: ', error);
      });
    } else {
      console.log('Formulario o archivo no válido');
    }
  }
}
