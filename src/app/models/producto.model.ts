import { Tipo } from "./tipo.model";

export class Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    marca: string;
    foto: string;
    createAt: string;
    tipo: Tipo;
}