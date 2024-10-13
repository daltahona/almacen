import { Request, Response } from 'express';
import { Venta, VentaI } from '../models/Venta';
import { NextFunction } from 'express';
import { Cliente, ClienteI } from '../models/Cliente';

export class VentaController {
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('hola, método test para Venta');
        } catch (error) {
            res.status(500).send({ error: 'Error en el método test de Venta' });
        }
    }

    public async getOneVenta(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id: idParam } = req.params;
    
        try {
            const venta: VentaI | null = await Venta.findOne({
                where: { 
                    id: idParam,
                    isHidden: false // Asegúrate de incluir este filtro
                }
            });
    
            if (venta) {
                res.status(200).json(venta);
            } else {
                res.status(300).json({ msg: "La venta no existe o está oculto" }); // Cambia a 404 para mejor semántica
            }
        } catch (error) {
            console.error('Error al obtener la venta:', error);
            res.status(500).json({ msg: "Error Internal" });
        }
        next(); // Llamar a la siguiente función de middleware, aunque podrías omitirlo si no tienes más middleware en esta ruta
    }

    public async getAllVenta(req: Request, res: Response) {
        try {
            // Filtrar ventas ocultas
            const ventas: Venta[] = await Venta.findAll({
                where: { isHidden: false } // Asegúrate de incluir este filtro
            });
    
            res.status(200).json({ venta: ventas });
        } catch (error) {
            console.error('Error al obtener todos las ventas:', error);
            res.status(500).json({ msg: "Error al obtener las ventas" });
        }
    }

    public async createVenta(req: Request, res: Response): Promise<void> {
        const { fechaVenta, subtotal, impuestos, descuentos, total, clientes_id } = req.body;
        try {
            const venta: VentaI = await Venta.create({ 
                fechaVenta, 
                subtotal, 
                impuestos, 
                descuentos, 
                total, 
                clientes_id 
            });
            res.status(201).json({ venta });
        } catch (error) {
            res.status(500).send({ error: 'Error al crear la venta' });
        }
    }

    public async updateVenta(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { fechaVenta, subtotal, impuestos, descuentos, total, clientes_id } = req.body;

        try {
            const ventaExist: VentaI | null = await Venta.findByPk(pk);
            if (!ventaExist) {
                res.status(500).json({ msg: "La venta no existe" });
            }

            await Venta.update(
                { fechaVenta, subtotal, impuestos, descuentos, total, clientes_id },
                { where: { id: pk } }
            );

            const updatedVenta: VentaI | null = await Venta.findByPk(pk);
            if (updatedVenta) {
                res.status(200).json({ venta: updatedVenta });
            } else {
                res.status(500).json({ msg: "Error al actualizar la venta" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error Internal" });
        }
    }

    public async deleteVenta(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        try {
            const ventaExist: VentaI | null = await Venta.findByPk(pk);
            if (!ventaExist) {
                res.status(500).json({ msg: "La venta no existe" });
            }

            await Venta.destroy({ where: { id: pk } });
            res.status(200).json({ msg: "Venta eliminada" });
        } catch (error) {
            res.status(500).json({ msg: "Error Internal" });
        }
    }

// Ocultar un cliente (eliminación avanzada)
async hideVenta(req: Request, res: Response): Promise<void> {
    const ventaId = req.params.id;
    console.log(`Ejecutando hideVenta para el ID: ${ventaId}`);
  
    try {
      const venta = await Venta.findByPk(ventaId);
  
      if (!venta) {
        res.status(404).json({ message: 'Venta no encontrado' });
      } else {
        // Actualizar el venta ocultándolo (cambio lógico)
        await venta.update({ isHidden: true });
        res.json({
          message: 'Venta ocultado correctamente',
          venta: venta
        });
      }
    } catch (error: any) {
        console.error('Error en hideVenta:', error);
        res.status(500).json({
          message: 'Error al ocultar la venta',
          error: error.message
        });
      }
}
}