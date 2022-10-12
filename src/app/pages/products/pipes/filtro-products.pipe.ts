import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

@Pipe({
  name: 'filtroProducts'
})
export class FiltroProductsPipe implements PipeTransform {

  transform(productos: Producto[], search: string = ''): Producto[] {
    const filteredProductos = productos.filter(cli => cli.nombre.includes(search));

    return filteredProductos;

  }

}
