import { Pipe, PipeTransform } from '@angular/core';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';

@Pipe({
  name: 'filtroOnSite'
})
export class FiltroOnSitePipe implements PipeTransform {

  transform(cursos: CursoPresencial[], search: string = ''): CursoPresencial[] {
    const filteredCursos = cursos.filter(cli => cli.nombre.includes(search));

    return filteredCursos;

  }

}
