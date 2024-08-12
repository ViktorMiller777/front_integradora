import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit{
  ids:any[]=[]
  usuarios:any[]=[]
  constructor(private apiService:ApiService, private galleta:CookieService, private router:Router){
  }

  ngOnInit(): void {
    this.apiService.listaUsuarios().subscribe(
      response =>{
        this.usuarios = response.data
        console.log('lista de usuarios',response.data)

      }
    )
  }

  sacarID(id: number): void {
    console.log('ID del usuario:', id);
    this.galleta.set('userID',id.toString())
    this.router.navigate(['/mis-dispositivos'])
  }
}
