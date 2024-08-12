import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-device-dialog',
  template: `
    <nb-card>
      <nb-card-header>Registrar Dispositivo</nb-card-header>
      <nb-card-body>
        <form [formGroup]="deviceForm">
          <div>
          <input nbInput style="margin-bottom: 1rem;" fullWidth formControlName="name" id="name" placeholder="Apodo">
          </div>
          <div>
            <nb-select fullWidth placeholder="Tipo de dispositivo" formControlName="dispositiveTypeId" id="type" >
              <nb-option [value]=1>Brazalete</nb-option>
              <nb-option [value]=2>Pesa</nb-option>
            </nb-select>
          </div>
        </form>
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="primary" style="margin-right: 1rem;" (click)="registerDevice()">Registrar</button>
        <button nbButton status="danger" (click)="cancel()">Cancelar</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class DeviceDialogComponent {
  deviceForm: FormGroup

  constructor(
    protected dialogRef: NbDialogRef<DeviceDialogComponent>,
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      dispositiveTypeId: ['', Validators.required],
    });
  }

  registerDevice() {
    if (this.deviceForm.valid) {
      const deviceData = this.deviceForm.value;
      this.api.crearDispositivo(deviceData).subscribe(response => {
        this.dialogRef.close(response); 
      });
    }
  }

  cancel() {
    this.dialogRef.close()
  }
}
