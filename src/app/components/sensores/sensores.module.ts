import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbSelectModule } from '@nebular/theme';
import { SensoresComponent } from './sensores.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    SensoresComponent
  ],
  imports: [
    RouterLink,
    CommonModule,
    NbCardModule,
    NbSelectModule,
  ],
  exports:[
    SensoresComponent
  ]
})
export class SensoresModule { }
