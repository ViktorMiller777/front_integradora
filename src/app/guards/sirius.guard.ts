import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class SiriusGuard implements CanActivate {

  constructor(
    private galleta: CookieService, 
    private tomate: Router, 
    private tostada: NbToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const role = this.galleta.get('role');
  
    if (role === 'admin') {
      return true;
    }
  
    this.tostada.danger('Acceso denegado', 'No tienes permiso para acceder a esta sección');
    this.tomate.navigate(["/login"]);
    return false;
  }
}
