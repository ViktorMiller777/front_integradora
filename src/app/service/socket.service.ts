import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private subscriptions: Subscription[] = [];

  constructor(private socket: Socket) {}

  async connect() {
    await this.socket.connect();
  }

  async disconnect() {
    // Desuscribirse de todos los eventos antes de desconectar
    this.unsubscribeAll();
    await this.socket.disconnect();
  }

  listen(eventName: string): Observable<any> {
    const observable = this.socket.fromEvent(eventName);
    const subscription = observable.subscribe(); // Suscribirse al evento
    this.subscriptions.push(subscription);
    return observable;
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  private unsubscribeAll() {
    // Desuscribirse de todas las suscripciones activas
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}