import { Pipe, PipeTransform } from '@angular/core';
import { Membresia } from 'src/app/models/membresia.model';

@Pipe({
  name: 'filtroMemberships'
})
export class FiltroMembershipsPipe implements PipeTransform {

  transform(membresias: Membresia[], search: string = ''): Membresia[] {
    const filteredMembresias = membresias.filter(mem => mem.nombre.includes(search));

    return filteredMembresias;
  }

}
