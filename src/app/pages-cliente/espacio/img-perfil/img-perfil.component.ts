import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario.model';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
import { ImgPerfilService } from './img-perfil.service';

@Component({
  selector: 'app-img-perfil',
  templateUrl: './img-perfil.component.html',
  styleUrls: ['./img-perfil.component.css']
})
export class ImgPerfilComponent implements OnInit {

  @Input() usuario: Usuario;
  titulo: string = "Actualizar Imagen";
  public fotoSeleccionada: File;
  progreso: number = 0;
  public previsualizacion: string;

  constructor(private customersService: CustomersService,
    private sanitizer: DomSanitizer,
    public imgPerfilService: ImgPerfilService) { }

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
      this.customersService.subirFoto(this.fotoSeleccionada, this.usuario.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100)
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.usuario = response.cliente as Usuario;
          this.imgPerfilService.notificarUpload.emit(this.usuario);
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
    this.imgPerfilService.cerrarModal();
  }


}
