import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { AddStockService } from './add-stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  @Input() producto: Producto;
  titulo: string = 'Incrementar Stock del producto N°0'
  progreso: number = 0;
  constructor(public addStockService: AddStockService,
    private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  cambiarValor(valor: number) {
    this.progreso = this.progreso + valor;
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
  }

  cerrarModal() {
    this.progreso = 0;
    this.addStockService.cerrarModal();
  }

  incrementar(producto: Producto) {
    if (this.progreso <= 0) {
      Swal.fire('Error', 'No puede colocar una cifra menor o igual a 0', 'error')
    } else {
      this.productsService.addStock(producto, this.progreso, producto.id).subscribe((resp: any) => {
        this.addStockService.notificarUpload.emit(resp.producto);
        Swal.fire('Stock Actualizado', `El stock del producto ${resp.producto.nombre} ha sido actualizado correctamente`, 'success');
      });
      this.cerrarModal();
    }
    this.progreso = 0;
  }

}
