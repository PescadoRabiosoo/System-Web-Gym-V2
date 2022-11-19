import { Tipo } from "./tipo.model";

export class Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    marca: string;
    descripcion: string;
    foto: string;
    enabled: Boolean;
    createAt: string;
    tipo: Tipo;
}