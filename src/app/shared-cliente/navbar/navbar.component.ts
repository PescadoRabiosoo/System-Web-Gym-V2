import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ImgPerfilService } from 'src/app/pages-cliente/espacio/img-perfil/img-perfil.service';
import { AuthService } from 'src/app/services/auth.service';

declare function customSidebar(): void;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id: number;
  usuarioLogeado: Usuario = new Usuario();

  constructor(private authService: AuthService,
    public imgPerfilService: ImgPerfilService) { }

  ngOnInit(): void {
    customSidebar();
    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioLogeado = response as Usuario;
    });

    this.imgPerfilService.notificarUpload.subscribe(usuario => {
      this.usuarioLogeado = usuario;
    });
  }

}
