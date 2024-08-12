import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { NbButtonModule, NbCardModule } from '@nebular/theme';



@NgModule({
  declarations: [
    ListaUsuariosComponent
  ],
  imports: [
    NbButtonModule,
    NbCardModule,
    CommonModule
  ],
  exports:[
    ListaUsuariosComponent
  ]
})
export class ListaUsuariosModule { }
