import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Membresia } from 'src/app/models/membresia.model';
import { MembershipsService } from 'src/app/services/memberships.service';
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

  constructor(private activatedRoute: ActivatedRoute,
    private membershipsService: MembershipsService,
    public addMembershipService: AddMembershipService,
    public editMembershipService: EditMembershipService) { }

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
  }

  abrirModal() {
    this.addMembershipService.abrirModal();
  }

  abrirModalEdit(membresia: Membresia) {
    this.editMembershipService.abrirModal();
    this.membresiaSeleccionada = membresia;
  }

}
