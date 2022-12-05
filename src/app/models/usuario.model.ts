import { ComprobanteCurso } from "./comprobante-curso.model";
import { ComprobanteMembresia } from "./comprobante-membresia.model";
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
    enabled: Boolean;
    foto: string;
    membresia: Membresia;
    hora: HoraDisponible;
    comprobantes: Array<ComprobanteProducto> = []
    comprocursos: Array<ComprobanteCurso> = []
    roles: string[] = [];
    cursos: string[] = [];
    compromembresias: Array<ComprobanteMembresia> = []
}