import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { SensoresComponent } from './sensores.component';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    SensoresComponent
  ],
  imports: [
    NgxPaginationModule,
    RouterLink,
    CommonModule,
    NbCardModule,
    NbSelectModule,
    NbSpinnerModule
  ],
  exports:[
    SensoresComponent
  ]
})
export class SensoresModule { }
