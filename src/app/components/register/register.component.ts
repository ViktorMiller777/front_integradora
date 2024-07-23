import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isSubmit: boolean = false
  registerForm: FormGroup

  constructor(private apiService:ApiService, private router:Router, private toastrService: NbToastrService){
    this.registerForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      nickname: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  register(){
    if(this.registerForm.valid && !this.isSubmit){
      this.apiService.register(this.registerForm.value).subscribe(
        response => {
          console.log('success',response)
          this.toastrService.success('success','Usuario registrado con exito!')
          this.router.navigate(['/verificar'])
        },error =>{
          if(error.status === 500){
            this.toastrService.danger('Error','Ocurrio un error, intenta de nuevo')
          }
        }
      )
    }
  }
}
