import { Component, OnInit } from '@angular/core';
import { ItemComprobanteCurso } from 'src/app/models/item-comprobante-curso.model';
import { ItemComprobanteProducto } from 'src/app/models/item-comprobante-producto.model';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  carrito: ItemComprobanteProducto[];
  carritoC: ItemComprobanteCurso[];

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carrito = this.carritoService.carritoList;
    this.carritoC = this.carritoService.carritoCList;
  }

}
