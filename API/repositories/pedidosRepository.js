import { promises as fs } from 'fs';
import path from 'path';
import Pool from 'pg';
import { Op } from 'sequelize';
import db from '../database/index.js';

const {Pedido, PedidoItem} = db;

const getAllPedidos = async (estado) => {
    try{
        return await Pedido.findAll({
            where: {estado},
            include: [{
                model: PedidoItem,
                as: 'items'
            }]
        });
    }catch (error) {
        console.error("Error al obtener pedidos del depósito:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export default {
    getAllPedidos,
    // Aquí puedes agregar más métodos según sea necesario
};