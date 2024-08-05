import { Component, OnInit } from '@angular/core'
import { NbToastrService } from '@nebular/theme'
import { CookieService } from 'ngx-cookie-service'
import { ApiService } from 'src/app/service/api.service'

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent implements OnInit{
  loading: boolean = true
  currentPage = 1;
  itemsPerPage = 15;
  reportTime: any[] = []
  data: any[] = []
  sensor: any[] = []
  sensorValue: any[] = []
  dispositivo: any[] = []

  constructor(private apiService:ApiService, private galleta:CookieService, private tostatda: NbToastrService){}

  filtrarPorFecha(selectedValue: string): void {

    const UglyDateFinish = new Date()
    let dateFinish = UglyDateFinish.toISOString()
    dateFinish = dateFinish.split('.')[0]
    dateFinish = dateFinish.replace('T', ' ')

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
        weekdatabegin = weekdatabegin.split('.')[0]
        weekdatabegin = weekdatabegin.replace('T', ' ')

        console.log(weekdatabegin)
        console.log(dateFinish)
     
        this.apiService.ReportBySensor(weekdatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data
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
        daydatabegin = daydatabegin.split('.')[0]
        daydatabegin = daydatabegin.replace('T', ' ')

        console.log(daydatabegin)
        console.log(dateFinish)
     
        this.apiService.ReportBySensor(daydatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            console.log('reporte por dia',data)
            this.reportTime = data
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
        hrdatabegin = hrdatabegin.split('.')[0]
        hrdatabegin = hrdatabegin.replace('T', ' ')
        
        console.log(hrdatabegin)
        console.log(dateFinish)
     
        this.apiService.ReportBySensor(hrdatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            console.log('reporte por 1hora',data)
            this.reportTime = data
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
        middatabegin = middatabegin.split('.')[0]
        middatabegin = middatabegin.replace('T', ' ')

        console.log(middatabegin)
        console.log(dateFinish)
     
        this.apiService.ReportBySensor(middatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            console.log('reporte por 30min',data)
            this.reportTime = data
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
    this.apiService.sensoresDeDispositivo(DispositiveID).subscribe(
      data => {
        this.sensor = data
        console.log('Sensores del dispositivo',data)
        const UglyDateFinish = new Date()
        let dateFinish = UglyDateFinish.toISOString()
        dateFinish = dateFinish.split('.')[0]
        dateFinish = dateFinish.replace('T', ' ')
        const dispositiveIDStr = this.galleta.get('DispositiveID')
        const dispositiveID = parseInt(dispositiveIDStr)
        const weekDataBegin = new Date(UglyDateFinish)
        weekDataBegin.setDate(UglyDateFinish.getDate() - 7)
        let weekdatabegin = weekDataBegin.toISOString()
        weekdatabegin = weekdatabegin.split('.')[0]
        weekdatabegin = weekdatabegin.replace('T', ' ')
            
        this.apiService.ReportBySensor(weekdatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data
            console.log('reporte',data)
            this.loading = false
          },error => {
            if (error.status === 404){
              this.tostatda.warning('Este sensor no tiene registro en este limite de tiempo','Sin registros :(')
            }
          }
        )
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

  sensorClick(item: any): void {
    this.works(item.id)
    this.galleta.set('sensorID', item.id)
    const UglyDateFinish = new Date()
    let dateFinish = UglyDateFinish.toISOString()
    dateFinish = dateFinish.split('.')[0]
    dateFinish = dateFinish.replace('T', ' ')
    const dispositiveIDStr = this.galleta.get('DispositiveID')
    const dispositiveID = parseInt(dispositiveIDStr)
    const weekDataBegin = new Date(UglyDateFinish)
    weekDataBegin.setDate(UglyDateFinish.getDate() - 7)
    let weekdatabegin = weekDataBegin.toISOString()
    weekdatabegin = weekdatabegin.split('.')[0]
    weekdatabegin = weekdatabegin.replace('T', ' ')

    this.apiService.ReportBySensor(weekdatabegin, dateFinish, item.id, dispositiveID).subscribe(
      data => {
        this.reportTime = data
        console.log('reporte',data)
        data
      },error => {
        if (error.status === 404){
          this.tostatda.warning('Este sensor no tiene registro en este limite de tiempo','Sin registros :(')
        }
      }
    )
  }

  dateClick(): void{
    // this.reporteDeFechas(item)
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

