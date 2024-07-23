import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


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


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://127.0.0.1:3333'

  constructor(private http:HttpClient) { }

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
}
