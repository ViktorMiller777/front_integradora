import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }


  //servicio para mostar el ultimo dato de todos lo sensores de un dispositivo
  watchAllData(dispositiveID: string) {
    this.socket.emit('data:emit', { type: 'WatchAllData', dispositiveID })
  }

  //servicio para mostrar el lastdata de un sensor de un dispositivo
  watchLastData(dispositiveID: string, sensorID: string) {
    this.socket.emit('data:emit', { type: 'WatchLastData', dispositiveID, sensorID })
  }

  ListenData() {
    return this.socket.fromEvent('data:listen')
  }

  // listen(eventName:string):Observable<any>{
  //   return this.socket.fromEvent(eventName)
  // }

  // emit(eventName:string, data:any){
  //   this.socket.emit(eventName,data)
  // }
}
