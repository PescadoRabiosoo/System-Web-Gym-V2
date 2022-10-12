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

  getProducto(id: number): Observable<Membresia> {
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
}
