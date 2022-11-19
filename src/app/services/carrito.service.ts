import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CursoPresencial } from '../models/curso-presencial.model';
import { ItemComprobanteCurso } from '../models/item-comprobante-curso.model';
import { ItemComprobanteProducto } from '../models/item-comprobante-producto.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  carritoList: ItemComprobanteProducto[] = [];
  carritoCList: ItemComprobanteCurso[] = [];

  constructor() { }

  addCart(producto: Producto) {
    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
      Swal.fire('Añadido', `Producto ${producto.nombre} añadido al carrito`, 'success');
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
        ++item.cantidad;
        item.importe = item.cantidad * item.producto.precio;
      }
      return item;
    });
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

}
