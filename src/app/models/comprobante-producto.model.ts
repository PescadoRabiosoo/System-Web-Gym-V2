import { Cliente } from "./cliente.model";
import { ItemComprobanteProducto } from "./item-comprobante-producto.model";

export class ComprobanteProducto {
    id: number;
    createAt: Date;
    cliente: Cliente;
    items: Array<ItemComprobanteProducto> = [];
    total: number;

    calcularGranTotal(): number {
        this.total = 0;
        this.items.forEach((item: ItemComprobanteProducto) => {
            this.total += item.calcularImporte();
        });
        return this.total;
    }
}
