import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLogged: boolean = false
  title = 'Integral';
  selectedItem =''

  constructor(private galleta:CookieService, private router:Router){}

  ngOnInit(){
    this.isLogged = this.galleta.check('token');
  }

  logout(){
    this.galleta.delete('token')
    this.galleta.delete('DispositiveID')
    this.galleta.delete('sensorID')
    this.isLogged = true
    this.router.navigate(['/login'])
  }
}
