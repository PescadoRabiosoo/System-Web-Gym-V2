import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CursoPresencial } from '../models/curso-presencial.model';
import { Entrenador } from '../models/entrenador.model';

@Injectable({
  providedIn: 'root'
})
export class OnSiteService {

  private urlEndPoint: string = "http://localhost:8080/gym/cursospresenciales";

  constructor(private http: HttpClient,
    private router: Router) { }

  getEntrenadores(): Observable<Entrenador[]> {
    return this.http.get<Entrenador[]>('http://localhost:8080/gym/entrenadores');
  };

  getCursosPresenciales(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page)
  };

  getPresencial(id: number): Observable<CursoPresencial> {
    return this.http.get<CursoPresencial>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status == 401 && e.error.mensaje) {
          this.router.navigate(['/courses/on-site']);
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  }

  create(onSite: CursoPresencial): Observable<CursoPresencial> {
    return this.http.post(this.urlEndPoint, onSite).pipe(
      map((response: any) => response.onSite as CursoPresencial),
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

  update(onSite: CursoPresencial): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${onSite.id}`, onSite).pipe(
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

  delete(id: number): Observable<CursoPresencial> {
    return this.http.delete<CursoPresencial>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  };
}
