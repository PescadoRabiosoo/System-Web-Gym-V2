import { Cliente } from "./cliente.model";
import { ItemComprobanteCurso } from "./item-comprobante-curso.model";

export class ComprobanteCurso {
    id: number;
    createAt: Date;
    cliente: Cliente;
    items: Array<ItemComprobanteCurso> = [];
    total: number;

    calcularGranTotal(): number {
        this.total = 0;
        this.items.forEach((item: ItemComprobanteCurso) => {
            this.total += item.calcularImporte();
        });
        return this.total;
    }
}