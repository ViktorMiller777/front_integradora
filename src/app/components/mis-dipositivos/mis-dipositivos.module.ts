import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbButtonModule, NbLayoutModule, NbTabsetModule, NbSpinnerModule } from '@nebular/theme';
import { MisDipositivosComponent } from './mis-dipositivos.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    MisDipositivosComponent
  ],
  imports: [
    NbSpinnerModule,
    RouterLink,
    NbTabsetModule,
    NbLayoutModule,
    CommonModule,
    NbCardModule,
    NbButtonModule,
  ],
  exports:[
    MisDipositivosComponent
  ]
})
export class MisDipositivosModule { }
