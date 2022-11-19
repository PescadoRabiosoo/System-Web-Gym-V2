import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Membresia } from '../models/membresia.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipsService {
  private urlEndPoint: string = "http://localhost:8080/gym/membresias";

  constructor(private http: HttpClient,
    private router: Router) { }

  getMembresias(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint + '/page/' + page}`)
  }

  getMembresiasDisponibles(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(`${this.urlEndPoint + '/disponibles'}`);
  }

  create(membresia: Membresia): Observable<Membresia> {
    return this.http.post(this.urlEndPoint, membresia).pipe(
      map((response: any) => response.membresia as Membresia),
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

  getMembresia(id: number): Observable<Membresia> {
    return this.http.get<Membresia>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status == 401 && e.error.mensaje) {
          this.router.navigate(['/memberships']);
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  };

  update(membresia: Membresia): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${membresia.id}`, membresia).pipe(
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

  disabled(id: number) {
    return this.http.delete(`${this.urlEndPoint}/deshabilitar/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  }

  enabled(id: number) {
    return this.http.delete(`${this.urlEndPoint}/habilitar/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  }

  delete(id: number): Observable<Membresia> {
    return this.http.delete<Membresia>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  };

  getMembresiasAll(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(`${this.urlEndPoint}`);
  };

  checkName(nombre: string) {
    return this.http.get(`${this.urlEndPoint}/buscar/${nombre}`);
  }

  checkVacante(id: number) {
    return this.http.get(`${this.urlEndPoint}/hora/${id}`);
  }
}
