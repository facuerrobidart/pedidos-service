import repositoryMethods from '../repositories/pedidosRepository.js';
import pedidoDepositoDTO from '../DTOs/pedidoDepositoDTO.js';
import pedidoDeliveryDTO from '../DTOs/pedidoDeliveryDTO.js';

export const getAllPedidosDeposito = async () => {
    try {
        const pedidos = await repositoryMethods.getAllPedidos('Confirmado');
        console.log(pedidos)
        return pedidos.map(pedido => new pedidoDepositoDTO(pedido));
    } catch (error) {
        console.error("Error al obtener pedidos del depósito:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export default {
    getAllPedidosDeposito,
    // Aquí puedes agregar más métodos según sea necesario
};