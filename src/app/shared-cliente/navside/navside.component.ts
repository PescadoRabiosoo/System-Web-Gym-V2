import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
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
    private router: Router) {
    this.menuItems = navsideService.menu;
  }

  ngOnInit(): void {
    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioLogeado = response as Usuario;
    });
  }

  logout(): void {
    let username = this.authService.usuario.nombre;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con exito`, 'success');
    this.router.navigate(['/login']);
  }

}
