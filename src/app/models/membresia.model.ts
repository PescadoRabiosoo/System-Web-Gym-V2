import { Cliente } from "./cliente.model";

export class Membresia {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    duracion: number;
    enabled: Boolean;
    clientes: Array<Cliente> = []
}
