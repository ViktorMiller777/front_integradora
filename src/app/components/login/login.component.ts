import { Component, HostBinding } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup
  isSubmit: boolean = false
  @HostBinding('class')
  classes = 'example-items-rows'

  constructor(
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private router:Router,
    private galleta:CookieService
  ) {
    this.loginForm = new FormGroup({
      uid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(){
    if(this.loginForm.valid && !this.isSubmit){
      this.apiService.login(this.loginForm.value).subscribe(
        response => {
          console.log('login success', response)
          this.galleta.set('token',response.token.token)
          this.galleta.set('role',"user")
          if(response.role_id == 1){
            this.galleta.set('role',"admin")
          }else if(response.role_id == 2){
          }
          this.toastrService.success('Success','Inicio de sesion exitoso!')
          this.router.navigate(['/'])
        },error => {
          if(error.status === 500){
            this.toastrService.danger('Ocurrio un error, intenta de nuevo mas tarde','Error')
          }if (error.status === 400) {
            this.toastrService.warning('Contraseña o email incorrectos','Error')
          }if (error.status === 401) {
            this.toastrService.warning('Primero verifica tu cuenta para iniciar sesion','Error')
            this.router.navigate(['/verificar'])

          } else {
          }
        }
      )
    }
  }
}
  


