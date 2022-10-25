import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Membresia } from 'src/app/models/membresia.model';
import { MembershipsService } from 'src/app/services/memberships.service';
import Swal from 'sweetalert2';
import { EditMembershipService } from './edit-membership.service';

@Component({
  selector: 'app-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.css']
})
export class EditMembershipComponent implements OnInit, OnChanges {

  @Input() membresia: Membresia;
  titulo: string = 'Editar Membresia N°0'
  errores: string[];
  membresiaEditar: Membresia;
  editarMembresiaForm: FormGroup;

  constructor(public editMembershipService: EditMembershipService,
    private formBuilder: FormBuilder,
    private membershipsService: MembershipsService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm();
  }

  public buildForm() {
    this.editarMembresiaForm = this.formBuilder.group({
      id: [this.membresia.id],
      nombre: [this.membresia.nombre, [Validators.required]],
      precio: [this.membresia.precio, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      descripcion: [this.membresia.descripcion, [Validators.required]],
      duracion: [this.membresia.duracion, [Validators.required, , Validators.pattern(/^[0-9]+$/)]],
    });
  }

  edit($event) {
    event.preventDefault();
    if (this.editarMembresiaForm.valid) {
      const value = this.editarMembresiaForm.value as Membresia;
      this.membershipsService.update(value).subscribe(
        membresia => {
          this.editMembershipService.notificarUpload.emit(membresia.membresia);
          Swal.fire('Membresia Actualizada', `La membresia ${value.nombre} se ha actualizado correctamente`, `success`)
          this.cerrarModal();
        },
      );
    }
  }

  get nombreField() {
    return this.editarMembresiaForm.get('nombre');
  }
  get nombreFieldIsValid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.valid;
  }
  get nombreFieldIsInvalid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.invalid;
  }
  get precioField() {
    return this.editarMembresiaForm.get('precio');
  }
  get precioFieldIsValid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.valid;
  }
  get precioFieldIsInvalid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.invalid;
  }
  get descripcionField() {
    return this.editarMembresiaForm.get('descripcion');
  }
  get descripcionFieldIsValid() {
    return this.descripcionField.touched && this.descripcionField.valid;
  }
  get descripcionFieldIsInvalid() {
    return this.descripcionField.touched && this.descripcionField.invalid;
  }
  get duracionField() {
    return this.editarMembresiaForm.get('duracion');
  }
  get duracionFieldIsValid() {
    return this.duracionField.touched && this.duracionField.valid;
  }
  get duracionFieldIsInvalid() {
    return this.duracionField.touched && this.duracionField.invalid;
  }

  cerrarModal() {
    this.editMembershipService.cerrarModal();
  }

}
