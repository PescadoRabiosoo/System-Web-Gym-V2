import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';
import { CarritoService } from 'src/app/services/carrito.service';
import { OnSiteService } from 'src/app/services/on-site.service';

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


  constructor(
    private onSiteService: OnSiteService,
    private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.onSiteService.getCursosPresencialesDisponibles()
      .subscribe(response => {
        this.presenciales = response
        this.restante = this.presenciales.length;
        this.pagina = Math.floor(this.presenciales.length / 4) + 1;
        for (let index = 1; index < this.pagina + 1; index++) {
          this.paginas.push(index)
        }
      });
  }

  addCart(presencial: CursoPresencial) {
    this.carritoService.addCartP(presencial);
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
