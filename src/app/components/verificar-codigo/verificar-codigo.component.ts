import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from 'src/app/service/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.component.html',
  styleUrls: ['./verificar-codigo.component.scss']
})
export class VerificarCodigoComponent implements OnInit {
  verifyForm: FormGroup;
  isSubmit: boolean = false;

  constructor(
    private router: Router,
    private memin: ApiService,
    private tostada: NbToastrService,
    private cookieService: CookieService
  ) {
    this.verifyForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      verificationCode: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    // Obtén el email de las cookies y decodifícalo
    const email = this.cookieService.get('email');
    if (email) {
      const decodedEmail = decodeURIComponent(email); // Decodifica el email
      this.verifyForm.get('email')?.setValue(decodedEmail);
    }
  }

  verify() {
    if (this.verifyForm.valid && !this.isSubmit) {
      this.memin.verficarCodigo(this.verifyForm.value).subscribe(
        response => {
          console.log('si se verifico', response);
          this.tostada.success('Success', 'Código verificado, ya puede iniciar sesión');
          this.verifyForm.reset();
          this.router.navigate(['/login']);
        },
        error => {
          if (error.status === 400) {
            this.tostada.danger('Error', 'Código de verificación inválido');
          } else {
            this.tostada.danger('Error', 'Verificación fallida, intenta de nuevo más tarde');
          }
        }
      );
    }
  }
}
