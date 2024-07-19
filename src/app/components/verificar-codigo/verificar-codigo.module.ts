import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerificarCodigoComponent } from './verificar-codigo.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VerificarCodigoComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NbCardModule,
    NbButtonModule,
  ],exports:[
    VerificarCodigoComponent
  ]
})
export class VerificarCodigoModule { }
