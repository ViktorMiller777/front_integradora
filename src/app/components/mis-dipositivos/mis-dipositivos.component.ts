import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { toArray } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { SocketService } from 'src/app/service/socket.service';

@Component({
  selector: 'app-mis-dipositivos',
  templateUrl: './mis-dipositivos.component.html',
  styleUrls: ['./mis-dipositivos.component.scss']
})
export class MisDipositivosComponent implements OnInit{

  dispositiveIDs: number[] = [];
  dispositivo: any[] = [];

  constructor(private apiService: ApiService, private galleta:CookieService, private router:Router, private socketexd: SocketService){}

  ngOnInit(){
    this.apiService.getLastDataMejorado().subscribe(
      data => {
        this.dispositivo = data 
        console.log('dispositivos',data)
        this.apiService.HomeDispositivos().subscribe(
          data => {
            this.dispositiveIDs = data
            console.log('ids',data)
            console.log('jijija')
            if(this.dispositiveIDs && this.dispositiveIDs.length > 0){
              console.log('jijia2')
              this.dispositiveIDs.forEach(id => {
                console.log('jiji3')
                const idStr = id.toString()
                console.log('jijia4')
                this.socketexd.watchAllData(idStr)
                console.log('jijija5',idStr)
                this.socketexd.ListenData().subscribe(lastData => {
                  console.log('datos recibidos:', lastData)
                })
              })
            }
          }
        )
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
