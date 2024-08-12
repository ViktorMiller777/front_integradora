import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { SensoresComponent } from './sensores.component';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';



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
    NbSpinnerModule,
    FormsModule,
    NbButtonModule,
    NbIconModule
  ],
  exports:[
    SensoresComponent
  ]
})
export class SensoresModule { }
