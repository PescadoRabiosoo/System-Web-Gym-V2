import { ComprobanteCurso } from "../models/comprobante-curso.model";
import { ComprobanteMembresia } from "../models/comprobante-membresia.model";
import { ComprobanteProducto } from "../models/comprobante-producto.model";

export interface PlanesVendidos {
    planesvendidos: number;
}

export interface ClientesRegistrados {
    clientesregistrados: number;
}

export interface CantidadProductos {
    clientesregistrados: number;
}

export interface CantidadCursos {
    clientesregistrados: number;
}

export interface GananciasMembresia {
    comprobantes: ComprobanteMembresia[];
    ganancias: number[];
    nombres: string[];
}

export interface GananciasProducto {
    comprobantes: ComprobanteProducto[];
    ganancias: number[];
    nombres: string[];
}

export interface GananciasCurso {
    comprobantes: ComprobanteCurso[];
    ganancias: number[];
    nombres: string[];
}