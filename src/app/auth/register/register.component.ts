import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HoraDisponible } from 'src/app/models/hora-disponible.model';
import { Membresia } from 'src/app/models/membresia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { MyValidations } from '../my-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public errores: string[];
  membresias: Membresia[];
  horas: HoraDisponible[];

  registerForm: FormGroup;

  /*public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Axel', Validators.required],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.requiredTrue],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });*/

  constructor(private router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      let usuario = this.authService.usuario;
      Swal.fire('Login', `Hola ${usuario.nombre} ya estas autenticado`, 'info');
      if (usuario.roles[0] === 'ROLE_ADMIN') {
        this.router.navigate(['/dashboard']);
      } else if (usuario.roles[0] === 'ROLE_USER') {
        this.router.navigate(['/espacio']);
      }
    }

    this.authService.getMembresias().subscribe((membresias => this.membresias = membresias));
    this.authService.getHoras().subscribe((horas => this.horas = horas))
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email], MyValidations.validateEmail(this.authService)],
      clave: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))/
      )]],
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern(/^[0-9]+$/)]],
      telefono: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(/^[0-9]+$/)]],
      membresia: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      terminos: [false, Validators.requiredTrue],
    })
  }

  save($event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      const value = this.registerForm.value as Usuario;
      console.log(value);
      this.authService.register(value).subscribe(
        cliente => {
          this.router.navigate(['/login'])
          Swal.fire('Bienvenido', `${cliente.nombre} te has registrado satisfactoriamente`, `success`)
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error("Codigo del error desde el backend: " + err.status);
          console.error(err.error.errors);
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get emailField() {
    return this.registerForm.get('correo');
  }
  get emailFieldIsValid() {
    return (this.emailField.touched || this.emailField.dirty) && this.emailField.valid;
  }
  get emailFieldIsInvalid() {
    return (this.emailField.touched || this.emailField.dirty) && this.emailField.invalid;
  }
  get claveField() {
    return this.registerForm.get('clave');
  }
  get claveFieldIsValid() {
    return (this.claveField.touched || this.claveField.dirty) && this.claveField.valid;
  }
  get claveFieldIsInvalid() {
    return (this.claveField.touched || this.claveField.dirty) && this.claveField.invalid;
  }
  get nombreField() {
    return this.registerForm.get('nombre');
  }
  get nombreFieldIsValid() {
    return this.nombreField.touched && this.nombreField.valid;
  }
  get nombreFieldIsInvalid() {
    return this.nombreField.touched && this.nombreField.invalid;
  }
  get apellidoField() {
    return this.registerForm.get('apellido');
  }
  get apellidoFieldIsValid() {
    return this.apellidoField.touched && this.apellidoField.valid;
  }
  get apellidoFieldIsInvalid() {
    return this.apellidoField.touched && this.apellidoField.invalid;
  }
  get dniField() {
    return this.registerForm.get('dni');
  }
  get dniFieldIsValid() {
    return this.dniField.touched && this.dniField.valid;
  }
  get dniFieldIsInvalid() {
    return this.dniField.touched && this.dniField.invalid;
  }
  get telefonoField() {
    return this.registerForm.get('telefono');
  }
  get telefonoFieldIsValid() {
    return this.telefonoField.touched && this.telefonoField.valid;
  }
  get telefonoFieldIsInvalid() {
    return this.telefonoField.touched && this.telefonoField.invalid;
  }
  get membresiaField() {
    return this.registerForm.get('membresia');
  }
  get membresiaFieldIsValid() {
    return this.membresiaField.touched && this.membresiaField.valid;
  }
  get membresiaFieldIsInvalid() {
    return this.membresiaField.touched && this.membresiaField.invalid;
  }
  get horaField() {
    return this.registerForm.get('hora');
  }
  get horaFieldIsValid() {
    return this.horaField.touched && this.horaField.valid;
  }
  get horaFieldIsInvalid() {
    return this.horaField.touched && this.horaField.invalid;
  }
  get terminosField() {
    return this.registerForm.get('terminos');
  }
  get terminosFieldIsValid() {
    return this.terminosField.touched && this.terminosField.valid;
  }
  get terminosFieldIsInvalid() {
    return this.terminosField.touched && this.terminosField.invalid;
  }

  /*contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }*/

  /*aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }*/

  /*passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noesIgual: true })
      }
    }
  }*/


}
