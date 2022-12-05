import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { PlanesVendidos } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private urlEndPoint: string = "http://localhost:8080/gym";

  constructor(private http: HttpClient, private router: Router) { }

  getPlanes() {
    return this.http.get(this.urlEndPoint + '/planesvendidos');
  }

  getClientes() {
    return this.http.get(this.urlEndPoint + '/clientesregistrados');
  }

  getProductos() {
    return this.http.get(this.urlEndPoint + '/cantidadproductos');
  }

  getCursos() {
    return this.http.get(this.urlEndPoint + '/cantidadcursos');
  }

  getCcomprobantes() {
    return this.http.get(this.urlEndPoint + '/gananciasmembresia');
  }

  getPComprobantes(mes: string, tipo: number) {
    return this.http.get(`${this.urlEndPoint}/gananciasproductos/${mes}/${tipo}`).pipe(

      catchError(e => {
        if (e.error) {
          console.log(e.error);
          Swal.fire('No hay comprobantes', `No existen ventas realizadas en el mes de ${mes}`, 'error');
        }
        if (e.status == 400) {
          return throwError(() => e);
        }
        return throwError(() => e);
      })
    );
  }

  getCComprobantes(mes: string) {
    return this.http.get(`${this.urlEndPoint}/gananciascursos/${mes}`).pipe(

      catchError(e => {
        if (e.error) {
          console.log(e.error);
          Swal.fire('No hay comprobantes', `No existen ventas realizadas en el mes de ${mes}`, 'error');
        }
        if (e.status == 400) {
          return throwError(() => e);
        }
        return throwError(() => e);
      })
    )
  }
}
