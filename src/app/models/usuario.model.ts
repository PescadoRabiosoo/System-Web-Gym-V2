import { ComprobanteProducto } from "./comprobante-producto.model";
import { HoraDisponible } from "./hora-disponible.model";
import { Membresia } from "./membresia.model";

export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    clave: string;
    dni: string;
    telefono: number;
    createAt: string;
    estado: Boolean;
    foto: string;
    membresia: Membresia;
    hora: HoraDisponible;
    comprobantes: Array<ComprobanteProducto> = []
    roles: string[] = [];
}