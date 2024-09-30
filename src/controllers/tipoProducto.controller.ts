import { Request, Response, NextFunction } from 'express';
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
      const tipoProductos: TipoProductoI[] = await TipoProducto.findAll();
      res.status(200).json({ tipoProductos });
    } catch (error) {
      // maneja el error
    }
  }

  public async getOneTipoProducto(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: idParam } = req.params;

    try {
      const tipoProducto: TipoProductoI | null = await TipoProducto.findByPk(idParam);
      if (tipoProducto) {
        res.status(200).json(tipoProducto);
      } else {
        res.status(404).json({ msg: "El Tipo de Producto no existe" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error interno" });
    }
    next();
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
}