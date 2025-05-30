class PedidoDepositoDTO{
    constructor({id, estado, timestamp, items}) {
        this.id = id ? id: null;
        this.items = Array.isArray(items) ? items.map((item) => ({
            id: Number(item.id),
            nombre: String(item.nombre), 
            cantidad: item.PedidoItem ? Number(item.PedidoItem.cantidad) : Number(item.cantidad),
        })) : [];
        this.estado = String(estado); 
        this.timestamp = timestamp;
    }
}
export default PedidoDepositoDTO;