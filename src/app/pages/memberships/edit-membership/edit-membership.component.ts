import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Membresia } from 'src/app/models/membresia.model';
import { EditMembershipService } from './edit-membership.service';

@Component({
  selector: 'app-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.css']
})
export class EditMembershipComponent implements OnInit {

  @Input() membresia: Membresia;
  titulo: string = 'Editar Membresia N°0'
  errores: string[];

  editarMembresiaForm: FormGroup;

  constructor(public editMembershipService: EditMembershipService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.editMembershipService.cerrarModal();
  }

}
