import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {

  productos: Producto[];
  paginador: any;
  productoSeleccionado: Producto;
  search: string = '';

  constructor(private productsService: ProductsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.productsService.getProductos(page)
        .subscribe(response => {
          this.productos = response.content as Producto[]
          this.paginador = response;
        })
    });
  }

  btnSearchProducto(search: string) {
    if (search != '') {
      this.productsService.getProductosAll().subscribe(productos =>
        this.productos = productos
      )
    }
    else {
      this.productsService.getProductos(0).subscribe(response => {
        this.productos = response.content as Producto[]
        this.paginador = response;
      })
    }
    this.search = search;
  } /*MEJORAR BUSCADOR*/

}
