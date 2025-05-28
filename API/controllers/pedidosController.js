

//Metodos relacionados al deposito

export const getAllPedidosDeposito = async (req, res) => {
    try{

    }catch (error) {
        console.error("Error al obtener pedidos del depósito:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const getPedidoById = async (req, res) => {
    try{

    }catch (error) {
        console.error("Error al obtener el pedido por ID:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

// Metodos relacionados al delivery

export const getAllPedidosDelivery = async (req, res) => {
    try{

    }catch (error) {
        console.error("Error al obtener pedidos de delivery:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const postPedido = async (req, res) => {
    try{

    }catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

//Metodos comunes a ambos

export const patchEstadoPedido = async (req, res) => {
    try{

    }catch (error) {
        console.error("Error al modificar el estado del pedido:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default {
    getAllPedidosDeposito,
    getPedidoById,
    getAllPedidosDelivery,
    postPedido,
    patchEstadoPedido

};
