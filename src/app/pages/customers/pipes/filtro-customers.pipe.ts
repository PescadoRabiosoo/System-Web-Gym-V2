import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';


@Pipe({
  name: 'filtroCustomers'
})
export class FiltroCustomersPipe implements PipeTransform {

  transform(clientes: Cliente[], search: string = ''): Cliente[] {

    const filteredClientes = clientes.filter(cli => cli.nombre.includes(search));

    return filteredClientes;

  }

}
