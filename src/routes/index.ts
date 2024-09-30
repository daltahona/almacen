import { ClienteRoutes } from './cliente';
import { TipoProductoRoutes } from './tipoProducto';
import { VentaRoutes } from './venta';
import { ProductoRoutes } from './producto';

export class Routes {
    public clienteRoutes: ClienteRoutes = new ClienteRoutes();
    public ventaRoutes: VentaRoutes = new VentaRoutes();
    public tipoProductoRoutes: TipoProductoRoutes = new TipoProductoRoutes();
    public productoRoutes: ProductoRoutes = new ProductoRoutes();
}

