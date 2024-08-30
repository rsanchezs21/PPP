import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { response } from 'express';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(private router: Router,private authService: AuthService){
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  togglePassworVisibility(){
    const passwordField: any = document.getElementById('password');
    const toggleIcon: any = document.getElementById('togglePassword');
    if(passwordField.type == 'password'){
      passwordField.type = 'text';
      toggleIcon.classList.remove('fa-eye');
      toggleIcon.classList.add('fa-eye-slash');
    }else{
      passwordField.type = 'password';
      toggleIcon.classList.remove('fa-eye-slash');
      toggleIcon.classList.add('fa-eye')
    }
  }

  async onLogin(){
    const {email, password} = this.formLogin.value;

    const isValidUser = await this.authService.login(email,password);

    if(isValidUser){
      console.log('login exitoso');
      this.router.navigate(['acceso-r']);
    }else{
      console.error('credenciales incorrectas');
      alert('correo o contraseña incorrectos');
    }
  }
  
}
