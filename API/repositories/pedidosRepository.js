import { promises as fs } from 'fs';
import path from 'path';
import Pool from 'pg';
import { Op } from 'sequelize';
import db from '../database/index.js';

const {Pedido, PedidoItem} = db;

const getAllPedidos = async (estado) => {
    try{
        const pedidos = await Pedido.findAll({
                where: {estado},
                include: [{
                    model: PedidoItem,
                    as: 'items'
                }]
            });

        if(estado === 'Confirmado'){
            return pedidos.map(pedido => {
                return {
                    id: pedido.id,
                    estado: pedido.estado,
                    timestamp: pedido.createdAt,
                    items: pedido.items,
                };
            });
        }else if(estado === 'Listo para enviar'){
            return pedidos.map(pedido => {
                return {
                    id: pedido.id,
                    estado: pedido.estado,
                    timestamp: pedido.createdAt,
                    cliente: {
                        name: pedido.nombreCliente, 
                        direccion: pedido.direccionEntrega,
                        ciudad: pedido.ciudad,
                        telefono: pedido.telefonoCliente
                    },
                    items: pedido.items 
                };
            });
        }

    }catch (error) {
        console.error("Error al obtener pedidos del depósito:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

const getPedido = async (id) => {
    try{
        return await Pedido.findByPk(id, {
            include: [{
                model: PedidoItem,
                as: 'items'
            }]
        });
    }catch (error) {
        console.error("Error al obtener el pedido por ID:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export default {
    getAllPedidos,
    getPedido,
    // Aquí puedes agregar más métodos según sea necesario
};