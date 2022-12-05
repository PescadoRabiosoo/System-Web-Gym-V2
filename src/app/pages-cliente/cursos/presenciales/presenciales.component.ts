import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carrito } from 'src/app/models/carrito.model';
import { Cliente } from 'src/app/models/cliente.model';
import { ComprobanteCurso } from 'src/app/models/comprobante-curso.model';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { OnSiteService } from 'src/app/services/on-site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presenciales',
  templateUrl: './presenciales.component.html',
  styleUrls: ['./presenciales.component.css']
})
export class PresencialesComponent implements OnInit {

  presenciales: CursoPresencial[];
  paginador: any;

  pages: number = 0;
  restante: number = 0;
  pagina: number = 1;
  paginas: number[] = [];
  search: string = '';

  cliete: Cliente = new Cliente();
  cursos = [];

  usuarioLogeado: Usuario = new Usuario();

  constructor(
    private onSiteService: OnSiteService,
    private carritoService: CarritoService,
    private authService: AuthService) { }

  ngOnInit(): void {

    let id = JSON.parse(sessionStorage.getItem('usuario')).id;
    this.authService.obtenerUsuario(id).subscribe(params => {
      this.usuarioLogeado = params
      params.comprocursos.map(ele => {
        ele.items.map(item => {
          this.cursos.push(item.curso);
        })
      })
      console.log(this.cursos)
    });


    this.onSiteService.getCursosPresencialesDisponibles()
      .subscribe(response => {
        this.presenciales = response.filter((response: CursoPresencial) => response.vacantes !== 0);
        this.restante = this.presenciales.length;
        this.pagina = this.presenciales.length % 4 == 0 ? this.presenciales.length / 4 : Math.floor(this.presenciales.length / 4) + 1;
        for (let index = 1; index < this.pagina + 1; index++) {
          this.paginas.push(index)

        }
        console.log(this.presenciales.length / 4)
        console.log(this.paginas)
      });
  }

  addCart(presencial: CursoPresencial) {
    if (this.suscrito(presencial.id)) {
      return Swal.fire('Suscrito', `Ud. se encuentra registrado en el curso ${presencial.nombre}`, 'info')
    }
    if (this.cruce(presencial)) {
      return Swal.fire('Cruce', `El horario del curso ${presencial.nombre} coincide con otro curso registrado`, 'info')
    }

    var nuevoItem = new Carrito();
    nuevoItem.curso = presencial;
    nuevoItem.cliente = this.usuarioLogeado;
    console.log(nuevoItem)

    return this.carritoService.guardarItemC(nuevoItem).subscribe(result => {
      console.log(result),
        Swal.fire('Info', `${result}`, 'info')
    });

  }

  suscrito(id: number) {
    let suscrito = false;
    this.cursos.map(curso => {
      if (curso.id === id) {
        suscrito = true;
      }
    })
    return suscrito;
  }

  cruce(presencial: CursoPresencial) {
    let cruce = false;
    this.cursos.map(curso => {
      if (curso.horaInicio === presencial.horaInicio) {
        cruce = true;
      }
    })
    return cruce;
  }

  siguiente() {
    if (this.pages <= this.restante && this.restante >= 4) {
      this.restante -= 4;
      this.pages += 4;
    }
  }

  anterior() {
    if (this.pages > 0) {
      this.pages -= 4;
      if (this.restante >= this.presenciales.length) {
        this.restante = this.presenciales.length;
      } else {
        this.restante += 8;
      }
    }
  }

  codigo(pag: number) {
    this.pages = (pag - 1) * 4;
    this.restante = this.presenciales.length - this.pages;
  }

  btnSearchCurso(search: string) {
    this.search = search;
  }

}
