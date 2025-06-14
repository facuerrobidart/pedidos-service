import db from '../database/index.js';

const {Pedido, PedidoItem} = db;


//todo: considerar simplificar logica del codigo, veo muchos ifs con su contenido repitiendose

const returnUnicoPedido = (pedido) => {
    if (!pedido) {
        return null;
    }

    if(pedido.estado === 'Confirmado'){
        return {
            id: pedido.id,
            estado: pedido.estado,
            timestamp: pedido.createdAt,
            items: pedido.items,
        };
    }else{
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
    }
}

export const getAllPedidos = async (estado) => {
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
        }else if(estado === 'Listo para enviar'){ //?Implico que con el resto de estados no se requiere un getAll, al menos que el delivery los requiera
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

export const getPedido = async (id) => {
    try{
        const pedido = await Pedido.findByPk(id, {
            include: [{
                model: PedidoItem,
                as: 'items'
            }]
        });

        return returnUnicoPedido(pedido);
    }catch (error) {
        console.error("Error al obtener el pedido por ID:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export const updatePedido = async (pedido) => {
    try {
        const updatedPedido = await Pedido.update(pedido, {
            where: { id: pedido.id }
        });
        
        return returnUnicoPedido(updatedPedido); //En este caso solo debería acceder al ultimo else del metodo
    } catch (error) {
        console.error("Error al actualizar el pedido:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export const getPedidosByRepartidor = async (repartidorId) => {
    try {
        const pedidos = await Pedido.findAll({
            where: { repartidorAsignado: repartidorId },
            include: [{
                model: PedidoItem,
                as: 'items'
            }]
        });

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
    } catch (error) {
        console.error("Error al obtener pedidos por repartidor:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export const createPedido = async (pedidoData) => {
    try {
        const pedido = await Pedido.create(pedidoData);
        return returnUnicoPedido(pedido);
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        throw new Error("Error interno del servidor: " + error.message);
    }
}

export default {
    getAllPedidos,
    getPedido,
    updatePedido,
    getPedidosByRepartidor,
    createPedido
    // Aquí puedes agregar más métodos según sea necesario
};