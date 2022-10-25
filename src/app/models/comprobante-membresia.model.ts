import { Cliente } from "./cliente.model";

export class ComprobanteMembresia {
    id: number;
    termino: Date;
    createAt: Date;
    total: number;
    cliente: Cliente;
}
