import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrenador } from 'src/app/models/entrenador.model';
import { TrainersService } from 'src/app/services/trainers.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styles: [
  ]
})
export class TrainersComponent implements OnInit {

  entrenadores: Entrenador[];
  paginador: any;
  productoSeleccionado: Entrenador;
  search: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private trainersService: TrainersService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }

      this.trainersService.getEntrenadores(page)
        .subscribe(response => {
          this.entrenadores = response.content as Entrenador[]
          this.paginador = response;
        })
    });
  }

  btnSearchEntrenador(search: string) {
    if (search != '') {
      this.trainersService.getEntrenadoresAll().subscribe(entrenadores =>
        this.entrenadores = entrenadores
      )
    }
    else {
      this.trainersService.getEntrenadores(0).subscribe(response => {
        this.entrenadores = response.content as Entrenador[]
        this.paginador = response;
      })
    }
    this.search = search;
  } /*MEJORAR BUSCADOR*/

}
