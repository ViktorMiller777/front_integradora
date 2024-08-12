import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeminGuard implements CanActivate {

  constructor(private galleta: CookieService, private tomate: Router, private tostada: NbToastrService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.galleta.get('token')) {
      return true;
    }
    this.tostada.danger('Error', 'Por favor primero inicia sesion')
    this.tomate.navigate(["/login"])
    return false;
  }
}
