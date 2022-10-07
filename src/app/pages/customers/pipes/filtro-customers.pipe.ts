import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';


@Pipe({
  name: 'filtroCustomers'
})
export class FiltroCustomersPipe implements PipeTransform {

  transform(clientes: Cliente[], pages: number = 0, search: string = ''): Cliente[] {
    if (search.length === 0)
      return clientes.slice(pages, pages + 6);

    const filteredClientes = clientes.filter(cli => cli.nombre.includes(search));

    return filteredClientes
      .slice(pages, pages + 6);

  }

}
