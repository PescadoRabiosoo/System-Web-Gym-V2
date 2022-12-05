import { Cliente } from "./cliente.model";
import { ItemComprobanteProducto } from "./item-comprobante-producto.model";

export class ComprobanteProducto {
    id: number;
    descripcion: string;
    observacion: string;
    createAt: Date;
    cliente: Cliente;
    items: Array<ItemComprobanteProducto> = [];
    total: number;
    mes: string;

    calcularGranTotal(): number {
        this.total = 0;
        this.items.forEach((item: ItemComprobanteProducto) => {
            this.total += item.calcularImporte();
        });
        return this.total;
    }
}
