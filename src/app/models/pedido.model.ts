export interface Pedido {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
  precio: number;
  estado: string;
  fechaCreacion: string;
}

export type NuevoPedido = Pick<Pedido, 'cliente' | 'producto' | 'cantidad' | 'precio'>;
