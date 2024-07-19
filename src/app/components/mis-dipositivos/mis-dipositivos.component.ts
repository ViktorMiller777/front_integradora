import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-dipositivos',
  templateUrl: './mis-dipositivos.component.html',
  styleUrls: ['./mis-dipositivos.component.scss']
})
export class MisDipositivosComponent {
  data = [{
    cardiaco: 41,
    temperatura: 12,
    pasos: 134,
    distancia: 141,
    alcohol: 14
  }]

  brazalet=[{
    name: 'Bolillo :D'
  }]
}
