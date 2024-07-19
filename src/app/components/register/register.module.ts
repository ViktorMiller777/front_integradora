import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { NbButtonModule, NbInputModule, NbFormFieldModule, NbLayoutModule, } from '@nebular/theme';
import { NbCardModule, NbThemeModule } from '@nebular/theme';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    ReactiveFormsModule,
    NbThemeModule,
    NbInputModule,
    NbFormFieldModule,
    NbLayoutModule,
    RouterLink,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    HttpClientModule
  ],
  exports:[
    RegisterComponent
  ]
})
export class RegisterModule { }
