import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComprobanteProducto } from 'src/app/models/comprobante-producto.model';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
import { ImgPerfilService } from './img-perfil/img-perfil.service';
import { VerCompraService } from './ver-compra/ver-compra.service';
import { VerCursoService } from './ver-curso/ver-curso.service';

@Component({
  selector: 'app-espacio',
  templateUrl: './espacio.component.html',
  styleUrls: ['./espacio.component.css']
})
export class EspacioComponent implements OnInit {

  id: number;
  usuarioLogeado: Usuario = new Usuario();
  usuarioSeleccionado: Usuario;
  errores: string[];
  nombre: string;
  apellido: string;
  telefono: number;
  editForm: FormGroup;

  comprobanteSeleccionada: ComprobanteProducto;
  cursoSeleccionado: CursoPresencial;

  constructor(private authService: AuthService,
    private customersService: CustomersService,
    private formBuilder: FormBuilder,
    public imgPerfilService: ImgPerfilService,
    public verCompraService: VerCompraService,
    public verCursoService: VerCursoService) { }

  ngOnInit(): void {
    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioLogeado = response;
      console.log(this.usuarioLogeado)
    });

    this.buildForm();

    this.imgPerfilService.notificarUpload.subscribe(usuario => {
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
    this.imgPerfilService.abrirModal();
  }

  abrirCompra(comprobante: ComprobanteProducto) {
    this.comprobanteSeleccionada = comprobante;
    this.verCompraService.abrirModal();
  }

  abrirCurso(curso: CursoPresencial) {
    this.cursoSeleccionado = curso;
    this.verCursoService.abrirModal();
  }

}
