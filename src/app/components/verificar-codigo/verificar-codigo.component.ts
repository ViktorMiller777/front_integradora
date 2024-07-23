import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.component.html',
  styleUrls: ['./verificar-codigo.component.scss']
})
export class VerificarCodigoComponent {
  verifyForm: FormGroup
  isSubmit: boolean = false

  constructor(private router:Router, private memin:ApiService, private tostada:NbToastrService){
    this.verifyForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      verificationCode: new FormControl('',[Validators.required])
    })
  }
  
  verify(){
    if(this.verifyForm.valid && !this.isSubmit){
      this.memin.verficarCodigo(this.verifyForm.value).subscribe(
        response => {
          console.log('si se verifico', response)
          this.tostada.success('Success','Codigo verficado, Ya puede iniciar sesion')
          this.verifyForm.reset()
          this.router.navigate(['/login'])
        },error => {
          if(error.status === 400){
            this.tostada.danger('Error','Codigo de verificacion invalido')
          }else{
            this.tostada.danger('Error','Verificacion fallida, intenta de nuevo mas tarde')
          }
        }
      )
    }
  }
}
