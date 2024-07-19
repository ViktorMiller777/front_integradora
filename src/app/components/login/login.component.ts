import { Component, HostBinding } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup
  isSubmit: boolean = false
  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private apiService: ApiService, private toastrService: NbToastrService, private router:Router) {
    this.loginForm = new FormGroup({
      uid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    if(this.loginForm.valid && !this.isSubmit){
      this.isSubmit = true
      this.apiService.login(this.loginForm.value).subscribe(
        response =>{
          this.toastrService.success('Success','Inicio de sesion exitoso!')
          this.loginForm.reset()
          this.router.navigate(['/'])
        },
        error => {
          if (error.status === 500) {
            this.toastrService.danger('Contraseña o correo incorrectos', 'Error');
          } else {
            this.toastrService.danger('Ocurrio un error, intentalo de nuevo mas tarde', 'Error');
          }
          this.isSubmit = false;
        }
      )
    }
  }
}
  


