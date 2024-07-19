import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup

  constructor(private apiService:ApiService, private router:Router){
    this.registerForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      lastname: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      nickname: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  register(){
    if(this.registerForm.valid){
      this.apiService.register(this.registerForm.value).subscribe(
        response => {
          console.log("Registro exitoso",response)
          this.registerForm.reset()
          this.router.navigate(['/verificar'])
        },
        error => {
          console.error("Error",error)
        }
      )
    }
  }



}
