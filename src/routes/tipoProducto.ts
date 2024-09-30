import { Request, Response, Application, Router } from "express";
import { TipoProductoController } from '../controllers/tipoProducto.controller';

export class TipoProductoRoutes {
  public tipoProductoController: TipoProductoController = new TipoProductoController();

  public routes(app: Application): void {
    app.route("/tipoProductos/test").get(this.tipoProductoController.test)
    app.route("/tipoProductos").get(this.tipoProductoController.getAllTipoProducto)
    app.route("/tipoProducto/:id").get(this.tipoProductoController.getOneTipoProducto)
    app.route("/tipoProducto").post(this.tipoProductoController.createTipoProducto)
    app.route("/tipoProducto/:id").put(this.tipoProductoController.updateTipoProducto)
    app.route("/tipoProducto/:id").delete(this.tipoProductoController.deleteTipoProducto)
  }
}