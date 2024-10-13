import {  Request, Response } from 'express';
import { where } from 'sequelize/types';
import { NextFunction } from 'express';
import { TipoProducto, TipoProductoI } from '../models/TipoProducto';


export class TipoProductoController {

  public async test(req: Request, res: Response) {
    try {
      res.send('hola, método test para TipoProducto');
    } catch (error) {
      // maneja el error
    }
  }

  public async getAllTipoProducto(req: Request, res: Response) {
    try {
        // Filtrar Tipos de productos ocultos
        const tipoProductos: TipoProductoI[] = await TipoProducto.findAll({
            where: { isHidden: false } // Asegúrate de incluir este filtro
        });

        res.status(200).json({ TipoProducto: tipoProductos });
    } catch (error) {
        console.error('Error al obtener todos los tipos de productos:', error);
        res.status(500).json({ msg: "Error al obtener tipos de productos" });
    }
}


public async getOneTipoProducto(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id: idParam } = req.params;

  try {
      const tipoProducto: TipoProductoI | null = await TipoProducto.findOne({
          where: { 
              id: idParam,
              isHidden: false // Asegúrate de incluir este filtro
          }
      });

      if (tipoProducto) {
          res.status(200).json(tipoProducto);
      } else {
          res.status(300).json({ msg: "El Tipo de Producto no existe o está oculto" }); // Cambia a 404 para mejor semántica
      }
  } catch (error) {
      console.error('Error al obtener el tipo de producto:', error);
      res.status(500).json({ msg: "Error Internal" });
  }
  next(); // Llamar a la siguiente función de middleware, aunque podrías omitirlo si no tienes más middleware en esta ruta
}

  public async createTipoProducto(req: Request, res: Response) {
    const { nombre } = req.body;

    try {
      let body: TipoProductoI = {
        nombre
      };

      const tipoProducto: TipoProductoI = await TipoProducto.create({ ...body });
      res.status(200).json({ tipoProducto });
    } catch (error) {
      // maneja el error
    }
  }

  public async updateTipoProducto(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;
    const { nombre } = req.body;

    try {
      let body: TipoProductoI = {
        nombre
      };

      const tipoProductoExist: TipoProductoI | null = await TipoProducto.findByPk(pk);
      if (!tipoProductoExist) {
        res.status(404).json({ msg: "El Tipo de Producto No existe" });
        return;
      }

      await TipoProducto.update(
        body,
        {
          where: { id: pk }
        }
      );

      const tipoProducto: TipoProductoI | null = await TipoProducto.findByPk(pk);
      if (tipoProducto) {
        res.status(200).json({ tipoProducto });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error interno" });
    }
  }

  public async deleteTipoProducto(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;

    try {
      const tipoProductoExist: TipoProductoI | null = await TipoProducto.findByPk(pk);
      if (!tipoProductoExist) {
        res.status(404).json({ msg: "El Tipo de Producto No existe" });
        return;
      }

      await TipoProducto.destroy({
        where: { id: pk }
      });
      res.status(200).json({ msg: "Tipo de Producto Eliminado" });
    } catch (error) {
      // maneja el error
    } finally {
      return Promise.resolve();
    }
  }

  async hideTipoProducto(req: Request, res: Response): Promise<void> {
    const tipoProductoId = req.params.id;
    console.log(`Ejecutando hideTipoProducto para el ID: ${tipoProductoId}`);
  
    try {
      const tipoProducto = await TipoProducto.findByPk(tipoProductoId);
  
      if (!tipoProducto) {
        res.status(404).json({ message: 'Tipo de Producto no encontrado' });
      } else {
        // Actualizar el tipo de producto ocultándolo (cambio lógico)
        await tipoProducto.update({ isHidden: true });
        res.json({
          message: 'Tipo de Producto ocultado correctamente',
          tipoProducto: tipoProducto
        });
      }
    } catch (error: any) {
        console.error('Error en hideTipoProducto:', error);
        res.status(500).json({
          message: 'Error al ocultar el tipo de producto',
          error: error.message
        });
      }
}

}