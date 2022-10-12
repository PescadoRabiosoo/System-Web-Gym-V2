import { DatePipe } from '@angular/common';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Entrenador } from '../models/entrenador.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  private urlEndPoint: string = "http://localhost:8080/gym/entrenadores";

  constructor(private http: HttpClient,
    private router: Router) { }

  getEntrenadores(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page)
  };

  create(entrenador: Entrenador): Observable<Entrenador> {
    return this.http.post(this.urlEndPoint, entrenador).pipe(
      map((response: any) => response.entrenador as Entrenador),
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }

        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }

        return throwError(() => e);
      })
    )
  };

  getEntrenador(id: number): Observable<Entrenador> {
    return this.http.get<Entrenador>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status == 401 && e.error.mensaje) {
          this.router.navigate(['/products']);
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  };

  update(entrenador: Entrenador): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${entrenador.id}`, entrenador).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  };

  delete(id: number): Observable<Entrenador> {
    return this.http.delete<Entrenador>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  };

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
    })
    return this.http.request(req);
  };

  getEntrenadoresAll(): Observable<Entrenador[]> {
    return this.http.get<Entrenador[]>(`${this.urlEndPoint}`)
  }
}
