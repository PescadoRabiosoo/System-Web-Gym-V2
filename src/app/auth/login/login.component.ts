import { Component, AfterViewInit, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

declare const google: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  usuario: Usuario;

  constructor(private router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder) {
    this.usuario = new Usuario();
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
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    })
  }

  save($event) {
    event.preventDefault();
    if (this.loginForm.valid) {

      const value = this.loginForm.value as Usuario;

      this.authService.login(value).subscribe(response => {
        console.log(response);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        let usuario = this.authService.usuario;
        console.log(usuario)

        if (usuario.roles[0] === 'ROLE_ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if (usuario.roles[0] === 'ROLE_USER') {
          this.router.navigate(['/espacio']);
        }

        Swal.fire('Login', `Hola ${usuario.nombre}, has iniciado sesión con exito`, 'success');
      }, err => {
        if (err.status == 400) {
          Swal.fire('Error Login', 'Correo y/o contraseña incorrectas', 'error')
        }
      }
      );

    } else {
      this.loginForm.markAllAsTouched();
      Swal.fire('Error Login', 'Correo y/o contraseña vacias', 'error')
    }
  }

  get emailField() {
    return this.loginForm.get('correo');
  }
  get emailFieldIsValid() {
    return this.emailField.touched && this.emailField.valid;
  }
  get emailFieldIsInvalid() {
    return this.emailField.touched && this.emailField.invalid;
  }
  get claveField() {
    return this.loginForm.get('clave');
  }
  get claveFieldIsValid() {
    return this.claveField.touched && this.claveField.valid;
  }
  get claveFieldIsInvalid() {
    return this.claveField.touched && this.claveField.invalid;
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.correo == null || this.usuario.clave == null) {
      Swal.fire('Error Login', 'Correo o contraseña vacias', 'error')
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;
      console.log(usuario)

      if (usuario.roles[0] === 'ROLE_ADMIN') {
        this.router.navigate(['/dashboard']);
      } else if (usuario.roles[0] === 'ROLE_USER') {
        this.router.navigate(['/espacio']);
      }

      Swal.fire('Login', `Hola ${usuario.nombre}, has iniciado sesión con exito`, 'success');
    }, err => {
      if (err.status == 400) {
        Swal.fire('Error Login', 'Correo y/o contraseña incorrectas', 'error')
      }
    }
    );
  }

}
