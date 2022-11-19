import { DatePipe } from '@angular/common';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Producto } from '../models/producto.model';
import { Tipo } from '../models/tipo.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urlEndPoint: string = "http://localhost:8080/gym/productos";

  constructor(private http: HttpClient,
    private router: Router) { }

  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.urlEndPoint + '/tipos');
  };

  getProductos(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Producto[]).map(producto => {
          producto.marca = producto.marca.toUpperCase();
          let datePipe = new DatePipe('es');
          return producto;
        });
        return response;
      })
    );
  };

  getProductosDisponibles(): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/disponibles`);
  }

  getProductosTipo(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlEndPoint}/tipo/${id}`);
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post(this.urlEndPoint, producto).pipe(
      map((response: any) => response.producto as Producto),
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

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status == 401 && e.error.mensaje) {
          this.router.navigate(['/products']);
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    )
  };

  update(producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${producto.id}`, producto).pipe(
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

  delete(id: number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`).pipe(
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

  getProductosAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlEndPoint}`)
  }

  addStock(producto: Producto, stock: number, id: number) {
    return this.http.put(`${this.urlEndPoint}/${stock}/${id}`, producto).pipe(catchError(e => {
      if (e.error.mensaje) {
        console.log(e.error.mensaje);
      }
      return throwError(() => e);
    }));
  }

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
}
