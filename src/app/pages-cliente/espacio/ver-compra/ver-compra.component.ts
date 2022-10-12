import { Component, Input, OnInit } from '@angular/core';
import { ComprobanteProducto } from 'src/app/models/comprobante-producto.model';
import { VerCompraService } from './ver-compra.service';

@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.component.html',
  styleUrls: ['./ver-compra.component.css']
})
export class VerCompraComponent implements OnInit {

  @Input() comprobante: ComprobanteProducto;
  titulo: string = 'Comprobante N° '

  constructor(public verCompraService: VerCompraService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.verCompraService.cerrarModal();
  }

}
