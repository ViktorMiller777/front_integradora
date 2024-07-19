import { Component, HostBinding } from '@angular/core';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup
  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private apiService: ApiService, private toastrService: NbToastrService) {
    this.loginForm = new FormGroup({
      uid: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    try {
      if (this.loginForm.valid) {
        this.apiService.login(this.loginForm.value).subscribe(
          response => {
            console.log("Login success", response)
            this.showToast('success')
            this.loginForm.reset()
          },
          error => {
            console.log("Login failed", error);
            this.showToast('danger'); 
          }
        )
      }
    } catch (error) {
      
    }
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe(
        response => {
          console.log("Login success", response)
          this.showToast('success')
          this.loginForm.reset()
        },
        error => {
          console.log("Login failed", error);
          this.showToast('danger'); 
        }
      )
    }
  }
  showToast(status: NbComponentStatus) {
    this.toastrService.show(`Inicio de sesión ${status === 'success' ? 'exitoso' : 'fallido'}!`, `Estado: ${status}`, { status });
  }

}

