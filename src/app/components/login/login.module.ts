import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbLayoutModule, NbFormFieldModule } from '@nebular/theme';
import { LoginComponent } from './login.component';
import { RouterLink } from '@angular/router';
import { NbToastrModule } from '@nebular/theme';
import { NbInputModule, NbButtonModule, NbThemeModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    NbInputModule,
    ReactiveFormsModule,
    NbThemeModule,
    NbLayoutModule,
    NbFormFieldModule,
    RouterLink,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbToastrModule.forRoot(),
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
