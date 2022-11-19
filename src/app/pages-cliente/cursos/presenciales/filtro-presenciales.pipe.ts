import { Pipe, PipeTransform } from '@angular/core';
import { CursoPresencial } from 'src/app/models/curso-presencial.model';

@Pipe({
  name: 'filtroPresenciales'
})
export class FiltroPresencialesPipe implements PipeTransform {

  transform(cursos: CursoPresencial[], page: number = 0, search: string = ''): CursoPresencial[] {
    const filteredCursos = cursos.filter(cli => cli.nombre.includes(search));
    return filteredCursos.slice(page, page + 4);
  }

}
