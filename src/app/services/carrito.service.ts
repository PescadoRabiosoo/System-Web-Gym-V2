import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Carrito } from '../models/carrito.model';
import { CursoPresencial } from '../models/curso-presencial.model';
import { ItemComprobanteCurso } from '../models/item-comprobante-curso.model';
import { ItemComprobanteProducto } from '../models/item-comprobante-producto.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private urlEndPoint: string = "http://localhost:8080/gym/carrito";

  carritoList: ItemComprobanteProducto[] = [];
  carritoCList: ItemComprobanteCurso[] = [];

  constructor(private http: HttpClient) { }

  obtenerDatos(id: number): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.urlEndPoint}/${id}`);
  }

  guardarItem(carrito: Carrito): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.urlEndPoint}`, carrito).pipe(
      map((response: any) =>
        response.mensaje.toString()
      ),
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }

  guardarItemC(carrito: Carrito): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.urlEndPoint}/curso`, carrito).pipe(
      map((response: any) =>
        response.mensaje.toString()
      ),
      catchError(e => {
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(() => e);
      })
    );
  }

  actualizarItem(carrito: Carrito): Observable<Carrito> {
    return this.http.put<Carrito>(`${this.urlEndPoint}/${carrito.id}`, carrito);
  }

  eliminarItem(id: number) {
    return this.http.delete(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {

        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }

        return throwError(() => e);
      }));
  }

  addCart(producto: Producto) {
    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);

    } else {
      let nuevoItem = new ItemComprobanteProducto();
      nuevoItem.producto = producto;
      nuevoItem.importe = producto.precio * 1;
      this.carritoList.push(nuevoItem);
      Swal.fire('Añadido', `Producto ${producto.nombre} añadido al carrito`, 'success');
    }
    console.log(this.carritoList)
  }

  existeItem(id: number): boolean {
    let existe = false;

    this.carritoList.forEach((item: ItemComprobanteProducto) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.carritoList = this.carritoList.map((item: ItemComprobanteProducto) => {
      if (id === item.producto.id) {
        if (item.cantidad >= item.producto.stock) {
          Swal.fire('Info', `Ha superado el stock del producto ${item.producto.nombre}`, 'info')
        } else {
          ++item.cantidad;
          item.importe = item.cantidad * item.producto.precio;
          Swal.fire('Añadido', `Producto ${item.producto.nombre} añadido al carrito`, 'success');
        }
      }
      return item;
    });
  }

  actualizarCantidad(id: number, cantidad: number) {
    return this.carritoList.map((item: ItemComprobanteProducto) => {
      if (id === item.producto.id) {
        item.importe = cantidad * item.producto.precio;
        item.cantidad = cantidad;
      }
      return item;
    })
  }

  eliminarProducto(id: number) {
    this.carritoList.map((item: ItemComprobanteProducto) => {
      if (id === item.producto.id) {
        console.log(item)
      }
    })
    this.carritoList = this.carritoList.filter((item: ItemComprobanteProducto) => id !== item.producto.id);
    return this.carritoList;
    /*this.carritoList.filter((item: ItemComprobanteProducto) => id !== item.producto.id)*/
  }

  eliminarCurso(id: number) {
    this.carritoCList.map((item: ItemComprobanteCurso) => {
      if (id === item.curso.id) {
        console.log(item)
      }
    })
    this.carritoCList = this.carritoCList.filter((item: ItemComprobanteCurso) => id !== item.curso.id);
    return this.carritoCList;
  }

  addCartP(presencial: CursoPresencial) {
    if (this.existe(presencial.id)) {
      Swal.fire('Existe', `El curso ${presencial.nombre} esta en el carrito`, 'info');
    } else {
      let nuevoItem = new ItemComprobanteCurso();
      nuevoItem.curso = presencial;
      nuevoItem.importe = presencial.precio * 1;
      this.carritoCList.push(nuevoItem);
      Swal.fire('Añadido', `Curso ${presencial.nombre} añadido al carrito`, 'success');
    }
    console.log(this.carritoCList);
  }

  existe(id: number): boolean {
    let existe = false;
    this.carritoCList.forEach((item: ItemComprobanteCurso) => {
      if (id === item.curso.id) {
        existe = true;
      }
    });
    return existe;
  }

  vaciarCarrito() {
    this.carritoCList = [];
    this.carritoList = [];
  }

}
