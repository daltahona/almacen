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

    public async getAllCliente(req: Request, res:Response){
        try {
            // const cliente: ClienteI[] = await Cliente.findAll(
            //     {
            //         where: {activo: true}
            //     }
            const cliente: ClienteI[] = await Cliente.findAll() // select * from clientes;
            res.status(200).json({cliente})
        } catch (error) {

        }
    }


public async getOneCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: idParam } = req.params

    try {
        const cliente: ClienteI | null = await Cliente.findOne(
            {
                where: { 
                    id: idParam,
                }
            }
        )
        if (cliente){
            res.status(200).json(cliente)
        } else {
            res.status(300).json({msg: "El Cliente no existe"})
        }
    } catch (error) {
        res.status(500).json({msg: "Error Internal"})
    }
    next() // Llamar a la siguiente función de middleware
}

public async createCliente(req: Request, res:Response){
    const {
        nombreCliente,
        direccionCliente,
        telefonoCliente,
        correoCliente,
        passwordCliente
    } = req.body;

    try {
        let body:ClienteI = {
            nombreCliente,
            direccionCliente,
            telefonoCliente,
            correoCliente,
            passwordCliente
        } 

        const cliente:ClienteI = await Cliente.create({...body});
        res.status(200).json({cliente});

    } catch (error) {

    }

}

public async updateCliente(req: Request, res: Response): Promise<void> {
    const { id: pk } = req.params;

    const {
        id,
        nombreCliente,
        direccionCliente,
        telefonoCliente,
        correoCliente,
        passwordCliente
    } = req.body;

    try {
        let body: ClienteI = {
            nombreCliente,
            direccionCliente,
            telefonoCliente,
            correoCliente,
            passwordCliente
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



}
