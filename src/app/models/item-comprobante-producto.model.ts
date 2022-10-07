import { Producto } from "./producto.model";

export class ItemComprobanteProducto {
    id: number;
    producto: Producto;
    cantidad: number = 1;
    importe: number;

    public calcularImporte(): number {
        return this.cantidad * this.producto.precio;
    }
}
