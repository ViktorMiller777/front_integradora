import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';


interface LoginResponse{
  token:{
    token:string
  },
  role_id:number
}

interface RegisterResponse{
}

interface RecuperarContrasenaResponse{
}

interface NuevaContrasenaResponse{
}

interface VerificarCodigoResponse{
}

interface HomeDispositivosResponse{
    DispositiveID:number[]
}



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // url = 'http://64.23.129.36:3333'
  url = 'http://64.23.129.36:3333'

  constructor(private http:HttpClient, private galleta:CookieService) { }

  //servicio para login 
  login(userData:any):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.url}/api/auth/login`,userData)
  }
  //ruta para registra
  register(userData:any):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.url}/api/auth/register`,userData)
  }

  //servicio para recuperar contrasena olvidada 
  recuperarContrasena(userData:any):Observable<RecuperarContrasenaResponse>{
    return this.http.post<RecuperarContrasenaResponse>(`${this.url}/api/auth/forgot-password`, userData)
  }

  //servicio para crear nueva contraseña
  nuevaContrasena(userData:any):Observable<NuevaContrasenaResponse>{
    return this.http.post<NuevaContrasenaResponse>(`${this.url}/api/auth/new-password`,userData)
  }

  //servicio para verificar la cuenta registrada
  verficarCodigo(userData:any):Observable<VerificarCodigoResponse>{
    return this.http.post<VerificarCodigoResponse>(`${this.url}/api/auth/verify-account`, userData)
  }

  //Servicio para mostrar todos los dispositivos con su sensor y el lastdata del sensor del usuario que esta logueado
  getLastDataMejorado():Observable<any>{
    const token = this.galleta.get('token')
    const headers = new  HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<any>(`${this.url}/api/dispositives/show`,{headers})
  }

  getLastDataMejoradoPorID(userID:string):Observable<any>{
    const token = this.galleta.get('token')
    const headers = new  HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<any>(`${this.url}/api/dispositives/adminShow/${userID}`,{headers})
  }

  crearDispositivo(data:any):Observable<any>{
    const token = this.galleta.get('token')
    const headers = new  HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<any>(`${this.url}/api/dispositives/create`,data,{headers})
  }
  //servicio para mostrar los sensores de un dispositivo por su dispositiveID
  sensoresDeDispositivo(dispositiveID: number): Observable<any> {
    const token = this.galleta.get('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`,)
    return this.http.post<any>(`${this.url}/api/sensors/sensor-list`, {dispositiveID}, {headers});
  }

  //servicio para obtener el ultimo dato de un sensor en especifico 
  getLastData(dispositiveID:number, sensorID:number){
    return this.http.post<any>(`${this.url}/api/sensors/last-data`, {dispositiveID, sensorID})
  }

  //servicio para obtener los Id de todos los dispositivos del usuario logueado
  HomeDispositivos(): Observable<number[]> {
    const token = this.galleta.get('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<any[]>(`${this.url}/api/dispositives/show`, { headers }).pipe(
      map(response => {
        return response.map(dispositivo => dispositivo.DispositiveID);
      })
    );
  }

  //servicio para obtener todos los datos por fecha de un sensor en especifico y su dispositivo
  ReportBySensor(dateBegin:string, dateFinish:string, sensorID:number, dispositiveID:number){
    const token = this.galleta.get('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<any>(`${this.url}/api/sensors/report-by-sensor`, {dateBegin, dateFinish, sensorID, dispositiveID}, {headers})
  }


  //servicio para mostrar todos los usuarios existentes en mi base de datos
  listaUsuarios():Observable<any>{
    const token = this.galleta.get('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<any>(`${this.url}/api/users`,{headers})

  }
}
