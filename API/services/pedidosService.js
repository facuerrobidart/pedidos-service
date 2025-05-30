

export const getAllPedidosDeposito = async () => {
    try {

    } catch (error) {
        console.error("Error al obtener pedidos del depósito:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export default {
    getAllPedidosDeposito,
    // Aquí puedes agregar más métodos según sea necesario
};