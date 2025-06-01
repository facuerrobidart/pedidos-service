class PedidoDeliveryDTO{
    constructor({id, estado, timestamp, cliente, items}){
        this.id = id ? id: null;
        this.items = Array.isArray(items) ? items.map((item) => ({
            id: Number(item.id),
            nombre: String(item.nombre), 
            cantidad: item.PedidoItem ? Number(item.PedidoItem.cantidad) : Number(item.cantidad),
        })) : [];
        this.cliente = {
            nombre: cliente.name,
            direccion: String(cliente.direccion), 
            ciudad: String(cliente.ciudad), 
            telefono: String(cliente.telefono)
        };
        this.estado = String(estado); 
        this.timestamp = timestamp;
    }
}
export default PedidoDeliveryDTO;