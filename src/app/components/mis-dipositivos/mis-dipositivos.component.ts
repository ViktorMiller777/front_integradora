import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-mis-dipositivos',
  templateUrl: './mis-dipositivos.component.html',
  styleUrls: ['./mis-dipositivos.component.scss']
})
export class MisDipositivosComponent implements OnInit{

  dispositivo: any[] = [];
  constructor(private apiService: ApiService, private galleta:CookieService, private router:Router){}

  ngOnInit():void{
    this.apiService.getLastDataMejorado().subscribe(
      data =>{
        this.dispositivo = data
        console.log('estos son los datos',data)
      }
    )
  }

  dispositivoClick(DispositiveId: number, sensorId: number) {
    console.log(`DispositivoID: ${DispositiveId}, Sensor ID: ${sensorId}`)
    this.galleta.set('DispositiveID', DispositiveId.toString(),{expires:1})
    this.galleta.set('sensorID',sensorId.toString())
    this.router.navigate(['/sensor'])
  }
}
