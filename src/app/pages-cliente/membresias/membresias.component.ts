import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membresia } from 'src/app/models/membresia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { MembershipsService } from 'src/app/services/memberships.service';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css']
})
export class MembresiasComponent implements OnInit {

  membresias: Membresia[];
  paginador: any;
  id: number;
  usuarioComparar: Usuario;

  constructor(private activatedRoute: ActivatedRoute,
    private membershipsService: MembershipsService,
    private authService: AuthService,
    private router: Router) { }

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
          }
        )
    });

    this.id = JSON.parse(sessionStorage.getItem('usuario')).id;

    this.authService.obtenerUsuario(this.id).subscribe(response => {
      this.usuarioComparar = response as Usuario;
    });

  }

  suscribirse(membresia: Membresia) {
    this.router.navigate(['/pago']);
  }

}
