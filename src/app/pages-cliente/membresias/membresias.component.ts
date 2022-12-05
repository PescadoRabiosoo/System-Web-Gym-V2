import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membresia } from 'src/app/models/membresia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { MembershipsService } from 'src/app/services/memberships.service';
import Swal from 'sweetalert2';
import { RegistroHorarioService } from './registro-horario/registro-horario.service';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent implements OnInit {

  membresias: Membresia[];
  paginador: any;
  prueba: string[];
  id: number;
  usuarioComparar: Usuario;
  membresiaSeleccionada: Membresia;
  pages: number = 0;
  restante: number = 0;

  public cargando: Boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private membershipsService: MembershipsService,
    private authService: AuthService,
    private router: Router,
    public registroHorarioService: RegistroHorarioService) { }

  ngOnInit(): void {
    /*this.activatedRoute.paramMap.subscribe(params => {
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
            console.log(response.content)
          }
        )
    });*/

    this.membershipsService.getMembresiasDisponibles().subscribe(
      response => {
        this.membresias = response;
        this.restante = this.membresias.length;
        console.log(this.membresias)
        console.log(response.map((res: any) => res.descripcion.split(';')))
      }
    )

    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioComparar = response as Usuario;
    });

    setTimeout(() => {
      this.cargando = false;
    }, 3000);
  }

  suscribirse(membresia: Membresia) {
    if (this.usuarioComparar.estado == false) {
      this.membresiaSeleccionada = membresia;
      this.registroHorarioService.abrirModal();
    } else {
      Swal.fire('Info', `Ud. cuenta con una suscripcion, no puede continuar`, `info`)
    }
  }

  pagar() {
    let param = 'user'
    this.router.navigate([`${'/pago/membresia/' + param}`]);
  }

  renovar() {
    if (this.usuarioComparar.compromembresias) {
      Swal.fire('Info', `Su suscripcion actual aun no ha caducado, no puede continuar`, `info`)
    }
  }

  anterior() {
    if (this.pages > 0)
      this.pages -= 3;
  }

  siguiente() {
    if (this.pages < this.restante) {
      this.restante -= 3;
      this.pages += 3;
    }
  }
}
