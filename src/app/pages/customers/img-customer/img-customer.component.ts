import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Cliente } from 'src/app/models/cliente.model';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
import { ImgCustomerService } from './img-customer.service';

@Component({
  selector: 'app-img-customer',
  templateUrl: './img-customer.component.html',
  styleUrls: ['./img-customer.component.css']
})
export class ImgCustomerComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string = 'Cambiar foto de perfil'
  public fotoSeleccionada: File;
  progreso: number = 0;
  public previsualizacion: string;

  constructor(public imgCustomerService: ImgCustomerService,
    private customersService: CustomersService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
      this.customersService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100)
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;
          this.imgCustomerService.notificarUpload.emit(this.cliente);
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

  cerrarModal() {
    this.progreso = 0;
    this.imgCustomerService.cerrarModal();
  }

}
