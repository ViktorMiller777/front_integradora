import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MisDipositivosComponent } from './components/mis-dipositivos/mis-dipositivos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SensoresComponent } from './components/sensores/sensores.component';
import { VerificarCodigoComponent } from './components/verificar-codigo/verificar-codigo.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { NuevaContrasenaComponent } from './components/nueva-contrasena/nueva-contrasena.component';
import { MeminGuard } from './guards/memin.guard';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { SiriusGuard } from './guards/sirius.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[]},
  {path:'lista-usuarios',component:ListaUsuariosComponent,canActivate:[SiriusGuard]},
  {path:'nueva-contrasena',component:NuevaContrasenaComponent,canActivate:[]},
  {path:'recuperar-contrasena',component:RecuperarContrasenaComponent,canActivate:[]},
  {path:'verificar',component:VerificarCodigoComponent,canActivate:[]},
  {path:'register',component:RegisterComponent,canActivate:[]},
  {path:'mis-dispositivos',component:MisDipositivosComponent,canActivate:[MeminGuard]},
  {path:'sensor',component:SensoresComponent,canActivate:[MeminGuard]},
  {path:'perfil',component:PerfilComponent,canActivate:[]},
  {path:'login',component:LoginComponent,canActivate:[]},
  {path:'**',component:NotFoundComponent,canActivate:[]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
