import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { Observable, Subscription } from 'rxjs'
import { ApiService } from 'src/app/service/api.service'
import { SocketService } from 'src/app/service/socket.service'
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component'
import { NbDialogService } from '@nebular/theme'

@Component({
  selector: 'app-mis-dipositivos',
  templateUrl: './mis-dipositivos.component.html',
  styleUrls: ['./mis-dipositivos.component.scss']
})
export class MisDipositivosComponent implements OnInit, OnDestroy{

  dispositiveIDs: number[] = []

  dispositivo:[{
    DispositiveID: number
    Sensors:[{
      sensorID:number
      sensorType:string
      unit:string
      active:boolean
      data:[{value:string}]
    }]
    name:string
    type:string
    userdID:number
  }] | null = null
  loading: boolean = true
  listener: Subscription | null = null


  constructor(private dialogService: NbDialogService,private apiService: ApiService, private galleta:CookieService, private router:Router, private socketexd: SocketService){}
  ngOnDestroy(): void {
    this.socketexd.disconnect()
    if(this.listener!=null){
      this.listener.unsubscribe()
    }
  }

  ngOnInit() {
    this.socketexd.connect()
    let role = this.galleta.get('role')
    if(role == 'admin'){
        let userID = this.galleta.get('userID')
        this.apiService.getLastDataMejoradoPorID(userID).subscribe( data =>{
          this.dispositivo = data

          this.apiService.HomeDispositivos().subscribe(
            data => {
              this.dispositiveIDs = data
              if (this.dispositiveIDs && this.dispositiveIDs.length > 0) {
  
                this.dispositivo!.forEach((dispositivo,i) => {
                  const idStr = dispositivo.DispositiveID
  
                  this.socketexd.emit('data:emit', {type:'WatchAllData', dispositiveID:idStr})
                  this.listener = this.socketexd.listen('data:listen').subscribe(lastData => {
  
                    if(lastData.type=="AllData"){
                      const datos:[{
                        sensorID: number
                        data:{
                          value:string
                        }
                      }] = lastData.data
                      datos.forEach(data =>  {
                        dispositivo!.Sensors.forEach((Sensor,o) => {
                          if (Sensor.sensorID === data.sensorID){
                            this.dispositivo![i].Sensors[o].data[0].value = data.data.value
                          }
                        })
                      }
                      )
  
                    }
                  })
                })
              }
              this.loading = false
            },
            error => {
              this.loading = false
            }
          )
        }
        )
    }else{
      this.apiService.getLastDataMejorado().subscribe(
        data => {
          this.dispositivo = data

            this.apiService.HomeDispositivos().subscribe(
              data => {
                this.dispositiveIDs = data
                if (this.dispositiveIDs && this.dispositiveIDs.length > 0) {
    
                  this.dispositivo!.forEach((dispositivo,i) => {
                    const idStr = dispositivo.DispositiveID
    
                    this.socketexd.emit('data:emit', {type:'WatchAllData', dispositiveID:idStr})
                    this.listener = this.socketexd.listen('data:listen').subscribe(lastData => {
    
                      if(lastData.type=="AllData"){
                        const datos:[{
                          sensorID: number
                          data:{
                            value:string
                          }
                        }] = lastData.data
                        datos.forEach(data =>  {
                          dispositivo!.Sensors.forEach((Sensor,o) => {
                            if (Sensor.sensorID === data.sensorID){
                              this.dispositivo![i].Sensors[o].data[0].value = data.data.value
                            }
                          })
                        }
                        )
    
                      }
                    })
                  })
                }
                this.loading = false
              },
              error => {
                this.loading = false
              }
            )
          

        },
        error => {
          this.loading = false
        }
      )
    }
  }

  dispositivoClick(DispositiveId: number, sensorId: number) {
    console.log(`DispositivoID: ${DispositiveId}, Sensor ID: ${sensorId}`)
    this.galleta.set('DispositiveID', DispositiveId.toString(),{expires:1})
    this.galleta.set('sensorID',sensorId.toString())
    this.router.navigate(['/sensor'])
    if(this.listener!=null){
      this.listener.unsubscribe()
    }
  }  
  openDialog() {
    this.dialogService.open(DeviceDialogComponent)
      .onClose.subscribe(deviceData => {
        if (deviceData) {

          console.log('Dispositivo registrado:', deviceData)
          this.apiService.getLastDataMejorado().subscribe(
            data => {
              this.dispositivo = data
            })
          }
      });
  }
}
