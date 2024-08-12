import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbButtonModule, NbLayoutModule, NbTabsetModule, NbSpinnerModule, NbIconModule, NbDialogModule } from '@nebular/theme';
import { MisDipositivosComponent } from './mis-dipositivos.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



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
    NbIconModule,
    NbDialogModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports:[
    MisDipositivosComponent
  ]
})
export class MisDipositivosModule { }
