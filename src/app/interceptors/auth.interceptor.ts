import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError(e => {
                if (e.status == 401) {

                    if (this.authService.isAuthenticated()) {
                        this.authService.logout();
                    }

                    this.router.navigate(['/login']);
                }
                if (e.status == 403) {
                    swal.fire('Acceso denegado', `Hola ${this.authService.usuario.nombre} no tienes acceso al recurso!`, 'warning');
                }
                return throwError(() => e);
            })

        );
    }
}