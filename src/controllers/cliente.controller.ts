import {  Request, Response } from 'express';
import { where } from 'sequelize/types';
import { NextFunction } from 'express';
import { Cliente, ClienteI } from '../models/Cliente';

export class ClienteController {


    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para Cliente')
        } catch (error) {

        }
    }

    public async getAllCliente(req: Request, res: Response) {
        try {
            // Filtrar clientes ocultos
            const clientes: ClienteI[] = await Cliente.findAll({
                where: { isHidden: false } // Asegúrate de incluir este filtro
            });
    
            res.status(200).json({ cliente: clientes });
        } catch (error) {
            console.error('Error al obtener todos los clientes:', error);
            res.status(500).json({ msg: "Error al obtener clientes" });
        }
    }
    


    public async getOneCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id: idParam } = req.params;
    
        try {
            const cliente: ClienteI | null = await Cliente.findOne({
                where: { 
                    id: idParam,
                    isHidden: false // Asegúrate de incluir este filtro
                }
            });
    
            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(300).json({ msg: "El Cliente no existe o está oculto" }); // Cambia a 404 para mejor semántica
            }
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            res.status(500).json({ msg: "Error Internal" });
        }
        next(); // Llamar a la siguiente función de middleware, aunque podrías omitirlo si no tienes más middleware en esta ruta
    }
    

public async createCliente(req: Request, res:Response){
    const {
        nombre,
        direccion,
        telefono,
        correo,
        password
    } = req.body;

    try {
        let body:ClienteI = {
            nombre,
            direccion,
            telefono,
            correo,
            password
        } 

        const cliente:ClienteI = await Cliente.create({...body});
        res.status(200).json({cliente});

    } catch (error) {

    }

}

public async updateCliente(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;

    const {
        nombre,
        direccion,
        telefono,
        correo,
        password
    } = req.body;

    try {
        let body: ClienteI = {
            nombre,
            direccion,
            telefono,
            correo,
            password
        };

        const clienteExist: ClienteI | null = await Cliente.findByPk(pk);
        if (!clienteExist) {
            res.status(404).json({ msg: "El Cliente No existe" });
            return;
        }

        await Cliente.update(
            body,
            {
                where: { id: pk }
            }
        );

        const cliente: ClienteI | null = await Cliente.findByPk(pk);
        if (cliente) {
            res.status(200).json({ cliente });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error interno" });
    }
}

public async deleteCliente(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;

    try {
        const clienteExist: ClienteI | null = await Cliente.findByPk(pk);
        console.log(clienteExist); // agrega este console.log
        if (!clienteExist) {
            res.status(404).json({ msg: "El Cliente No existe" });
            return;
        }
        await Cliente.destroy({
            where: { id: pk }
        });
        res.status(200).json({ msg: "Cliente Eliminado" });
    } catch (error) {
        // maneja el error aquí
    } finally {
        return Promise.resolve(); // devuelve un Promise<void>
    }
}

// Ocultar un cliente (eliminación avanzada)
async hideCliente(req: Request, res: Response): Promise<void> {
    const clienteId = req.params.id;
    console.log(`Ejecutando hideCliente para el ID: ${clienteId}`);
  
    try {
      const cliente = await Cliente.findByPk(clienteId);
  
      if (!cliente) {
        res.status(404).json({ message: 'Cliente no encontrado' });
      } else {
        // Actualizar el cliente ocultándolo (cambio lógico)
        await cliente.update({ isHidden: true });
        res.json({
          message: 'Cliente ocultado correctamente',
          cliente: cliente
        });
      }
    } catch (error: any) {
        console.error('Error en hideCliente:', error);
        res.status(500).json({
          message: 'Error al ocultar el cliente',
          error: error.message
        });
      }
}
  

}
