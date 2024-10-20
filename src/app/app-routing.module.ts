import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AccesoRComponent } from './acceso-r/acceso-r.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FinanzasComponent } from './finanzas/finanzas.component';
import { UsuarioNuevoComponent } from './usuario-nuevo/usuario-nuevo.component';
import { BalanceComponent } from './balance/balance.component';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { firebaseConfig } from './app.module';


const routes: Routes = [
    {path: '',redirectTo:'/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'acceso-r', component: AccesoRComponent},
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'finanzas', component: FinanzasComponent},
    {path: 'usuario-nuevo', component: UsuarioNuevoComponent},
    {path: 'balance', component: BalanceComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AccesoRComponent,
    UsuariosComponent,
    AnalyticsComponent,
    FinanzasComponent,
    BalanceComponent,
    UsuarioNuevoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
