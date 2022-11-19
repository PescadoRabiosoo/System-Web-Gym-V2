import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';

@Pipe({
  name: 'filtroProductos'
})
export class FiltroProductosPipe implements PipeTransform {

  transform(productos: Producto[], page: number = 0, search: string = ''): Producto[] {
    const filteredProductos = productos.filter(cli => cli.nombre.includes(search));
    return filteredProductos.slice(page, page + 8);
  }

}
