import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = route.data['role'] as string;
    if (this.authService.hasRole(role)) {
      return true;
    }
    let usuario = this.authService.usuario;
    Swal.fire('Acceso denegado', `Hola ${usuario.nombre} no tienes acceso a este recurso`, 'warning');
    /*this.router.navigate(['/login']);*/
    if (usuario.roles[0] === 'ROLE_ADMIN') {
      this.router.navigate(['/dashboard']);
    } else if (usuario.roles[0] === 'ROLE_USER') {
      this.router.navigate(['/espacio']);
    }
    return false;
  }

}
