import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


interface LoginResponse{
  token:{
    token:string
  }
}

interface RegisterResponse{
}

interface RecuperarContrasenaResponse{
}

interface NuevaContrasenaResponse{
}

interface VerificarCodigoResponse{
}

interface getLastDataPackAPunchResponse{
  Sensors:[]
}



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://127.0.0.1:3333'

  constructor(private http:HttpClient, private galleta:CookieService) { }

  //ruta para mostar el last_data 
  getLastData(dispositiveID:number, sensorID:number){
    return this.http.post<any>(`${this.url}/api/sensors/last-data`, {dispositiveID, sensorID})
  }

  //ruta para mostra los sensores de 1 dispositivo en especial
  sensoresDeDispositivo(dispositiveID: number): Observable<any> {
    return this.http.post<any>(`${this.url}/api/sensors/sensor-list`, {dispositiveID});
  }

  // ruta que muestra todos los dispositivos de un usuario nada mas, falta que me muestre los sensores y su last data de ese dispositivo
  // dispositivosPorUsuario(): Observable<any>{
  //   const token = this.galleta.get('token')
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  //   return this.http.get<any>(`${this.url}/api/dispositives/show`, {headers})
  // }

  //ruta para login nota: cambiar a la ruta de la api
  login(userData:any):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.url}/api/auth/login`,userData)
  }
  //ruta para registra nota: cambiar a la ruta de la api
  register(userData:any):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.url}/api/auth/register`,userData)
  }

  //Ruta para recuperar contrasena olvidada 
  recuperarContrasena(userData:any):Observable<RecuperarContrasenaResponse>{
    return this.http.post<RecuperarContrasenaResponse>(`${this.url}/api/auth/forgot-password`, userData)
  }

  //ruta para el formulario de crear nueva contraseña
  nuevaContrasena(userData:any):Observable<NuevaContrasenaResponse>{
    return this.http.post<NuevaContrasenaResponse>(`${this.url}/api/auth/new-password`,userData)
  }

  //ruta para verificar la cuenta registrada
  verficarCodigo(userData:any):Observable<VerificarCodigoResponse>{
    return this.http.post<VerificarCodigoResponse>(`${this.url}/api/auth/verify-account`, userData)
  }

  //funcion para mostrar todos los dispositivos con su sensor y el lastdata del sensor del usuario que esta logueado
  getLastDataPackAPunch():Observable<any>{
    const token = this.galleta.get('token')
    const headers = new  HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<any>(`${this.url}/api/dispositives/show`,{headers})
  }
}
