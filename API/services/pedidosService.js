import repositoryMethods from '../repositories/pedidosRepository.js';
import pedidoDepositoDTO from '../DTOs/pedidoDepositoDTO.js';
import pedidoDeliveryDTO from '../DTOs/pedidoDeliveryDTO.js';

export const getAllPedidos = async (estado) => {
    try {
        const pedidos = await repositoryMethods.getAllPedidos(estado);
        return pedidos.map(pedido => new pedidoDepositoDTO(pedido));
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
        return new pedidoDepositoDTO(pedido);
    } catch (error) {
        console.error("Error al obtener el pedido por ID:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export default {
    getAllPedidos,
    getPedidoById,
    // Aquí puedes agregar más métodos según sea necesario
};