import { Cliente } from "./cliente.model";
import { CursoPresencial } from "./curso-presencial.model";
import { Producto } from "./producto.model";

export class Carrito {
    id: number;
    curso: CursoPresencial;
    producto: Producto;
    cantidad: number;
    cliente: Cliente;

}