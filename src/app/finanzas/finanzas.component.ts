import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrl: './finanzas.component.css'
})
export class FinanzasComponent {
[x: string]: any;
  nombreFiltro: string = '';
  paisFiltro: string = '';
  apodoFiltro: string = '';

  constructor (private authService: AuthService){}



  ngOnInit(): void{
    this.authService.getUsers().subscribe(data =>{
      this['usuarios'] = data;


})
}}
