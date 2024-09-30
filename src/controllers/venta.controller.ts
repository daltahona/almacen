import { Request, Response } from 'express';
import { Venta, VentaI } from '../models/Venta';
import { Cliente, ClienteI } from '../models/Cliente';

export class VentaController {
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('hola, método test para Venta');
        } catch (error) {
            res.status(500).send({ error: 'Error en el método test de Venta' });
        }
    }

    public async getOneVenta(req: Request, res: Response): Promise<void> {
        const { id: idParam } = req.params;

        try {
            const venta: VentaI | null = await Venta.findOne({
                where: {
                    id: idParam,
                },
            });

            if (venta) {
                res.status(200).json(venta);
            } else {
                res.status(404).json({ msg: "La venta no existe" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error interno del servidor" });
        }
    }

    public async getAllVenta(req: Request, res: Response): Promise<void> {
        try {
            const ventas: VentaI[] = await Venta.findAll(); // Sin condición
            res.status(200).json({ ventas });
        } catch (error) {
            res.status(500).send({ error: 'Error al obtener las ventas' });
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

    public async hideVenta(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        try {
            const ventaExist: VentaI | null = await Venta.findOne({
                where: { id: pk, estado: true }
            });

            if (!ventaExist) {
                res.status(404).json({ msg: "La venta no existe o ya está inactiva" });
            }

            await Venta.update({ estado: false }, { where: { id: pk } });
            res.status(200).json({ msg: "Venta desactivada" });
        } catch (error) {
            console.error('Error al desactivar la venta:', error);
            res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
}