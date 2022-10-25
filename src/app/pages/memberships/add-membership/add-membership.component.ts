import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Membresia } from 'src/app/models/membresia.model';
import { MembershipsService } from 'src/app/services/memberships.service';
import Swal from 'sweetalert2';
import { AddMembershipService } from './add-membership.service';

@Component({
  selector: 'app-add-membership',
  templateUrl: './add-membership.component.html',
  styleUrls: ['./add-membership.component.css']
})
export class AddMembershipComponent implements OnInit {

  titulo: string = 'Agregar Nueva Membresia'
  membresia: Membresia = new Membresia();
  errores: string[];

  agregarMembresiaForm: FormGroup;

  constructor(public addMembershipService: AddMembershipService,
    private formBuilder: FormBuilder,
    private membershipsService: MembershipsService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  public buildForm() {
    this.agregarMembresiaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      descripcion: ['', [Validators.required]],
      duracion: ['', [Validators.required, , Validators.pattern(/^[0-9]+$/)]],
    })
  }

  save($event) {
    event.preventDefault();
    if (this.agregarMembresiaForm.valid) {
      const value = this.agregarMembresiaForm.value as Membresia;
      this.membershipsService.create(value).subscribe(
        membresia => {
          this.addMembershipService.notificarUpload.emit(membresia);
          Swal.fire('Nueva Membresia', `La membresia ${membresia.nombre} se ha creado correctamente`, `success`)
          this.cerrarModal();
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error("Codigo del error desde el backend: " + err.status);
          console.error(err.error.errors);
        }
      );
    } else {
      this.agregarMembresiaForm.markAllAsTouched();
    }
  }

  get nombreField() {
    return this.agregarMembresiaForm.get('nombre');
  }
  get nombreFieldIsValid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.valid;
  }
  get nombreFieldIsInvalid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.invalid;
  }
  get precioField() {
    return this.agregarMembresiaForm.get('precio');
  }
  get precioFieldIsValid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.valid;
  }
  get precioFieldIsInvalid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.invalid;
  }
  get descripcionField() {
    return this.agregarMembresiaForm.get('descripcion');
  }
  get descripcionFieldIsValid() {
    return this.descripcionField.touched && this.descripcionField.valid;
  }
  get descripcionFieldIsInvalid() {
    return this.descripcionField.touched && this.descripcionField.invalid;
  }
  get duracionField() {
    return this.agregarMembresiaForm.get('duracion');
  }
  get duracionFieldIsValid() {
    return this.duracionField.touched && this.duracionField.valid;
  }
  get duracionFieldIsInvalid() {
    return this.duracionField.touched && this.duracionField.invalid;
  }

  cerrarModal() {
    this.addMembershipService.cerrarModal();
  }

}
