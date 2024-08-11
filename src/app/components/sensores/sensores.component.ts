import { Component, OnInit } from '@angular/core'
import { NbToastrService } from '@nebular/theme'
import { CookieService } from 'ngx-cookie-service'
import { ApiService } from 'src/app/service/api.service'
import { SocketService } from 'src/app/service/socket.service'

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent implements OnInit{
  loading: boolean = true
  reportTime: any[] = []
  data: any[] = []
  sensor: any[] = []
  sensorValue: any[] = []
  dispositivo: any[] = []

  constructor(private apiService:ApiService, private galleta:CookieService, private tostatda: NbToastrService, private socket:SocketService){}

  filtrarPorFecha(selectedValue: string): void {

    const UglyDateFinish = new Date()
    UglyDateFinish.setHours(UglyDateFinish.getHours() - 6)
    let dateFinish = UglyDateFinish.toISOString()
    dateFinish = dateFinish.split('.')[0].replace('T', ' ')

    const sensorIDStr = this.galleta.get('sensorID')
    const sensorID = parseInt(sensorIDStr)
    const dispositiveIDStr = this.galleta.get('DispositiveID')
    const dispositiveID = parseInt(dispositiveIDStr)
   
    switch (selectedValue) {
      case '1':
        //fecha que se restara a la fecha acutal en formato ISO
        const weekDataBegin = new Date(UglyDateFinish)
        weekDataBegin.setDate(UglyDateFinish.getDate() - 7)
        let weekdatabegin = weekDataBegin.toISOString()
        weekdatabegin = weekdatabegin.split('.')[0].replace('T',' ')

        console.log(weekdatabegin)
        console.log(dateFinish)
     
        this.apiService.ReportBySensor(weekdatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data[0].data
            console.log('reporte por semana',data)
            data
          },error => {
            if (error.status === 404){
              this.tostatda.warning('Este sensor no tiene registro en este limite de tiempo','Sin registros :(')
            }
          }
        )
        break
      case '2':
        const dayDataBegin = new Date(UglyDateFinish)
        dayDataBegin.setDate(UglyDateFinish.getDate() - 1)
        let daydatabegin = dayDataBegin.toISOString()
        daydatabegin = daydatabegin.split('.')[0].replace('T', ' ')

        console.log(daydatabegin)
        console.log(dateFinish)
     
        this.apiService.ReportBySensor(daydatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            console.log('reporte por dia',data)
            this.reportTime = data[0].data
          },error => {
            if (error.status === 404){
              this.tostatda.warning('Este sensor no tiene registro en este limite de tiempo','Sin registros :(')
            }
          }
        )      
        break
      case '3':
        const hrDataBegin = new Date(UglyDateFinish)
        hrDataBegin.setHours(UglyDateFinish.getHours() - 1)
        let hrdatabegin = hrDataBegin.toISOString()
        hrdatabegin = hrdatabegin.split('.')[0].replace('T', ' ')
        
        console.log(hrdatabegin)
        console.log(dateFinish)
     
        this.apiService.ReportBySensor(hrdatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            console.log('reporte por 1hora',data)
            this.reportTime = data[0].data
          },error => {
            if (error.status === 404){
              this.tostatda.warning('Este sensor no tiene registro en este limite de tiempo','Sin registros :(')
            }
          }
        ) 
        break
      case '4':
        const midDataBegin = new Date(UglyDateFinish)
        midDataBegin.setMinutes(UglyDateFinish.getMinutes() - 30)
        let middatabegin = midDataBegin.toISOString()
        middatabegin = middatabegin.split('.')[0].replace('T', ' ')

        console.log(middatabegin)
        console.log(dateFinish)
     
        this.apiService.ReportBySensor(middatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            console.log('reporte por 30min',data)
            this.reportTime = data[0].data
          },error => {
            if (error.status === 404){
              this.tostatda.warning('Este sensor no tiene registro en este limite de tiempo','Sin registros :(')
            }
          }
        ) 
        break
      default:
        break
    }
  }

  ngOnInit(){
    const DispositiveIDStr = this.galleta.get('DispositiveID')
    const DispositiveID = parseInt(DispositiveIDStr)
    this.apiService.sensoresDeDispositivo(7).subscribe(
      data => {
        this.sensor = data
        console.log('Sensores del dispositivo',data)
        const UglyDateFinish = new Date()
        let dateFinish = UglyDateFinish.toISOString()
        dateFinish = dateFinish.split('.')[0].replace('T', ' ')
        const dispositiveIDStr = this.galleta.get('DispositiveID')
        const dispositiveID = parseInt(dispositiveIDStr)
        const weekDataBegin = new Date(UglyDateFinish)
        weekDataBegin.setDate(UglyDateFinish.getDate() - 7)
        let weekdatabegin = weekDataBegin.toISOString()
        weekdatabegin = weekdatabegin.split('.')[0].replace('T', ' ')
            
        this.apiService.ReportBySensor(weekdatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data[0].data
            console.log('Reportes',data)
            this.loading = false
          },error => {
            if (error.status === 404){
              this.tostatda.warning('Este sensor no tiene registro en este limite de tiempo','Sin registros :(')
            }
          }
        )
        const dispositiveIDSocketStr = this.galleta.get('DispositiveID')
        const sensorIDSocketStr = this.galleta.get('sensorID')
      
        
        //SOCKETE SOCKETE SOCKETE SOCKETE SOCKETESOCKETESOCKETE SOCKETE SOCKETESOCKETE
        this.socket.emit('data:emit',{typer:'WatchLastData',dispositiveID:dispositiveIDSocketStr ,sensorID:sensorIDSocketStr}) //QUITAR EL HARDCODEO Y PONER EL VALOR DESDE LAS COOKIES
        this.socket.listen('data:listen').subscribe(lastData =>{
          console.log('datos recibidos WatchLastData',lastData)
          if(lastData.sensorID == parseInt(sensorIDSocketStr)){
            this.reportTime.shift()
            this.reportTime.push(lastData.data)
          }
        })
        //SOCKETE SOCKETE SOCKETE SOCKETE SOCKETESOCKETESOCKETE SOCKETE SOCKETESOCKETE

      }
    )
    
    const dispositiveIDStr = this.galleta.get('DispositiveID')
    const dispositiveID = parseInt(dispositiveIDStr)
    const sensorIDStr = this.galleta.get('sensorID')
    const sensorID = parseInt(sensorIDStr)
    this.apiService.getLastData(dispositiveID, sensorID).subscribe(
      data =>{
        this.sensorValue = data
        console.log('Data', data)    
      }
    )
  }


  //^^^^ESTO DE ARRIBA ES LO QUE LE AGREGUE PAR APODER VERIFICAR LA PAGINACION DE LA TABLA DE LOS SENSORES ^^^^
  sensorClick(item: any): void {
    this.works(item.id)
    this.galleta.set('sensorID', item.id)
    const UglyDateFinish = new Date()
    let dateFinish = UglyDateFinish.toISOString()
    dateFinish = dateFinish.split('.')[0].replace('T', ' ')
    const dispositiveIDStr = this.galleta.get('DispositiveID')
    const dispositiveID = parseInt(dispositiveIDStr)
    const weekDataBegin = new Date(UglyDateFinish)
    weekDataBegin.setDate(UglyDateFinish.getDate() - 7)
    let weekdatabegin = weekDataBegin.toISOString()
    weekdatabegin = weekdatabegin.split('.')[0].replace('T', ' ')

    this.apiService.ReportBySensor(weekdatabegin, dateFinish, item.id, dispositiveID).subscribe(
      data => {
        this.reportTime = data[0].data
        console.log('reporte',data)
        data
      },error => {
        if (error.status === 404){
          this.tostatda.warning('Este sensor no tiene registro en este limite de tiempo','Sin registros :(')
        }
      }
    )
  }
  
  works(sensorID:number){
    const dispositiveIDStr = this.galleta.get('DispositiveID')
    const dispositiveID = parseInt(dispositiveIDStr)
    this.apiService.getLastData(dispositiveID, sensorID).subscribe(
      data =>{
        this.sensorValue = data
        console.log('Data', data)   
      }
    )
  }
}

