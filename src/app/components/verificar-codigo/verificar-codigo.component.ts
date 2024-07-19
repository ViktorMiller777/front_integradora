import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.component.html',
  styleUrls: ['./verificar-codigo.component.scss']
})
export class VerificarCodigoComponent {
  verifyForm: FormGroup

  constructor(private router:Router){
    this.verifyForm = new FormGroup({
      code: new FormControl('',[Validators.required])
    })
  }
  
  verify(){
    alert("si")
    this.router.navigate(['/login'])
  }
}
