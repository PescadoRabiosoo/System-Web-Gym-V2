import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';
import { Entrenador } from 'src/app/models/entrenador.model';
import { HoursService } from 'src/app/services/hours.service';
import { OnSiteService } from 'src/app/services/on-site.service';
import Swal from 'sweetalert2';
import { OnSiteValidation } from '../on-site-validation';
import { AddOnSiteService } from './add-on-site.service';

@Component({
  selector: 'app-add-on-site',
  templateUrl: './add-on-site.component.html',
  styleUrls: ['./add-on-site.component.css']
})
export class AddOnSiteComponent implements OnInit {

  titulo: string = 'Añadir Nuevo Curso'
  entrenadores: Entrenador[];
  curso: CursoPresencial = new CursoPresencial();
  errores: string[];
  crearForm: FormGroup;
  public fechaminima: Date;
  public fechaMinima: string;

  constructor(public addOnSiteService: AddOnSiteService,
    private formBuilder: FormBuilder,
    private onSiteService: OnSiteService,
    private pd: DatePipe) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.cargarEntrenador();
    this.fechaminima = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.fechaMinima = this.pd.transform(this.fechaminima, "yyyy-MM-dd");
  }

  cargarEntrenador() {
    this.onSiteService.getEntrenadores().subscribe(entrenadores => this.entrenadores = entrenadores);
  }

  public buildForm() {
    this.crearForm = this.formBuilder.group({
      nombre: ['', [Validators.required], OnSiteValidation.validateName(this.onSiteService)],
      precio: ['', [Validators.required, Validators.pattern(/^[0-9.]+$/)]],
      vacantes: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      descripcion: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFinal: ['', [Validators.required]],
      entrenador: ['', [Validators.required]],
      enabled: [true]
    })
  }

  save($event) {
    event.preventDefault();
    if (this.crearForm.valid) {
      const value = this.crearForm.value as CursoPresencial;
      console.log(value);
      this.onSiteService.prueba(value).subscribe(
        curso => {
          console.log(curso)
          this.addOnSiteService.notificarUpload.emit(curso);
          Swal.fire('Nuevo Curso', `El curso ${curso.nombre} se ha creado correctamente`, `success`)
          this.cerrarModal();
        },
        err => {
          console.log(err);
          if (!err.error.mensaje) {
            this.errores = err.error.errors as string[];
            console.error("Codigo del error desde el backend: " + err.status);
            console.error(err.error.errors);
          } else {
            console.log(err.error.mensaje)
            Swal.fire('Cruce', 'El curso no se puede registrar debido a que tiene cruce con otro curso', 'error');
          }
        }
      )
    } else {
      this.crearForm.markAllAsTouched();
    }
  }

  get nombreField() {
    return this.crearForm.get('nombre');
  }
  get nombreFieldIsValid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.valid;
  }
  get nombreFieldIsInvalid() {
    return (this.nombreField.touched || this.nombreField.dirty) && this.nombreField.invalid;
  }
  get precioField() {
    return this.crearForm.get('precio');
  }
  get precioFieldIsValid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.valid;
  }
  get precioFieldIsInvalid() {
    return (this.precioField.touched || this.precioField.dirty) && this.precioField.invalid;
  }
  get vacantesField() {
    return this.crearForm.get('vacantes');
  }
  get vacantesFieldIsValid() {
    return (this.vacantesField.touched || this.vacantesField.dirty) && this.vacantesField.valid;
  }
  get vacantesFieldIsInvalid() {
    return (this.vacantesField.touched || this.vacantesField.dirty) && this.vacantesField.invalid;
  }
  get descripcionField() {
    return this.crearForm.get('descripcion');
  }
  get descripcionFieldIsValid() {
    return (this.descripcionField.touched || this.descripcionField.dirty) && this.descripcionField.valid;
  }
  get descripcionFieldIsInvalid() {
    return (this.descripcionField.touched || this.descripcionField.dirty) && this.descripcionField.invalid;
  }
  get fechaInicioField() {
    return this.crearForm.get('fechaInicio');
  }
  get fechaInicioFieldIsValid() {
    return (this.fechaInicioField.touched || this.fechaInicioField.dirty) && this.fechaInicioField.valid;
  }
  get fechaInicioFieldIsInvalid() {
    return (this.fechaInicioField.touched || this.fechaInicioField.dirty) && this.fechaInicioField.invalid;
  }
  get fechaFinalField() {
    return this.crearForm.get('fechaFinal');
  }
  get fechaFinalFieldIsValid() {
    return (this.fechaFinalField.touched || this.fechaFinalField.dirty) && this.fechaFinalField.valid;
  }
  get fechaFinalFieldIsInvalid() {
    return (this.fechaFinalField.touched || this.fechaFinalField.dirty) && this.fechaFinalField.invalid;
  }
  get horaInicioField() {
    return this.crearForm.get('horaInicio');
  }
  get horaInicioFieldIsValid() {
    return (this.horaInicioField.touched || this.horaInicioField.dirty) && this.horaInicioField.valid;
  }
  get horaInicioFieldIsInvalid() {
    return (this.horaInicioField.touched || this.horaInicioField.dirty) && this.horaInicioField.invalid;
  }
  get horaFinalField() {
    return this.crearForm.get('horaFinal');
  }
  get horaFinalFieldIsValid() {
    return (this.horaFinalField.touched || this.horaFinalField.dirty) && this.horaFinalField.valid;
  }
  get horaFinalFieldIsInvalid() {
    return (this.horaFinalField.touched || this.horaFinalField.dirty) && this.horaFinalField.invalid;
  }
  get entrenadorField() {
    return this.crearForm.get('entrenador');
  }
  get entrenadorFieldIsValid() {
    return (this.entrenadorField.touched || this.entrenadorField.dirty) && this.entrenadorField.valid;
  }
  get entrenadorFieldIsInvalid() {
    return (this.entrenadorField.touched || this.entrenadorField.dirty) && this.entrenadorField.invalid;
  }

  cerrarModal() {
    this.addOnSiteService.cerrarModal();
  }

}
