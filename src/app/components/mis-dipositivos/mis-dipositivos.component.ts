import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-mis-dipositivos',
  templateUrl: './mis-dipositivos.component.html',
  styleUrls: ['./mis-dipositivos.component.scss']
})
export class MisDipositivosComponent implements OnInit{

  dispositivo: any[] = [];
  constructor(private apiService: ApiService){}

  ngOnInit():void{
    this.apiService.getLastDataPackAPunch().subscribe(
      data =>{
        this.dispositivo = data
        console.log('estos son los datos',data)
      }
    )
  }

  // brazalet=[{
  //   name: 'Bolillo :D'
  // }]
}
