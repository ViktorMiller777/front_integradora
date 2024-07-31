import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/service/api.service';



@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent implements OnInit{

  dispositivo: any[] = [];

  constructor(private apiService:ApiService, private galleta:CookieService){}
  data: any[] = [];
  sensor: any[] = [];
  sensorValue: any[] = [];


  ngOnInit(){
    const DispositiveIDStr = this.galleta.get('DispositiveID')
    const DispositiveID = parseInt(DispositiveIDStr)
    this.apiService.sensoresDeDispositivo(DispositiveID).subscribe(
      data => {
        this.sensor = data
        console.log('Sensores del dispositivo',data)
      }
    )
    const dispositiveIDStr = this.galleta.get('DispositiveID')
    const dispositiveID = parseInt(dispositiveIDStr)
    const sensorIDStr = this.galleta.get('sensorID')
    const sensorID = parseInt(sensorIDStr)
    this.apiService.getLastData(dispositiveID, sensorID).subscribe(
      data =>{
        this.sensorValue = data
        console.log('Data', data);     
      }
    )
  }

  sensorClick(item: any): void {
    this.works(item.id)
  }

  works(sensorID:number){
    const dispositiveIDStr = this.galleta.get('DispositiveID')
    const dispositiveID = parseInt(dispositiveIDStr)
    this.apiService.getLastData(dispositiveID, sensorID).subscribe(
      data =>{
        this.sensorValue = data
        console.log('Data', data);     
        // , 'Sensor:',sensorID, dispositiveID
      }
    )
  }
}

