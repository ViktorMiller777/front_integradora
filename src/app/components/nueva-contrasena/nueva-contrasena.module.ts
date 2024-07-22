import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaContrasenaComponent } from './nueva-contrasena.component';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NuevaContrasenaComponent
  ],
  imports: [   
    NbInputModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    CommonModule
  ], exports:[
    NuevaContrasenaComponent
  ]
})
export class NuevaContrasenaModule { }
