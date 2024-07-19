import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


interface LoginResponse{
}

interface RegisterResponse{
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
}
