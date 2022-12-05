import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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

  getCursosPresencialesDisponibles(): Observable<any> {
    return this.http.get(this.urlEndPoint + '/disponibles');
  }

  getCursosPresencialesAll(): Observable<CursoPresencial[]> {
    return this.http.get<CursoPresencial[]>(this.urlEndPoint);
  }

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

  getCursosPresencialesClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/pagec/' + page)
  };

  create(onSite: CursoPresencial): Observable<CursoPresencial> {
    return this.http.post(this.urlEndPoint, onSite).pipe(
      map((response: any) => response.cursopresencial as CursoPresencial),
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

  prueba(onSite: CursoPresencial): Observable<CursoPresencial> {
    return this.http.post(this.urlEndPoint + '/prueba', onSite).pipe(
      map((response: any) => response.cursopresencial as CursoPresencial),
      catchError(e => {
        if (e.status == 400) {
          return throwError(() => e);
        }

        if (e.mensaje) {
          console.log(e.mensaje);
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
    })
    return this.http.request(req);
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

  checkName(nombre: string) {
    return this.http.get(`${this.urlEndPoint}/buscar/${nombre}`);
  }
}
