import { CursoPresencial } from "./curso-presencial.model";

export class ItemComprobanteCurso {
    id: number;
    curso: CursoPresencial;
    cantidad: number = 1;
    importe: number;

    calcularImporte(): number {
        return this.cantidad * this.curso.precio;
    }
}
