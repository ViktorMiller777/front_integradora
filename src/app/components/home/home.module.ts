import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbButtonModule } from '@nebular/theme';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { RouterLink } from '@angular/router';
import { NbToastrModule } from '@nebular/theme';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    NbToastrModule.forRoot(),
    NbLayoutModule,
    RouterLink,
    CommonModule,
    NbButtonModule,
    NbCardModule,
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
