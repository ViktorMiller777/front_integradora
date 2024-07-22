import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss']
})
export class RecuperarContrasenaComponent {
  recuperarForm: FormGroup
  isSubmit: boolean = false

  constructor(private router:Router, private apiService:ApiService, private toastrService:NbToastrService){
    this.recuperarForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
    })
  }

  recuperar(){
    if(this.recuperarForm.valid && !this.isSubmit){
      this.apiService.recuperarContrasena(this.recuperarForm.value).subscribe(
        response => {
          console.log("codigo para recuperar contraseña mandado", response)
          this.toastrService.success('Correo enviado','Correo enviado!!')
          this.recuperarForm.reset()
          this.router.navigate(['/nueva-contrasena'])
        }, error => {
          if (error.status === 404) {
            this.toastrService.danger('Correo invalido', 'Error');
          }
          this.isSubmit = false;
        }
      )
    }
  }
}
