import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddMembershipService } from './add-membership.service';

@Component({
  selector: 'app-add-membership',
  templateUrl: './add-membership.component.html',
  styleUrls: ['./add-membership.component.css']
})
export class AddMembershipComponent implements OnInit {

  titulo: string = 'Agregar Nueva Membresia'
  errores: string[];

  agregarMembresiaForm: FormGroup;

  constructor(public addMembershipService: AddMembershipService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.addMembershipService.cerrarModal();
  }

}
