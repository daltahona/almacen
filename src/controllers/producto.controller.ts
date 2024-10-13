import { Request, Response } from 'express';
import { Producto, ProductoI } from '../models/Producto';
import { TipoProducto } from '../models/TipoProducto';
import { NextFunction } from 'express';
import { where } from 'sequelize/types';

export class ProductoController {
  public async test(req: Request, res: Response): Promise<void> {
    try {
      res.send('hola, método test para Producto');
    } catch (error) {
      res.status(500).send({ error: 'Error en el método test de Producto' });
    }
  }

  public async getOneProducto(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: idParam } = req.params;

    try {
        const producto: ProductoI | null = await Producto.findOne({
            where: { 
                id: idParam,
                isHidden: false // Asegúrate de incluir este filtro
            }
        });

        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(300).json({ msg: "El Producto no existe o está oculto" }); // Cambia a 404 para mejor semántica
        }
    } catch (error) {
        console.error('Error al obtener el Producto:', error);
        res.status(500).json({ msg: "Error Internal" });
    }
    next(); // Llamar a la siguiente función de middleware, aunque podrías omitirlo si no tienes más middleware en esta ruta
}

  public async getAllProducto(req: Request, res: Response) {
    try {
        // Filtrar productos ocultos
        const productos: ProductoI[] = await Producto.findAll({
            where: { isHidden: false } // Asegúrate de incluir este filtro
        });

        res.status(200).json({ producto: productos });
    } catch (error) {
        console.error('Error al obtener todos los productos:', error);
        res.status(500).json({ msg: "Error al obtener los productos" });
    }
}

public async createProducto(req: Request, res:Response){
  const {
      nombre,
      marca,
      precio,
      stockMin,
      cantidad,
      TipoProducto_id
  } = req.body;

  try {
      let body:ProductoI = {
          nombre,
          marca,
          precio,
          stockMin,
          cantidad,
          TipoProducto_id

      } 

      const producto:ProductoI = await Producto.create({...body});
      res.status(200).json({producto});

  } catch (error) {

  }

}

  public async updateProducto(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;
    const { nombre, marca, precio, stockMin, cantidad, TipoProducto_id } = req.body;

    try {
      const productoExist: ProductoI | null = await Producto.findByPk(pk);
      if (!productoExist) {
        res.status(500).json({ msg: "El producto no existe" });
      }

      await Producto.update(
        { nombre, marca, precio, stockMin, cantidad, TipoProducto_id },
        { where: { id: pk } }
      );

      const updatedProducto: ProductoI | null = await Producto.findByPk(pk);
      if (updatedProducto) {
        res.status(200).json({ producto: updatedProducto });
      } else {
        res.status(500).json({ msg: "Error al actualizar el producto" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error Internal" });
    }
  }

  public async deleteProducto(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;
    try {
      const productoExist: ProductoI | null = await Producto.findByPk(pk);
      if (!productoExist) {
        res.status(500).json({ msg: "El producto no existe" });
      }

      await Producto.destroy({ where: { id: pk } });
      res.status(200).json({ msg: "Producto eliminado" });
    } catch (error) {
      res.status(500).json({ msg: "Error Internal" });
    }
  }

// Ocultar un producto (eliminación avanzada)
async hideProducto(req: Request, res: Response): Promise<void> {
  const productoId = req.params.id;
  console.log(`Ejecutando hideProducto para el ID: ${productoId}`);

  try {
    const producto = await Producto.findByPk(productoId);

    if (!producto) {
      res.status(404).json({ message: 'Producto no encontrado' });
    } else {
      // Actualizar el producto ocultándolo (cambio lógico)
      await producto.update({ isHidden: true });
      res.json({
        message: 'Producto ocultado correctamente',
        producto: producto
      });
    }
  } catch (error: any) {
      console.error('Error en hideProducto:', error);
      res.status(500).json({
        message: 'Error al ocultar el Producto',
        error: error.message
      });
    }
}
}