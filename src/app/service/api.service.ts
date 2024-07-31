import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';


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

interface HomeDispositivosResponse{
    DispositiveID:number[]
}



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://127.0.0.1:3333'

  constructor(private http:HttpClient, private galleta:CookieService) { }

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
  getLastDataMejorado():Observable<any>{
    const token = this.galleta.get('token')
    const headers = new  HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<any>(`${this.url}/api/dispositives/show`,{headers})
  }

  //ruta para mostrar los sensores de un dispositivo
  sensoresDeDispositivo(dispositiveID: number): Observable<any> {
    return this.http.post<any>(`${this.url}/api/sensors/sensor-list`, {dispositiveID});
  }

  //ruta para obtener el ultimo dato de un sensor en especifico
  getLastData(dispositiveID:number, sensorID:number){
    return this.http.post<any>(`${this.url}/api/sensors/last-data`, {dispositiveID, sensorID})
  }

  //servicio para obtener los Id de todos los dispositivos del usuario logueado
  HomeDispositivos(): Observable<number[]> {
    const token = this.galleta.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.url}/api/dispositives/show`, { headers }).pipe(
      map(response => {
        return response.map(dispositivo => dispositivo.DispositiveID);
      })
    );
  }
}
