import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto.model';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { ImgProductService } from './img-product.service';

@Component({
  selector: 'app-img-product',
  templateUrl: './img-product.component.html',
  styleUrls: ['./img-product.component.css']
})
export class ImgProductComponent implements OnInit {

  @Input() producto: Producto;

  titulo: string = 'Cambiar Imagen del Producto'
  public fotoSeleccionada: File;
  progreso: number = 0;
  public previsualizacion: string;

  constructor(public imgProductService: ImgProductService,
    private sanitizer: DomSanitizer,
    private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgProductService.cerrarModal();
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.extraerBase64(this.fotoSeleccionada).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
    this.progreso = 0;
    console.log(this.fotoSeleccionada)
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error al seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.productsService.subirFoto(this.fotoSeleccionada, this.producto.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100)
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.producto = response.producto as Producto;
          this.imgProductService.notificarUpload.emit(this.producto);
          Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success')
          this.previsualizacion = null;
          this.cerrarModal();
        }
      });
    }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  })

}
