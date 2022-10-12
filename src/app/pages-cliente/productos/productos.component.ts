import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  paginador: any;

  constructor(private activatedRoute: ActivatedRoute,
    private productsService: ProductsService) { }

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

}
