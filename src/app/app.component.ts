import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Integral';
  selectedItem = ''; 
  role = this.galleta.get('role')

  constructor(private galleta: CookieService, private router: Router) {}

  logout() {
    this.galleta.delete('token');
    this.galleta.delete('DispositiveID');
    this.galleta.delete('sensorID');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.galleta.check('token');
  }
}
