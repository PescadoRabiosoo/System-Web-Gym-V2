import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Carrito } from 'src/app/models/carrito.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Producto } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { DetalleProductoService } from './detalle-producto/detalle-producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  paginador: any;
  productoSeleccionado: Producto;

  id: number;
  cliente: Cliente;

  pages: number = 0;
  restante: number = 0;
  pagina: number = 1;
  paginas: number[] = [];
  search: string = '';

  constructor(
    private productsService: ProductsService,
    private configuracionesService: ConfiguracionesService,
    private carritoService: CarritoService,
    private detalleProductoService: DetalleProductoService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.productsService.getProductosDisponibles()
      .subscribe(response => {
        this.productos = response.filter((response: Producto) => response.stock !== 0);
        this.restante = this.productos.length;
        this.pagina = Math.floor(this.productos.length / 8) + 1;
        for (let index = 1; index < this.pagina + 1; index++) {
          this.paginas.push(index)
        }
      });

    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;
  }

  categoria(id: number) {
    this.search = '';
    this.pages = 0;
    this.paginas = [];
    this.productsService.getProductosTipo(id)
      .subscribe(response => {
        this.productos = response.filter((response: Producto) => response.stock !== 0);
        this.restante = this.productos.length;
        this.pagina = this.productos.length % 8 == 0 ? this.productos.length / 8 : Math.floor(this.productos.length / 8) + 1;
        for (let index = 1; index < this.pagina + 1; index++) {
          this.paginas.push(index)
        }
      });
    this.configuracionesService.changeActive(id);
  }

  all() {
    this.pages = 0;
    this.paginas = [];
    this.productsService.getProductosDisponibles()
      .subscribe(response => {
        this.productos = response.filter((response: Producto) => response.stock !== 0);
        this.restante = this.productos.length;
        this.pagina = Math.floor(this.productos.length / 8) + 1;
        for (let index = 1; index < this.pagina + 1; index++) {
          this.paginas.push(index)
        }
      });
    this.configuracionesService.changeActive(0);
  }

  addCart(producto: Producto) {
    /*this.carritoService.addCart(producto);*/
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
  }

  siguiente() {
    if (this.pages <= this.restante && this.restante >= 8) {
      this.restante -= 8;
      this.pages += 8;
    }
  }

  anterior() {
    if (this.pages > 0) {
      this.pages -= 8;
      if (this.restante >= this.productos.length) {
        this.restante = this.productos.length;
      } else {
        this.restante += 8;
      }
    }
  }

  codigo(pag: number) {
    this.pages = (pag - 1) * 8;
    this.restante = this.productos.length - this.pages;
  }

  btnSearchProducto(search: string) {
    this.search = search;
  }

  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.detalleProductoService.abrirModal();
  }

}
