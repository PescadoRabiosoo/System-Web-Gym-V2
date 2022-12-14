import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { ImgProfileService } from 'src/app/pages/user/profile/img-profile/img-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

declare function customSidebar(): void;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  id: number;
  usuarioLogeado: Usuario = new Usuario();

  constructor(private authService: AuthService, public imgProfileService: ImgProfileService, private router: Router) { }

  ngOnInit(): void {
    customSidebar();
    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioLogeado = response as Usuario;
    });

    this.imgProfileService.notificarUpload.subscribe(usuario => {
      this.usuarioLogeado = usuario;
    });
  }

  logout(): void {
    let username = this.authService.usuario.nombre;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con exito`, 'success');
    this.router.navigate(['/login']);
  }

}
