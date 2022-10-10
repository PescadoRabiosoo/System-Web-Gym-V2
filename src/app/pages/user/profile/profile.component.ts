import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
import { ImgProfileService } from './img-profile/img-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  id: number;
  usuarioLogeado: Usuario = new Usuario();
  usuarioSeleccionado: Usuario;
  errores: string[];
  nombre: string;
  apellido: string;
  telefono: number;
  editForm: FormGroup;

  constructor(private authService: AuthService,
    private customersService: CustomersService,
    private formBuilder: FormBuilder,
    public imgProfileService: ImgProfileService) {

  }

  ngOnInit(): void {
    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioLogeado = response;
    });
    console.log(this.usuarioSeleccionado)
    this.buildForm();

    this.imgProfileService.notificarUpload.subscribe(usuario => {
      this.usuarioLogeado = usuario;
    });
  }

  public buildForm() {
    this.editForm = this.formBuilder.group({
      id: [this.id],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(/^[0-9]+$/)]],
    });
  }

  edit($event) {
    event.preventDefault();
    if (this.editForm.valid) {
      const value = this.editForm.value as Usuario;
      console.log(value)
      this.customersService.update(value).subscribe(
        cliente => {
          Swal.fire('Datos Actualizados', `El cliente ${value.nombre} se ha actualizado correctamente`, `success`)
        },
      );
    } else {
      this.editForm.markAllAsTouched();
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

  abrirModal(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.imgProfileService.abrirModal();
  }

}
