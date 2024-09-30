import { Request, Response, Application, Router } from "express";
import { ProductoController } from '../controllers/producto.controller';

export class ProductoRoutes {
    public ProductoController: ProductoController = new ProductoController();

    public routes(app: Application): void {
        app.route("/productos/test").get(this.ProductoController.test)
        app.route("/productos").get(this.ProductoController.getAllProducto)
        app.route("/producto/:id").get(this.ProductoController.getOneProducto)
        app.route("/producto").post(this.ProductoController.createProducto)
        app.route("/producto/:id").put(this.ProductoController.updateProducto)
        app.route("/producto/:id").delete(this.ProductoController.deleteProducto)
        app.route("/producto/:id/hide").put(this.ProductoController.hideProducto)
    }
}