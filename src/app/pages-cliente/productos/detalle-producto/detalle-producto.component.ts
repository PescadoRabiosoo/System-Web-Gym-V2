import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/carrito.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Producto } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
import { DetalleProductoService } from './detalle-producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  @Input() producto = Producto;
  titulo: string = 'Detalle de Producto N°'

  id: number;
  cliente: Cliente;

  constructor(public detalleProductoService: DetalleProductoService,
    private carritoService: CarritoService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;
  }

  addCart(producto: Producto) {
    this.authService.obtenerUsuario(this.id).subscribe(result => {
      this.cliente = result;
      console.log(this.cliente);

      var nuevoItem = new Carrito();
      nuevoItem.producto = producto;
      nuevoItem.cliente = this.cliente;
      nuevoItem.cantidad = 1;
      console.log(nuevoItem)
      this.carritoService.guardarItem(nuevoItem).subscribe(result => {
        console.log(result);
        Swal.fire('Info', `${result}`, 'info');
      });
    });
    this.cerrarModal();
  }

  comprar(producto: Producto) {
    this.authService.obtenerUsuario(this.id).subscribe(result => {
      this.cliente = result;
      console.log(this.cliente);

      var nuevoItem = new Carrito();
      nuevoItem.producto = producto;
      nuevoItem.cliente = this.cliente;
      nuevoItem.cantidad = 1;
      console.log(nuevoItem)
      this.carritoService.guardarItem(nuevoItem).subscribe(result => {
        console.log(result);
        Swal.fire('Info', `${result}`, 'info');
      });
      this.router.navigateByUrl('/carrito');
    });
    this.cerrarModal();
  }

  cerrarModal() {
    this.detalleProductoService.cerrarModal();
  }

}
