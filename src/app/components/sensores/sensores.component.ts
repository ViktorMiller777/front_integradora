import { Component, OnInit } from '@angular/core'
import { NbToastRef, NbToastrService } from '@nebular/theme'
import { CookieService } from 'ngx-cookie-service'
import { Subscription } from 'rxjs'
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
  selectedDateFilter:string="6"
  selectedSensor: any = 0
  toastRef: NbToastRef | null = null
  orderBy:number = 1
  orderByControl:number = 1

  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20; 

  listener:Subscription | null = null

  unit:string = ''

  constructor(private apiService:ApiService, private galleta:CookieService, private tostatda: NbToastrService, private socket:SocketService){}

  ordenar(option: number): void {
    if (this.orderByControl === option) {
      return
    }
    
    this.reportTime.reverse()
    this.orderByControl = option
    this.paginateItems()
  }

  totalPages(): number {
    return Math.ceil(this.reportTime.length / this.itemsPerPage);
  }

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
      case '6':
        const yearDataBegin = new Date(UglyDateFinish)
        yearDataBegin.setFullYear(UglyDateFinish.getFullYear() - 1000)
        let yeardatabegin = yearDataBegin.toISOString()
        yeardatabegin = yeardatabegin.split('.')[0].replace('T', ' ')
     
        this.apiService.ReportBySensor(yeardatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data[0].data
            this.reportTime.reverse()
            this.orderByControl = 1
            this.paginateItems()

            data
          },error => {
            if (error.status === 404){
              if (this.toastRef !== null) {
                this.toastRef.close()
              }
              this.toastRef = this.tostatda.warning('Este sensor aún no tiene datos','Sin registros')
              this.loading = false
            }
          }
        )
        break
      case '5':
        const monthDataBegin = new Date(UglyDateFinish)
        monthDataBegin.setMonth(UglyDateFinish.getMonth() - 1)
        let monthdatabegin = monthDataBegin.toISOString()
        monthdatabegin = monthdatabegin.split('.')[0].replace('T', ' ')

        this.apiService.ReportBySensor(monthdatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data[0].data
            this.reportTime.reverse()
            this.orderByControl = 1
            this.paginateItems()
            data
          },error => {
            if (error.status === 404){
              if (this.toastRef !== null) {
                this.toastRef.close()
              }
              this.toastRef = this.tostatda.warning('Este sensor no tiene datos con esta configuración','Sin registros')
              this.selectedDateFilter = '6'
              this.filtrarPorFecha(this.selectedDateFilter)
                        }
          }
        )
        break
      case '4':
        const weekDataBegin = new Date(UglyDateFinish)
        weekDataBegin.setDate(UglyDateFinish.getDate() - 7)
        let weekdatabegin = weekDataBegin.toISOString()
        weekdatabegin = weekdatabegin.split('.')[0].replace('T',' ')

        this.apiService.ReportBySensor(weekdatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data[0].data
            this.reportTime.reverse()
            this.orderByControl = 1
            this.paginateItems()
            data
          },error => {
            if (error.status === 404){
              if (this.toastRef !== null) {
                this.toastRef.close()
              }
              this.toastRef = this.tostatda.warning('Este sensor no tiene datos con esta configuración','Sin registros')
              this.selectedDateFilter = '5'
              this.filtrarPorFecha(this.selectedDateFilter)            }
          }
        )
        break
      case '3':
        const dayDataBegin = new Date(UglyDateFinish)
        dayDataBegin.setDate(UglyDateFinish.getDate() - 1)
        let daydatabegin = dayDataBegin.toISOString()
        daydatabegin = daydatabegin.split('.')[0].replace('T', ' ')
     
        this.apiService.ReportBySensor(daydatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data[0].data
            this.reportTime.reverse()
            this.orderByControl = 1
            this.paginateItems()
          },error => {
            if (error.status === 404){
              if (this.toastRef !== null) {
                this.toastRef.close()
              }
              this.toastRef = this.tostatda.warning('Este sensor no tiene datos con esta configuración','Sin registros')
              this.selectedDateFilter = '4'
              this.filtrarPorFecha(this.selectedDateFilter)            }
          }
        )      
        break
      case '2':
        const hrDataBegin = new Date(UglyDateFinish)
        hrDataBegin.setHours(UglyDateFinish.getHours() - 1)
        let hrdatabegin = hrDataBegin.toISOString()
        hrdatabegin = hrdatabegin.split('.')[0].replace('T', ' ')
     
        this.apiService.ReportBySensor(hrdatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data[0].data
            this.orderByControl = 1
            this.reportTime.reverse()
            this.paginateItems()
          },error => {
            if (error.status === 404){
              if (this.toastRef !== null) {
                this.toastRef.close()
              }
              this.toastRef = this.tostatda.warning('Este sensor no tiene datos con esta configuración','Sin registros')
              this.selectedDateFilter = '3'
              this.filtrarPorFecha(this.selectedDateFilter)            }
          }
        ) 
        break
      case '1':
        const midDataBegin = new Date(UglyDateFinish)
        midDataBegin.setMinutes(UglyDateFinish.getMinutes() - 30)
        let middatabegin = midDataBegin.toISOString()
        middatabegin = middatabegin.split('.')[0].replace('T', ' ')

        this.apiService.ReportBySensor(middatabegin, dateFinish, sensorID, dispositiveID).subscribe(
          data => {
            this.reportTime = data[0].data
            this.reportTime.reverse()
            this.orderByControl = 1
            this.paginateItems()
          },error => {
            if (error.status === 404){
              if (this.toastRef !== null) {
                this.toastRef.close()
              }
              this.toastRef = this.tostatda.warning('Este sensor no tiene datos con esta configuración','Sin registros')
              this.selectedDateFilter = '2'
              this.filtrarPorFecha(this.selectedDateFilter)            }
          }
        ) 
        break
      default:
        break
    }
  }

  paginateItems() {
    this.ordenar(this.orderBy)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.paginatedItems = this.reportTime.slice(startIndex, endIndex)
  }

  changePage(page: number) {
    this.currentPage = page
    this.paginateItems()
  }

  ngOnDestroy(): void {
    this.socket.disconnect()
    if(this.listener!=null){
      this.listener.unsubscribe()
    }
  }

  ngOnInit(){
    this.socket.connect()
    const DispositiveIDStr = this.galleta.get('DispositiveID')
    const DispositiveID = parseInt(DispositiveIDStr)
    this.selectedSensor = parseInt(this.galleta.get('sensorID'))
    this.apiService.sensoresDeDispositivo(DispositiveID).subscribe(
      data => {
        this.sensor = data
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
            this.unit = data[0].unit
            this.reportTime = data[0].data
            this.reportTime.reverse()
            this.orderByControl = 1
            this.paginateItems()
            this.watchData()
    
            this.loading = false
          },error => {
            if (error.status === 404){
              this.tostatda.warning('Este sensor aún no tiene datos','Sin registros')
              this.loading = false
            }
          }
        )
        
        this.watchData()

      }
    )
    
    const dispositiveIDStr = this.galleta.get('DispositiveID')
    const dispositiveID = parseInt(dispositiveIDStr)
    const sensorIDStr = this.galleta.get('sensorID')
    const sensorID = parseInt(sensorIDStr)

  }

  async watchData(){
    const dispositiveIDSocketStr = parseInt(this.galleta.get('DispositiveID'))
    const sensorIDSocketStr = parseInt(this.galleta.get('sensorID'))
    if(this.listener!=null){
      this.listener.unsubscribe()
    }
    await this.socket.disconnect()
    await this.socket.connect()
    this.socket.emit('data:emit',{type:'WatchLastData',dispositiveID:dispositiveIDSocketStr ,sensorID:sensorIDSocketStr}) //QUITAR EL HARDCODEO Y PONER EL VALOR DESDE LAS COOKIES
    this.listener = this.socket.listen('data:listen').subscribe(lastData =>{
      if(lastData.sensorID == sensorIDSocketStr && lastData.type == "lastData"){
        if(this.orderBy==1){
          this.reportTime.pop()
          this.reportTime.unshift(lastData.data)
          
        }else{
          this.reportTime.shift()
          this.reportTime.push(lastData.data)

        }
        this.paginateItems()

        
      }
    })
  }


  //^^^^ESTO DE ARRIBA ES LO QUE LE AGREGUE PAR APODER VERIFICAR LA PAGINACION DE LA TABLA DE LOS SENSORES ^^^^
  sensorClick(item: any): void {
    this.galleta.set('sensorID', item.id)
    const UglyDateFinish = new Date()
    let dateFinish = UglyDateFinish.toISOString()
    dateFinish = dateFinish.split('.')[0].replace('T', ' ')
    const dispositiveIDStr = this.galleta.get('DispositiveID')
    const dispositiveID = parseInt(dispositiveIDStr)
    const yearDataBegin = new Date(UglyDateFinish)
    yearDataBegin.setFullYear(UglyDateFinish.getFullYear() - 1000)
    let yeardatabegin = yearDataBegin.toISOString()
    yeardatabegin = yeardatabegin.split('.')[0].replace('T', ' ')

    this.apiService.ReportBySensor(yeardatabegin, dateFinish, item.id, dispositiveID).subscribe(
      data => {
        this.unit = data[0].unit
        this.reportTime = data[0].data
        this.reportTime.reverse()
        this.orderByControl = 1
        this.paginateItems()
        this.watchData()
        data
      },error => {
        if (error.status === 404){
          this.tostatda.warning('Este sensor no tiene datos con esta configuración','Sin registros')
        }
      }
    )
  }
  
}

