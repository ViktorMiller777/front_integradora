import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecuperarContrasenaComponent } from './recuperar-contrasena.component';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RecuperarContrasenaComponent
  ],
  imports: [
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
    NbCardModule,
    CommonModule
  ],exports:[
    RecuperarContrasenaComponent
  ]
})
export class RecuperarContrasenaModule { }
