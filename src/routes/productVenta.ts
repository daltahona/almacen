import { Request, Response, Application, Router } from "express";
import { ProductVentaController } from '../controllers/productVenta.controller';

export class ProductVentaRoutes {
  public ProductVentaController: ProductVentaController = new ProductVentaController();

  public routes(app: Application): void {
    app.route("/productVentas/test").get(this.ProductVentaController.test)
    app.route("/productVentas").get(this.ProductVentaController.getAllProductVenta)
    app.route("/productVenta/:id").get(this.ProductVentaController.getOneProductVenta)
    app.route("/productVenta").post(this.ProductVentaController.createProductVenta)
    app.route("/productVenta/:id").put(this.ProductVentaController.updateProductVenta)
    app.route("/productVenta/:id").delete(this.ProductVentaController.deleteProductVenta)
    app.route('/productVenta/:id').patch(this.ProductVentaController.hideProductVenta);
  }
}