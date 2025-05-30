import { promises as fs } from 'fs';
import path from 'path';
import Pool from 'pg';
import { Op } from Sequelize;
import db from '../database/db.js';

const {Pedido, ItemPedido} = db;

const getAllPedidosDeposito = async () => {
    try{

    }catch (error) {
        console.error("Error al obtener pedidos del depósito:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}