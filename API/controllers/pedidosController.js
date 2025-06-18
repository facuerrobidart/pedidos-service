import serviceMethods from '../services/pedidosService.js'
import { validarIdRepartidor } from '../services/usersService.js';
import db from '../database/index.js';

//Metodos relacionados al deposito

export const getAllPedidosDeposito = async (req, res) => {
    try{
        const pedidos = await serviceMethods.getAllPedidos('confirmado');
        if (!pedidos || pedidos.length === 0) {  //todo: debería probarlo despues xd
            return res.status(404).json({ message: "No se encontraron pedidos en el depósito" });
        }
        res.json(pedidos);
    }catch (error) {
        console.error("Error al obtener pedidos del depósito:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

// Metodos relacionados al delivery

export const getAllPedidosDelivery = async (req, res) => {
    try{
        //const deliveryId = req.query.id; 
        const pedidos = await serviceMethods.getAllPedidos('listo para enviar');
        //const pedidosDelivery = await serviceMethods.getAllPedidos('En camino'); 
        //pedidosDelivery.filter(pedido => pedido.repartidorAsignado === deliveryId); // Filtrar pedidos asignados al repartidor
        //const pedidos = [...pedidosListos, ...pedidosDelivery]; // Combinar ambos arrays
        res.json(pedidos);
    }catch (error) {
        console.error("Error al obtener pedidos de delivery:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const asignarPedido = async (req, res) => {
    try{
        const { id } = req.params;
        const { repartidorId } = req.body; 
    
        validarIdRepartidor(repartidorId); //En caso de que el id no sea valido, lanza error, asi que no es necesario validar el resultado

        const pedido = await serviceMethods.asignarPedido(id, repartidorId);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json(pedido);

    }catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

//Metodos comunes a ambos

export const getPedidoById = async (req, res) => { //!grego, te cambio esto, ahora trae pedidos por id de repartidor, no toques nada pq me mato
    try{
        const { id } = req.params; // ID del pedido
        const pedidosListos = await serviceMethods.getAllPedidos('listo para enviar') || [];
        let pedidosDelivery = await serviceMethods.getAllPedidos('en camino') || []; 
        pedidosDelivery = pedidosDelivery.filter(pedido => pedido.repartidorAsignado == id); // Filtrar pedidos asignados al repartidor
        const pedidos = [...pedidosListos, ...pedidosDelivery]; // Combinar ambos arrays
        res.json(pedidos);

    }catch (error) {
        console.error("Error al obtener el pedido por ID:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const patchEstadoPedido = async (req, res) => {
    try{
        const { id } = req.params;
        const { estado, usuarioId } = req.body;
        const deliveryId = usuarioId //para menos cambios despues
        const pedido = await serviceMethods.patchEstadoPedido(id, estado);
        if (estado === 'en camino' && deliveryId) { 
            await serviceMethods.asignarPedido(id, deliveryId)
        } 
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json(pedido); //?Podría devolver simplemente un mensaje

    }catch (error) {
        console.error("Error al modificar el estado del pedido:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const getPedidosByRepartidor = async (req, res) => {
    try{
        const { id } = req.params;
        const pedidos = await serviceMethods.getPedidosByRepartidor(id);
        if (!pedidos || pedidos.length === 0) {
            return res.status(404).json({ message: "No se encontraron pedidos para el repartidor" });
        }
        res.json(pedidos);

    }catch (error) {
        console.error("Error al obtener pedidos por repartidor:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const createPedido = async (req, res) => {
    try {
        const { nombreCliente, direccionEntrega, ciudad, telefonoCliente } = req.body;
        
        // Validate required fields
        if (!nombreCliente || !direccionEntrega || !ciudad || !telefonoCliente) {
            console.log("faltan campos");
            return res.status(400).json({ 
                message: "Faltan campos requeridos",
                required: ['nombreCliente', 'direccionEntrega', 'ciudad', 'telefonoCliente']
            });
        }

        // Get max ID and increment it
        const maxIdResult = await db.Pedido.max('id');
        const id = (maxIdResult || 0) + 1;

        const pedido = await serviceMethods.createPedido({
            id,
            nombreCliente,
            direccionEntrega,
            ciudad,
            telefonoCliente,
            estado: 'Confirmado',
            repartidorAsignado: null
        });

        res.status(201).json(pedido);
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default {
    getAllPedidosDeposito,
    getPedidoById,
    getAllPedidosDelivery,
    asignarPedido,
    patchEstadoPedido,
    getPedidosByRepartidor,
    createPedido
};
