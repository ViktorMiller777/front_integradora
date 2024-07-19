import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule
  ],
  exports:[
    PerfilComponent
  ]
})
export class PerfilModule { }
