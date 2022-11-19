import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';
import { Entrenador } from 'src/app/models/entrenador.model';
import { OnSiteService } from 'src/app/services/on-site.service';
import Swal from 'sweetalert2';
import { OnSiteValidation } from '../on-site-validation';
import { EditOnSiteService } from './edit-on-site.service';

@Component({
  selector: 'app-edit-on-site',
  templateUrl: './edit-on-site.component.html',
  styleUrls: ['./edit-on-site.component.css']
})
export class EditOnSiteComponent implements OnInit, OnChanges {

  @Input() curso: CursoPresencial;
  titulo: string = 'Editar Curso N°0';
  entrenadores: Entrenador[];
  errores: string[];
  editForm: FormGroup;
  public fechaminima: Date;
  public fechaMinima: string;

  constructor(public editOnSiteService: EditOnSiteService,
    private onSiteService: OnSiteService,
    private formBuilder: FormBuilder,
    private pd: DatePipe) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm();
  }

  ngOnInit(): void {
    this.cargarEntrenadores();
    this.fechaminima = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.fechaMinima = this.pd.transform(this.fechaminima, "yyyy-MM-dd");
  }

  public buildForm() {
    this.editForm = this.formBuilder.group({
      id: [this.curso.id],
      nombre: [this.curso.nombre, [Validators.required]],
      precio: [this.curso.precio, [Validators.required, Validators.pattern(/^[0-9.]+$/)]],
      vacantes: [this.curso.vacantes, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      descripcion: [this.curso.descripcion, [Validators.required]],
      fechaInicio: [this.pd.transform(this.curso.fechaInicio, "yyyy-MM-dd"), [Validators.required]],
      fechaFinal: [this.pd.transform(this.curso.fechaFinal, "yyyy-MM-dd"), [Validators.required]],
      horaInicio: [this.curso.horaInicio, [Validators.required]],
      horaFinal: [this.curso.horaFinal, [Validators.required]],
      entrenador: [this.curso.entrenador, [Validators.required]],
      enabled: [true]
    });
  }

  cargarEntrenadores() {
    this.onSiteService.getEntrenadores().subscribe(entrenadores => this.entrenadores = entrenadores);
  }

  edit($event) {
    event.preventDefault();
    if (this.editForm.valid) {
      const value = this.editForm.value as CursoPresencial;
      console.log(value);
      this.onSiteService.update(value).subscribe(
        curso => {
          this.editOnSiteService.notificarUpload.emit(curso.cursopresencial);
          Swal.fire('Curso Actualizado', `El curso ${value.nombre} se ha actualizado correctamente`, `success`)
          this.cerrarModal();
        },
      )
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  get nombreField() {
    return this.editForm.get('nombre');
  }
  get nombreFieldIsValid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.valid;
  }
  get nombreFieldIsInvalid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.invalid;
  }
  get precioField() {
    return this.editForm.get('precio');
  }
  get precioFieldIsValid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.valid;
  }
  get precioFieldIsInvalid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.invalid;
  }
  get vacantesField() {
    return this.editForm.get('vacantes');
  }
  get vacantesFieldIsValid() {
    return (this.vacantesField.touched || this.vacantesField.dirty) && this.vacantesField.valid;
  }
  get vacantesFieldIsInvalid() {
    return (this.vacantesField.touched || this.vacantesField.dirty) && this.vacantesField.invalid;
  }
  get descripcionField() {
    return this.editForm.get('descripcion');
  }
  get descripcionFieldIsValid() {
    return (this.descripcionField.touched || this.descripcionField.dirty) && this.descripcionField.valid;
  }
  get descripcionFieldIsInvalid() {
    return (this.descripcionField.touched || this.descripcionField.dirty) && this.descripcionField.invalid;
  }
  get fechaInicioField() {
    return this.editForm.get('fechaInicio');
  }
  get fechaInicioFieldIsValid() {
    return (this.fechaInicioField.touched || this.fechaInicioField.dirty) && this.fechaInicioField.valid;
  }
  get fechaInicioFieldIsInvalid() {
    return (this.fechaInicioField.touched || this.fechaInicioField.dirty) && this.fechaInicioField.invalid;
  }
  get fechaFinalField() {
    return this.editForm.get('fechaFinal');
  }
  get fechaFinalFieldIsValid() {
    return (this.fechaFinalField.touched || this.fechaFinalField.dirty) && this.fechaFinalField.valid;
  }
  get fechaFinalFieldIsInvalid() {
    return (this.fechaFinalField.touched || this.fechaFinalField.dirty) && this.fechaFinalField.invalid;
  }
  get horaInicioField() {
    return this.editForm.get('horaInicio');
  }
  get horaInicioFieldIsValid() {
    return (this.horaInicioField.touched || this.horaInicioField.dirty) && this.horaInicioField.valid;
  }
  get horaInicioFieldIsInvalid() {
    return (this.horaInicioField.touched || this.horaInicioField.dirty) && this.horaInicioField.invalid;
  }
  get horaFinalField() {
    return this.editForm.get('horaFinal');
  }
  get horaFinalFieldIsValid() {
    return (this.horaFinalField.touched || this.horaFinalField.dirty) && this.horaFinalField.valid;
  }
  get horaFinalFieldIsInvalid() {
    return (this.horaFinalField.touched || this.horaFinalField.dirty) && this.horaFinalField.invalid;
  }
  get entrenadorField() {
    return this.editForm.get('entrenador');
  }
  get entrenadorFieldIsValid() {
    return (this.entrenadorField.touched || this.entrenadorField.dirty) && this.entrenadorField.valid;
  }
  get entrenadorFieldIsInvalid() {
    return (this.entrenadorField.touched || this.entrenadorField.dirty) && this.entrenadorField.invalid;
  }

  cerrarModal() {
    this.editOnSiteService.cerrarModal();
  }

}
