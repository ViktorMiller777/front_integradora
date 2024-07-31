import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/service/api.service';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-mis-dipositivos',
  templateUrl: './mis-dipositivos.component.html',
  styleUrls: ['./mis-dipositivos.component.scss']
})
export class MisDipositivosComponent implements OnInit{

  dispositivo: any[] = [];
  constructor(private apiService: ApiService, private galleta:CookieService, private router:Router, private socketexd: SocketService){}

  // los parametros de fecha para filtrar por fecha es en formato YYYY-MM-DD y en formato 25 horas 24:60:60

  //arrelgo de id de los dispositivos de los usurios y ese lo paso como parametro en la funcion de watchAllData 
  //primero necesito agregar al arrelgo pero el puro id de los dipositivos el areglo se v a extender segun la cantidad de los dispositivos que tenga el usuraio
  ngOnInit(): void {
    this.apiService.getLastDataMejorado().subscribe(
      data => {
        this.dispositivo = data
        console.log('Dispositivos', data)
        this.socketexd.watchAllData('1')
        

        //esto quiza lo puedo usar para que 
        // if (data && data.length > 0) {
        //   this.socketexd.watchAllData(data[0].dispositiveID);
        // }
      }
    );

    this.socketexd.ListenData().subscribe(realTimeData => {
      console.log('Real-time data received:', realTimeData)
    })
  }

  dispositivoClick(DispositiveId: number, sensorId: number) {
    console.log(`DispositivoID: ${DispositiveId}, Sensor ID: ${sensorId}`)
    this.galleta.set('DispositiveID', DispositiveId.toString(),{expires:1})
    this.galleta.set('sensorID',sensorId.toString())
    this.router.navigate(['/sensor'])
  }
}
