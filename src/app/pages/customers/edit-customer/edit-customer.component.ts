import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
import { EditCustomerService } from './edit-customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit, OnChanges {

  @Input() cliente: Cliente;
  titulo: string = 'Actualizar Cliente'
  errores: string[];
  editForm: FormGroup;

  constructor(private router: Router,
    public editCustomerService: EditCustomerService,
    private customersService: CustomersService,
    private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  public buildForm() {
    this.editForm = this.formBuilder.group({
      id: [this.cliente.id],
      nombre: [this.cliente.nombre, [Validators.required]],
      apellido: [this.cliente.apellido, [Validators.required]],
      telefono: [this.cliente.telefono, [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(/^[0-9]+$/)]],
    });
  }

  edit($event) {
    event.preventDefault();
    if (this.editForm.valid) {
      const value = this.editForm.value as Cliente;
      this.customersService.update(value).subscribe(
        cliente => {
          this.editCustomerService.notificarUpload.emit(cliente.cliente);
          Swal.fire('Cliente Actualizado', `El cliente ${value.nombre} se ha actualizado correctamente`, `success`)
          this.cerrarModal();
        },
      );
    }
  }

  get nombreField() {
    return this.editForm.get('nombre');
  }
  get nombreFieldIsValid() {
    return this.nombreField.touched && this.nombreField.valid;
  }
  get nombreFieldIsInvalid() {
    return this.nombreField.touched && this.nombreField.invalid;
  }
  get apellidoField() {
    return this.editForm.get('apellido');
  }
  get apellidoFieldIsValid() {
    return this.apellidoField.touched && this.apellidoField.valid;
  }
  get apellidoFieldIsInvalid() {
    return this.apellidoField.touched && this.apellidoField.invalid;
  }
  get telefonoField() {
    return this.editForm.get('telefono');
  }
  get telefonoFieldIsValid() {
    return this.telefonoField.touched && this.telefonoField.valid;
  }
  get telefonoFieldIsInvalid() {
    return this.telefonoField.touched && this.telefonoField.invalid;
  }

  cerrarModal() {
    this.editCustomerService.cerrarModal();
  }
}
