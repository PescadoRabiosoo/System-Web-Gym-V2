import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Caracteristica } from 'src/app/models/caracteristica.model';
import { Membresia } from 'src/app/models/membresia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { MembershipsService } from 'src/app/services/memberships.service';
import { RegistroHorarioService } from './registro-horario/registro-horario.service';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent implements OnInit {

  membresias: Membresia[];
  paginador: any;
  caracteristicas: Caracteristica[];
  prueba: string[];
  id: number;
  usuarioComparar: Usuario;
  membresiaSeleccionada: Membresia;

  constructor(private activatedRoute: ActivatedRoute,
    private membershipsService: MembershipsService,
    private authService: AuthService,
    private router: Router,
    public registroHorarioService: RegistroHorarioService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.membershipsService.getMembresias(page)
        .subscribe(
          response => {
            this.membresias = response.content as Membresia[]
            this.paginador = response;
            this.caracteristicas = response.content.map(res => res.descripcion.split(';'));
            console.log(this.caracteristicas);
          }
        )
    });

    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioComparar = response as Usuario;
    });

  }

  suscribirse(membresia: Membresia) {
    this.membresiaSeleccionada = membresia;
    this.registroHorarioService.abrirModal();
  }

  pagar() {
    this.router.navigate(['/pago']);
  }

}
