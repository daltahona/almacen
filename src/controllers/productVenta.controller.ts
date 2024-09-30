import { Request, Response } from 'express';
import { ProductVenta, ProductVentaI } from '../models/ProductVenta';
import { Producto, ProductoI } from '../models/Producto';
import { Venta, VentaI } from '../models/Venta';

export class ProductVentaController {
  public async test(req: Request, res: Response): Promise<void> {
    try {
      res.send('hola, método test para ProductVenta');
    } catch (error) {
      res.status(500).send({ error: 'Error en el método test de ProductVenta' });
    }
  }

  public async getOneProductVenta(req: Request, res: Response): Promise<void> {
    const { id: idParam } = req.params;

    try {
      const productVenta: ProductVentaI | null = await ProductVenta.findOne({
        where: {
          id: idParam,
        },
      });

      if (productVenta) {
        res.status(200).json(productVenta);
      } else {
        res.status(404).json({ msg: "La relación producto-venta no existe" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error interno del servidor" });
    }
  }

  public async getAllProductVenta(req: Request, res: Response): Promise<void> {
    try {
      const productVentas: ProductVentaI[] = await ProductVenta.findAll();
      res.status(200).json({ productVentas });
    } catch (error) {
      res.status(500).send({ error: 'Error al obtener las relaciones producto-venta' });
    }
  }

  public async createProductVenta(req: Request, res: Response): Promise<void> {
    const { producto_id, venta_id, cantidad, precio, total } = req.body;
    try {
      const productVenta: ProductVentaI = await ProductVenta.create({
        producto_id,
        venta_id,
        cantidad,
        precio,
        total,
      });
      res.status(201).json({ productVenta });
    } catch (error) {
      res.status(500).send({ error: 'Error al crear la relación producto-venta' });
    }
  }

  public async updateProductVenta(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;
    const { producto_id, venta_id, cantidad, precio, total } = req.body;

    try {
      const productVentaExist: ProductVentaI | null = await ProductVenta.findByPk(pk);
      if (!productVentaExist) {
        res.status(500).json({ msg: "La relación producto-venta no existe" });
      }

      await ProductVenta.update(
        { producto_id, venta_id, cantidad, precio, total },
        { where: { id: pk } }
      );

      const updatedProductVenta: ProductVentaI | null = await ProductVenta.findByPk(pk);
      if (updatedProductVenta) {
        res.status(200).json({ productVenta: updatedProductVenta });
      } else {
        res.status(500).json({ msg: "Error al actualizar la relación producto-venta" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error Internal" });
    }
  }

  public async deleteProductVenta(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;
    try {
      const productVentaExist: ProductVentaI | null = await ProductVenta.findByPk(pk);
      if (!productVentaExist) {
        res.status(500).json({ msg: "La relación producto-venta no existe" });
      }

      await ProductVenta.destroy({ where: { id: pk } });
      res.status(200).json({ msg: "Relación producto-venta eliminada" });
    } catch (error) {
      res.status(500).json({ msg: "Error Internal" });
    }
  }
}