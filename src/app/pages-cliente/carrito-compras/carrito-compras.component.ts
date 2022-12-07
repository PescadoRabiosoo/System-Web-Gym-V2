import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ItemComprobanteCurso } from 'src/app/models/item-comprobante-curso.model';
import { ItemComprobanteProducto } from 'src/app/models/item-comprobante-producto.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Carrito } from 'src/app/models/carrito.model';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  @ViewChildren('cantidad') cantidad: QueryList<ElementRef>;
  @ViewChildren('total') total: QueryList<ElementRef>;

  carrito: ItemComprobanteProducto[] = [];
  carritoC: ItemComprobanteCurso[] = [];
  id: number;
  subtotal: number = 0;
  /*id: number;
  usuarioLogeado: Usuario = new Usuario();
  comprobanteP: ComprobanteProducto = new ComprobanteProducto();
  total: number = 0;*/

  constructor(private carritoService: CarritoService,
    private router: Router,
    private authService: AuthService,
    /*private comprobantesService: ComprobantesService*/) {

  }

  ngOnInit(): void {
    /*this.carrito = this.carritoService.carritoList;
    this.carritoC = this.carritoService.carritoCList;*/
    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;
    console.log(this.id)
    this.carritoService.obtenerDatos(this.id).subscribe(data => {
      data.forEach(item => {
        var nuevoItem = new ItemComprobanteProducto();
        var nuevoItemC = new ItemComprobanteCurso();
        if (item.curso === null) {
          nuevoItem.id = item.id;
          nuevoItem.producto = item.producto;
          nuevoItem.cantidad = item.cantidad;
          nuevoItem.importe = item.cantidad * item.producto.precio;
          this.carrito.push(nuevoItem);
          console.log(this.carrito);
          console.log(nuevoItem.importe)
        } else {
          nuevoItemC.id = item.id;
          nuevoItemC.curso = item.curso;
          nuevoItemC.importe = item.curso.precio;
          this.carritoC.push(nuevoItemC);
          console.log(this.carritoC);
        }
      })
      this.carrito.forEach(item => this.subtotal += item.importe);
      this.carritoC.forEach(item => this.subtotal += item.importe);
    });



    /*this.id = JSON.parse(sessionStorage.getItem('usuario')).id;
    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioLogeado = response as Usuario;
    });*/
  }

  generarCompra() {
    console.log(this.carrito)
    console.log(this.carritoC)
    if (this.carrito.length <= 0 && this.carritoC.length <= 0) {
      Swal.fire('Carrito Vacio', 'No puede continuar con el pago', 'info');
    } else {
      this.router.navigateByUrl('/pago/carrito')
    }
  }

  actualizarCantidad(item: ItemComprobanteProducto, event: any): void {
    let cantidad: number = event.target.value as number;
    let carrito = new Carrito();
    if (cantidad == 0) {
      this.subtotal -= item.importe;
      return this.eliminarProducto(item)
    }
    if (cantidad > item.producto.stock) {
      this.carrito.map(data => {
        if (data === item) {
          this.cantidad.get(this.carrito.indexOf(data)).nativeElement.value = cantidad - 1;
        }
      })
      Swal.fire('Info', `Ha superado el stock del producto ${item.producto.nombre}`, 'info');
      /*this.carrito = this.carritoService.actualizarCantidad(item.producto.id, cantidad - 1);*/
    } else {
      /*this.carrito = this.carritoService.actualizarCantidad(item.producto.id, cantidad);*/
      this.carrito.map(data => {
        var regex = /(\d+)/g;
        if (data === item) {
          let resultado = parseInt(this.total.get(this.carrito.indexOf(data)).nativeElement.innerText.match(regex));
          this.total.get(this.carrito.indexOf(data)).nativeElement.innerText = "S/. " + cantidad * item.producto.precio;
          item.importe = item.producto.precio * cantidad;
          console.log(resultado)
          console.log(item.importe)
          console.log(this.subtotal)
          this.subtotal = this.subtotal + (item.importe - resultado);
        }
      })
      carrito.id = item.id;
      this.authService.obtenerUsuario(this.id).subscribe((data: Cliente) => carrito.cliente = data);
      carrito.producto = item.producto;
      carrito.cantidad = cantidad;

      /*console.log(item.importe)
      console.log(cantidad)
      console.log(item.producto.precio)
      console.log(this.subtotal)*/

      this.carritoService.actualizarItem(carrito).subscribe(data => {
        console.log(data)
      });
    }
  }

  eliminarProducto(itemP: ItemComprobanteProducto): void {
    console.log(itemP.id)
    this.carritoService.eliminarItem(itemP.id).subscribe(data => {
      console.log(data)
      this.carrito = this.carrito.filter((item: ItemComprobanteProducto) => itemP.id !== item.id);
      this.subtotal -= itemP.importe;
      return this.carrito;
    });
  }

  eliminarCurso(itemC: ItemComprobanteCurso): void {
    this.carritoService.eliminarItem(itemC.id).subscribe(data => {
      console.log(data)
      this.carritoC = this.carritoC.filter((item: ItemComprobanteCurso) => itemC.id != item.id);
      this.subtotal -= itemC.importe;
      return this.carritoC;
    })
  }
}
