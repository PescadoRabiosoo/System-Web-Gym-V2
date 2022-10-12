import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { ImgPerfilService } from 'src/app/pages-cliente/espacio/img-perfil/img-perfil.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavsideService } from 'src/app/services/navside.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.css']
})
export class NavsideComponent implements OnInit {

  menuItems?: any[];
  id: number;
  usuarioLogeado: Usuario = new Usuario();

  constructor(private navsideService: NavsideService,
    private authService: AuthService,
    private router: Router,
    public imgPerfilService: ImgPerfilService) {
    this.menuItems = navsideService.menu;
  }

  ngOnInit(): void {
    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioLogeado = response as Usuario;
    });

    this.imgPerfilService.notificarUpload.subscribe(usuario => {
      this.usuarioLogeado = usuario;
    });
  }

  logout(): void {
    let username = this.authService.usuario.nombre;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-primary',
        cancelButton: 'btn btn-outline-danger',
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea cerrar sesión?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        swalWithBootstrapButtons.fire(
          'Sesión terminada!',
          `${username} Ha cerrado sesión con exito`,
          'success'
        )
        this.router.navigate(['/login']);
      }
    })

  }
}
