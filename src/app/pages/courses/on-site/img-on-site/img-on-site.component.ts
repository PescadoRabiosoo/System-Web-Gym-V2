import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';
import { OnSiteService } from 'src/app/services/on-site.service';
import Swal from 'sweetalert2';
import { ImgOnSiteService } from './img-on-site.service';

@Component({
  selector: 'app-img-on-site',
  templateUrl: './img-on-site.component.html',
  styleUrls: ['./img-on-site.component.css']
})
export class ImgOnSiteComponent implements OnInit {

  @Input() curso: CursoPresencial;
  titulo: string = 'Editar Imagen del Curso N°0'
  public fotoSeleccionada: File;
  progreso: number = 0;
  public previsualizacion: string;


  constructor(public imgOnSiteService: ImgOnSiteService,
    private sanitizer: DomSanitizer,
    private onSiteService: OnSiteService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgOnSiteService.cerrarModal();
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
      this.onSiteService.subirFoto(this.fotoSeleccionada, this.curso.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100)
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.curso = response.curso as CursoPresencial;
          this.imgOnSiteService.notificarUpload.emit(this.curso);
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
