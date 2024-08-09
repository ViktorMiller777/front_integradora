import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { ApiService } from 'src/app/service/api.service'
import { SocketService } from 'src/app/service/socket.service'

@Component({
  selector: 'app-mis-dipositivos',
  templateUrl: './mis-dipositivos.component.html',
  styleUrls: ['./mis-dipositivos.component.scss']
})
export class MisDipositivosComponent implements OnInit{

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

  constructor(private apiService: ApiService, private galleta:CookieService, private router:Router, private socketexd: SocketService){}

  ngOnInit() {
    this.apiService.getLastDataMejorado().subscribe(
      data => {
        this.dispositivo = data
        console.log('dispositivos', data)

        this.apiService.HomeDispositivos().subscribe(
          data => {
            this.dispositiveIDs = data
            if (this.dispositiveIDs && this.dispositiveIDs.length > 0) {

              this.dispositivo!.forEach((dispositivo,i) => {
                const idStr = dispositivo.DispositiveID

                console.log('value mapeado',this.dispositivo!)
                console.log('id dispositivos',idStr)

                this.socketexd.emit('data:emit', {type:'WatchAllData', dispositiveID:idStr})
                console.log('idstr',idStr)
                this.socketexd.listen('data:listen').subscribe(lastData => {
                  // console.log('datos recibidos:', lastData)
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

  dispositivoClick(DispositiveId: number, sensorId: number) {
    console.log(`DispositivoID: ${DispositiveId}, Sensor ID: ${sensorId}`)
    this.galleta.set('DispositiveID', DispositiveId.toString(),{expires:1})
    this.galleta.set('sensorID',sensorId.toString())
    this.router.navigate(['/sensor'])
  }  
}
