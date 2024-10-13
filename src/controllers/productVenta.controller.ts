import { Request, Response } from 'express';
import { ProductVenta, ProductVentaI } from '../models/ProductVenta';
import { Producto, ProductoI } from '../models/Producto';
import { Venta, VentaI } from '../models/Venta';
import { NextFunction } from 'express';

export class ProductVentaController {
  public async test(req: Request, res: Response): Promise<void> {
    try {
      res.send('hola, método test para ProductVenta');
    } catch (error) {
      res.status(500).send({ error: 'Error en el método test de ProductVenta' });
    }
  }

  public async getOneProductVenta(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: idParam } = req.params;
  
    try {
        const productVenta: ProductVentaI | null = await ProductVenta.findOne({
            where: { 
                id: idParam,
                isHidden: false // Asegúrate de incluir este filtro
            }
        });
  
        if (productVenta) {
            res.status(200).json(productVenta);
        } else {
            res.status(300).json({ msg: "El Producto de Venta no existe o está oculto" }); // Cambia a 404 para mejor semántica
        }
    } catch (error) {
        console.error('Error al obtener el producto de venta:', error);
        res.status(500).json({ msg: "Error Internal" });
    }
    next(); // Llamar a la siguiente función de middleware, aunque podrías omitirlo si no tienes más middleware en esta ruta
  }

  public async getAllProductVenta(req: Request, res: Response) {
    try {
        // Filtrar Productos de ventas ocultos
        const productVentas: ProductVentaI[] = await ProductVenta.findAll({
            where: { isHidden: false } // Asegúrate de incluir este filtro
        });

        res.status(200).json({ ProductVenta: productVentas });
    } catch (error) {
        console.error('Error al obtener todos los productos de ventas:', error);
        res.status(500).json({ msg: "Error al obtener los productos de ventas" });
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

  async hideProductVenta(req: Request, res: Response): Promise<void> {
    const productVentaId = req.params.id;
    console.log(`Ejecutando hideProductVenta para el ID: ${productVentaId}`);
  
    try {
      const productVenta = await ProductVenta.findByPk(productVentaId);
  
      if (!productVenta) {
        res.status(404).json({ message: 'Producto de Venta no encontrado' });
      } else {
        // Actualizar el producto de venta ocultándolo (cambio lógico)
        await productVenta.update({ isHidden: true });
        res.json({
          message: 'Producto de Venta ocultado correctamente',
          productVenta: productVenta
        });
      }
    } catch (error: any) {
        console.error('Error en hideProductVenta:', error);
        res.status(500).json({
          message: 'Error al ocultar el Producto de Venta',
          error: error.message
        });
      }
}

}