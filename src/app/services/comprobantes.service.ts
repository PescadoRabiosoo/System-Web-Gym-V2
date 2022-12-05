import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ComprobanteCurso } from '../models/comprobante-curso.model';
import { ComprobanteMembresia } from '../models/comprobante-membresia.model';
import { ComprobanteProducto } from '../models/comprobante-producto.model';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesService {

  private urlEndPoint: string = "http://localhost:8080/gym/comprobantemembresias";
  private urlProducto: string = "http://localhost:8080/gym/comprobanteproductos";
  private urlCurso: string = "http://localhost:8080/gym/comprobantecursos";

  constructor(private http: HttpClient) { }

  create(comprobanteMembresia: ComprobanteMembresia, membresia: number, hora: number): Observable<ComprobanteMembresia> {

    return this.http.post<ComprobanteMembresia>(`${this.urlEndPoint}/${membresia}/${hora}`, comprobanteMembresia).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(() => e);
        }

        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }

        return throwError(() => e);
      })
    );

  }

  generarCompra(comprobante: ComprobanteProducto): Observable<ComprobanteProducto> {
    return this.http.post<ComprobanteProducto>(this.urlProducto, comprobante);
  }

  generarCompraC(comprobante: ComprobanteCurso): Observable<ComprobanteCurso> {
    return this.http.post<ComprobanteCurso>(this.urlCurso, comprobante);
  }
}
