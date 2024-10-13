import { Request, Response, Application, Router } from "express";
import { VentaController } from '../controllers/venta.controller';

export class VentaRoutes {
  public VentaController: VentaController = new VentaController();

  public routes(app: Application): void {
    app.route("/ventas/test").get(this.VentaController.test)
    app.route("/ventas").get(this.VentaController.getAllVenta)
    app.route("/venta/:id").get(this.VentaController.getOneVenta)
    app.route("/venta").post(this.VentaController.createVenta)
    app.route("/venta/:id").put(this.VentaController.updateVenta)
    app.route("/venta/:id").delete(this.VentaController.deleteVenta)
    app.route("/venta/:id").patch(this.VentaController.hideVenta)
  }
}