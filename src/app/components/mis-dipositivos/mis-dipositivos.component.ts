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

  dispositiveIDs: number[] = [];
  dispositivo: any[] = [];
  loading: boolean = true

  constructor(private apiService: ApiService, private galleta:CookieService, private router:Router, private socketexd: SocketService){}

  ngOnInit() {
    this.apiService.getLastDataMejorado().subscribe(
      data => {
        this.dispositivo = data;
        console.log('dispositivos', data);
        this.apiService.HomeDispositivos().subscribe(
          data => {
            this.dispositiveIDs = data;
            if (this.dispositiveIDs && this.dispositiveIDs.length > 0) {
              this.dispositiveIDs.forEach(id => {
                const idStr = id.toString();
                this.socketexd.watchAllData(idStr);
                this.socketexd.ListenData().subscribe(lastData => {
                  console.log('datos recibidos:', lastData);
                });
              });
            }
            this.loading = false; // Ocultamos el spinner cuando los datos se han cargado
          },
          error => {
            this.loading = false; // Ocultamos el spinner en caso de error
          }
        );
      },
      error => {
        this.loading = false; // Ocultamos el spinner en caso de error
      }
    );
  }
  // ngOnInit(){
  //   this.apiService.getLastDataMejorado().subscribe(
  //     data => {
  //       this.dispositivo = data 
  //       console.log('dispositivos',data)
  //       this.apiService.HomeDispositivos().subscribe(
  //         data => {
  //           this.dispositiveIDs = data
  //           console.log('ids',data)
  //           if(this.dispositiveIDs && this.dispositiveIDs.length > 0){
  //             this.dispositiveIDs.forEach(id => {
  //               const idStr = id.toString()
  //               this.socketexd.watchAllData(idStr)
  //               this.socketexd.ListenData().subscribe(lastData => {
  //                 console.log('datos recibidos:', lastData)
  //               })
  //             })
  //           }
  //         }
  //       )
  //     }
  //   )
  // }

  dispositivoClick(DispositiveId: number, sensorId: number) {
    console.log(`DispositivoID: ${DispositiveId}, Sensor ID: ${sensorId}`)
    this.galleta.set('DispositiveID', DispositiveId.toString(),{expires:1})
    this.galleta.set('sensorID',sensorId.toString())
    this.router.navigate(['/sensor'])
  }  
}
