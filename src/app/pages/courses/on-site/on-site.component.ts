import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';
import { OnSiteService } from 'src/app/services/on-site.service';
import Swal from 'sweetalert2';
import { AddOnSiteService } from './add-on-site/add-on-site.service';
import { EditOnSiteService } from './edit-on-site/edit-on-site.service';
import { ImgOnSiteService } from './img-on-site/img-on-site.service';

@Component({
  selector: 'app-on-site',
  templateUrl: './on-site.component.html',
  styles: [
  ]
})
export class OnSiteComponent implements OnInit {

  cursos: CursoPresencial[];
  cursoSeleccionado: CursoPresencial;
  paginador: any;
  search: string = '';

  public cargando: Boolean = true;

  constructor(private onSiteService: OnSiteService,
    private activatedRoute: ActivatedRoute,
    private addOnSiteService: AddOnSiteService,
    private editOnSiteService: EditOnSiteService,
    private imgOnSiteService: ImgOnSiteService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.onSiteService.getCursosPresenciales(page)
        .subscribe(response => {
          this.cursos = response.content as CursoPresencial[]
          this.paginador = response;
          console.log(this.cursos)
        })
    });

    this.addOnSiteService.notificarUpload.subscribe(curso => this.cursos.push(curso));

    this.editOnSiteService.notificarUpload.subscribe(curso => {
      this.cursos = this.cursos.map(cursoOriginal => {
        if (curso.id == cursoOriginal.id) {
          cursoOriginal = curso;
        }
        return cursoOriginal;
      });
    });

    this.imgOnSiteService.notificarUpload.subscribe(curso => {
      this.cursos = this.cursos.map(cursoOriginal => {
        if (curso.id == cursoOriginal.id) {
          cursoOriginal.foto = curso.foto;
        }
        return cursoOriginal;
      });
    });
    setTimeout(() => {
      this.cargando = false;
    }, 2000);
  }

  btnSearchCurso(search: string) {
    if (search != '') {
      this.onSiteService.getCursosPresencialesAll().subscribe(cursos =>
        this.cursos = cursos
      )
    }
    else {
      this.onSiteService.getCursosPresenciales(0).subscribe(response => {
        this.cursos = response.content as CursoPresencial[]
        this.paginador = response;
      })
    }
    this.search = search;
  } /*MEJORAR BUSCADOR*/

  abrirModal() {
    this.addOnSiteService.abrirModal();
  }

  abrirModalEdit(curso: CursoPresencial) {
    this.cursoSeleccionado = curso;
    this.editOnSiteService.abrirModal();
  }

  abrirModalImg(curso: CursoPresencial) {
    this.cursoSeleccionado = curso;
    this.imgOnSiteService.abrirModal();
  }

  disabled(curso: CursoPresencial) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea deshabilitar el curso ${curso.nombre}?, no estara disponible para los clientes`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deshabilitar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursos.map(cli => {
          if (cli.id == curso.id) {
            cli.enabled = false;
          }
          return cli;
        })
        this.onSiteService.disabled(curso.id).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              'Curso Deshabilitado!',
              `Curso ${curso.nombre} deshabilitado con exito`,
              'success'
            )
          }
        )
      }
    })
  }

  enabled(curso: CursoPresencial) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea habilitar el curso ${curso.nombre}?, estara disponible para los clientes`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, habilitar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursos.map(cli => {
          if (cli.id == curso.id) {
            cli.enabled = true;
          }
          return cli;
        })
        this.onSiteService.enabled(curso.id).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              'Curso Habilitado!',
              `Curso ${curso.nombre} habilitado con exito`,
              'success'
            )
          }
        )
      }
    })

  }
}
