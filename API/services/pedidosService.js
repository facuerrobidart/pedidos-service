import repositoryMethods from '../repositories/pedidosRepository.js';
import pedidoDepositoDTO from '../DTOs/pedidoDepositoDTO.js';
import pedidoDeliveryDTO from '../DTOs/pedidoDeliveryDTO.js';
import { rabbitMQService } from './rabbitmq.service.js';
import db from '../database/index.js'; // Import db for sequelize and models

export const getAllPedidos = async (estado) => {
    try {
        const pedidos = await repositoryMethods.getAllPedidos(estado);
        
        if(estado === 'confirmado') {
            return pedidos?.map(pedido => new pedidoDepositoDTO(pedido));   
        }
        return pedidos?.map(pedido => new pedidoDeliveryDTO(pedido));
    } catch (error) {
        console.error("Error al obtener pedidos del depósito:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export const getPedidoById = async (id) => {
    try {
        const pedido = await repositoryMethods.getPedido(id);
        if (!pedido) {
            return null;
        }
        if(pedido.estado === 'confirmado') {
            return new pedidoDepositoDTO(pedido);   
        }
        return new pedidoDeliveryDTO(pedido);
    } catch (error) {
        console.error("Error al obtener el pedido por ID:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export const patchEstadoPedido = async (id, estado) => {
    try {
        const pedido = await repositoryMethods.getPedido(id);
        if (!pedido) {
            return null;
        }
        pedido.estado = estado;
        await repositoryMethods.updatePedido(pedido);

        // Publish event to RabbitMQ
         const eventMessage = {
             pedidoId: id,
             nuevoEstado: estado,
             type: 'status_update',
             timestamp: new Date().toISOString()
         };
        rabbitMQService.publishMessage('deliveries-queue', eventMessage);

        return new pedidoDeliveryDTO(pedido); //Siendo que el estado base es "Confirmado", cualquier estado al que cambie ya es problema del delivery
        
    } catch (error) {
        console.error("Error al modificar el estado del pedido:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export const asignarPedido = async (id, repartidorId) => {
    try {
        const pedido = await repositoryMethods.getPedido(id);
        if (!pedido) {
            return null;
        }
        pedido.repartidorAsignado = repartidorId;
        await repositoryMethods.updatePedido(pedido);
        return new pedidoDeliveryDTO(pedido);
    } catch (error) {
        console.error("Error al asignar el pedido:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export const getPedidosByRepartidor = async (repartidorId) => {
    try {
        const pedidos = await repositoryMethods.getPedidosByRepartidor(repartidorId);
        return pedidos.map(pedido => new pedidoDeliveryDTO(pedido));
    } catch (error) {
        console.error("Error al obtener pedidos por repartidor:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export const createPedido = async (pedidoData) => {
    const { items, ...pedidoFields } = pedidoData;
    try {
        const pedido = await db.sequelize.transaction(async (transaction) => {
            // Create the pedido
            const pedido = await repositoryMethods.createPedido(pedidoFields, { transaction });
            // Create items if provided
            if (items && Array.isArray(items) && items.length > 0) {
                for (const item of items) {
                    await db.PedidoItem.create({
                        idPedido: pedido.id,
                        nombre: item.nombre,
                        cantidad: item.cantidad
                    }, { transaction });
                }
            }
            return pedido;
        });
        // Fetch pedido with items for DTO
        const pedidoWithItems = await repositoryMethods.getPedido(pedido.id);
        return new pedidoDepositoDTO(pedidoWithItems);
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export default {
    getAllPedidos,
    getPedidoById,
    patchEstadoPedido,
    asignarPedido,
    getPedidosByRepartidor,
    createPedido
};