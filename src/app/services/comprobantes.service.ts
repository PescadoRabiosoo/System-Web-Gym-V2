import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ComprobanteMembresia } from '../models/comprobante-membresia.model';

@Injectable({
  providedIn: 'root'
})
export class ComprobantesService {

  private urlEndPoint: string = "http://localhost:8080/gym/comprobantemembresias";

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
}
