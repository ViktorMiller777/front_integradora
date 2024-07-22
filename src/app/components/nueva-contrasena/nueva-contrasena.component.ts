import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-nueva-contrasena',
  templateUrl: './nueva-contrasena.component.html',
  styleUrls: ['./nueva-contrasena.component.scss']
})
export class NuevaContrasenaComponent {
  newPassForm: FormGroup
  isSubmit: boolean = false

  constructor(private apiService:ApiService, private tostadaDeFrijol: NbToastrService, private router:Router){
    this.newPassForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      verificationCode: new FormControl('',[Validators.required]),
      newPassword: new FormControl('',[Validators.required])
    })
  }

  guardar(){
    if(this.newPassForm.valid && !this.isSubmit){
      this.apiService.nuevaContrasena(this.newPassForm.value).subscribe(
        response => {
          console.log('contraseña nueva',response)
          this.tostadaDeFrijol.success('Success','Contraseña actualizada')
          this.newPassForm.reset()
          this.router.navigate(['/login'])
        },error =>{
          if(error.status === 500){
            this.tostadaDeFrijol.danger('Bad request','Credenciales incorrectas :s')
            this.newPassForm.reset()
          }else(error.status === 400)
          this.tostadaDeFrijol.danger('Bad request','Codigo de verificacion incorrecto')
          this.newPassForm.reset()
        }
      )
    }
  }
}
