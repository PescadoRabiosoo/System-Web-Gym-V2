import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { AddProductService } from './add-product/add-product.service';
import { AddStockService } from './add-stock/add-stock.service';
import { EditProductService } from './edit-product/edit-product.service';
import { ImgProductService } from './img-product/img-product.service';

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

  public cargando: Boolean = true;

  constructor(private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private addProductService: AddProductService,
    private editProductService: EditProductService,
    private addStockService: AddStockService,
    private imgProductService: ImgProductService) { }

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

    this.addProductService.notificarUpload.subscribe(producto => {
      this.productos.push(producto);
    });

    this.editProductService.notificarUpload.subscribe(producto => {
      this.productos = this.productos.map(productoOriginal => {
        if (producto.id == productoOriginal.id) {
          productoOriginal = producto;
        }
        return productoOriginal;
      });
    });
    this.addStockService.notificarUpload.subscribe(producto => {
      this.productos = this.productos.map(productoOriginal => {
        if (producto.id == productoOriginal.id) {
          productoOriginal = producto;
        }
        return productoOriginal;
      });
    });

    this.imgProductService.notificarUpload.subscribe(producto => {
      this.productos = this.productos.map(productoOriginal => {
        if (producto.id == productoOriginal.id) {
          productoOriginal.foto = producto.foto;
        }
        return productoOriginal;
      });
    });

    setTimeout(() => {
      this.cargando = false;
    }, 2000);
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



  abrirModal() {
    this.addProductService.abrirModal();
  }

  abrirModalEdit(producto: Producto) {
    this.editProductService.abrirModal();
    this.productoSeleccionado = producto;
  }

  abrirModalAdd(producto: Producto) {
    this.addStockService.abrirModal();
    this.productoSeleccionado = producto;
  }

  abrirModalImg(producto: Producto) {
    this.imgProductService.abrirModal();
    this.productoSeleccionado = producto;
  }

  disabled(producto: Producto) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea deshabilitar el producto ${producto.nombre}?, no estara disponible para los clientes`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deshabilitar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productos.map(cli => {
          if (cli.id == producto.id) {
            cli.enabled = false;
          }
          return cli;
        })
        this.productsService.disabled(producto.id).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              'Producto Deshabilitado!',
              `Producto ${producto.nombre} deshabilitado con exito`,
              'success'
            )
          }
        )
      }
    })
  }

  enabled(producto: Producto) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea habilitar el producto ${producto.nombre}?, estara disponible para los clientes`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, habilitar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productos.map(cli => {
          if (cli.id == producto.id) {
            cli.enabled = true;
          }
          return cli;
        })
        this.productsService.enabled(producto.id).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              'Producto Habilitado!',
              `Producto ${producto.nombre} habilitado con exito`,
              'success'
            )
          }
        )
      }
    })

  }
}
