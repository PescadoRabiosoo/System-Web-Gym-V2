import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membresia } from 'src/app/models/membresia.model';
import { MembershipsService } from 'src/app/services/memberships.service';
import Swal from 'sweetalert2';
import { AddMembershipService } from './add-membership/add-membership.service';
import { EditMembershipService } from './edit-membership/edit-membership.service';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styles: [
  ]
})
export class MembershipsComponent implements OnInit {

  membresias: Membresia[];
  paginador: any;
  membresiaSeleccionada: Membresia;
  search: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private membershipsService: MembershipsService,
    public addMembershipService: AddMembershipService,
    public editMembershipService: EditMembershipService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.membershipsService.getMembresias(page)
        .subscribe(response => {
          this.membresias = response.content as Membresia[]
          this.paginador = response;
        })
    });

    this.addMembershipService.notificarUpload.subscribe(membresia => {
      this.membresias.push(membresia);
      return this.membresias;
    });

    this.editMembershipService.notificarUpload.subscribe(membresia => {
      this.membresias = this.membresias.map(membresiaOriginal => {
        if (membresia.id == membresiaOriginal.id) {
          membresiaOriginal = membresia;
        }
        return membresiaOriginal;
      });
    });
  }

  disabled(membresia: Membresia) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea deshabilitar la membresia ${membresia.nombre}?, no estara disponible para los clientes`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, deshabilitar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.membresias.map(cli => {
          if (cli.id == membresia.id) {
            cli.enabled = false;
          }
          return cli;
        })
        this.membershipsService.disabled(membresia.id).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              'Membresia Deshabilitada!',
              `Membresia ${membresia.nombre} deshabilitada con exito`,
              'success'
            )
          }
        )
      }
    })
  }

  enabled(membresia: Membresia) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea habilitar la membresia ${membresia.nombre}?, estara disponible para los clientes`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, habilitar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.membresias.map(cli => {
          if (cli.id == membresia.id) {
            cli.enabled = true;
          }
          return cli;
        })
        this.membershipsService.enabled(membresia.id).subscribe(
          response => {
            swalWithBootstrapButtons.fire(
              'Membresia Habilitada!',
              `Membresia ${membresia.nombre} habilitada con exito`,
              'success'
            )
          }
        )
      }
    })

  }

  btnSearchMembresia(search: string) {
    if (search != '') {
      this.membershipsService.getMembresiasAll().subscribe(membresias =>
        this.membresias = membresias
      )
    }
    else {
      this.membershipsService.getMembresias(0).subscribe(response => {
        this.membresias = response.content as Membresia[]
        this.paginador = response;
      })
    }
    this.search = search;
  }

  abrirModal() {
    this.addMembershipService.abrirModal();
  }

  abrirModalEdit(membresia: Membresia) {
    this.editMembershipService.abrirModal();
    this.membresiaSeleccionada = membresia;
  }

}
