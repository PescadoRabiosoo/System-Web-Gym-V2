import { Producto } from "./producto.model";

export class ItemComprobanteProducto {
    id: number;
    producto: Producto;
    cantidad: number = 1;
    importe: number;

    calcularImporte(): number {
        return this.cantidad * this.producto.precio;
    }
}
