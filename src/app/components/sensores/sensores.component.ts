import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';



@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent implements OnInit{

  constructor(private apiService:ApiService){}
  data: any[] = [];
  sensor: any[] = [];

  ngOnInit(){
    const deviceId = 1
    this.apiService.sensoresDeDispositivo(deviceId).subscribe(
      data =>{
        this.sensor = data
        console.log(this.sensor)
      }
    )
  }

  sensorClick(item: any): void {
    this.works(item)
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  works(sensorID:number){
    const deviceId = 8
    this.apiService.getLastData(deviceId, sensorID).subscribe(
      response =>{
        this.data = response; 
        console.log('Datos obtenidos:', this.data, sensorID);     
      }
    )
  }
}

