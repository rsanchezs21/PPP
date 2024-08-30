import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { error } from 'console';
import { AuthError, UserCredential } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string='';
  password: string = '';


  constructor(private router: Router){}

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

  onLogin(){
    this.router.navigate(['/acceso-r']);
  }
  
}
