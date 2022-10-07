import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidations } from 'src/app/auth/my-validations';
import { Cliente } from 'src/app/models/cliente.model';
import { HoraDisponible } from 'src/app/models/hora-disponible.model';
import { Membresia } from 'src/app/models/membresia.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
import { AddCustomerService } from './add-customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  titulo: string = 'Registrar Nuevo Cliente'
  membresias: Membresia[];
  horas: HoraDisponible[];
  cliente: Cliente = new Cliente();
  errores: string[];

  crearForm: FormGroup;

  constructor(private router: Router,
    public addCustomerService: AddCustomerService,
    private customersService: CustomersService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.cargarMembresias();
    this.cargarHorarios();
  }

  public buildForm() {
    this.crearForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email], MyValidations.validateEmail(this.authService)],
      clave: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))/
      )]],
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern(/^[0-9]+$/)]],
      telefono: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(/^[0-9]+$/)]],
      membresia: ['', [Validators.required]],
      hora: ['', [Validators.required]],
    })
  }

  cargarMembresias() {
    this.authService.getMembresias().subscribe(membresias => this.membresias = membresias);
  }

  cargarHorarios() {
    this.authService.getHoras().subscribe(horas => this.horas = horas);
  }

  save($event) {
    event.preventDefault();
    if (this.crearForm.valid) {
      const value = this.crearForm.value as Cliente;
      this.customersService.create(value).subscribe(
        cliente => {
          Swal.fire('Nuevo Cliente', `El cliente ${cliente.nombre} se ha registrado correctamente`, `success`)
          this.cerrarModal();
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error("Codigo del error desde el backend: " + err.status);
          console.error(err.error.errors);
        }
      );
    } else {
      this.crearForm.markAllAsTouched();
    }
  }

  get emailField() {
    return this.crearForm.get('correo');
  }
  get emailFieldIsValid() {
    return (this.emailField.touched || this.emailField.dirty) && this.emailField.valid;
  }
  get emailFieldIsInvalid() {
    return (this.emailField.touched || this.emailField.dirty) && this.emailField.invalid;
  }
  get claveField() {
    return this.crearForm.get('clave');
  }
  get claveFieldIsValid() {
    return (this.claveField.touched || this.claveField.dirty) && this.claveField.valid;
  }
  get claveFieldIsInvalid() {
    return (this.claveField.touched || this.claveField.dirty) && this.claveField.invalid;
  }
  get nombreField() {
    return this.crearForm.get('nombre');
  }
  get nombreFieldIsValid() {
    return this.nombreField.touched && this.nombreField.valid;
  }
  get nombreFieldIsInvalid() {
    return this.nombreField.touched && this.nombreField.invalid;
  }
  get apellidoField() {
    return this.crearForm.get('apellido');
  }
  get apellidoFieldIsValid() {
    return this.apellidoField.touched && this.apellidoField.valid;
  }
  get apellidoFieldIsInvalid() {
    return this.apellidoField.touched && this.apellidoField.invalid;
  }
  get dniField() {
    return this.crearForm.get('dni');
  }
  get dniFieldIsValid() {
    return this.dniField.touched && this.dniField.valid;
  }
  get dniFieldIsInvalid() {
    return this.dniField.touched && this.dniField.invalid;
  }
  get telefonoField() {
    return this.crearForm.get('telefono');
  }
  get telefonoFieldIsValid() {
    return this.telefonoField.touched && this.telefonoField.valid;
  }
  get telefonoFieldIsInvalid() {
    return this.telefonoField.touched && this.telefonoField.invalid;
  }
  get membresiaField() {
    return this.crearForm.get('membresia');
  }
  get membresiaFieldIsValid() {
    return this.membresiaField.touched && this.membresiaField.valid;
  }
  get membresiaFieldIsInvalid() {
    return this.membresiaField.touched && this.membresiaField.invalid;
  }
  get horaField() {
    return this.crearForm.get('hora');
  }
  get horaFieldIsValid() {
    return this.horaField.touched && this.horaField.valid;
  }
  get horaFieldIsInvalid() {
    return this.horaField.touched && this.horaField.invalid;
  }

  cerrarModal() {
    this.addCustomerService.cerrarModal();
  }
}
