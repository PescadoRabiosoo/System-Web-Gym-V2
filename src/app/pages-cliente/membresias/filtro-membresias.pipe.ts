import { Pipe, PipeTransform } from '@angular/core';
import { Membresia } from 'src/app/models/membresia.model';

@Pipe({
  name: 'filtroMembresias'
})
export class FiltroMembresiasPipe implements PipeTransform {

  transform(membresias: Membresia[], page: number = 0): Membresia[] {
    return membresias.slice(page, page + 3);
  }

}
