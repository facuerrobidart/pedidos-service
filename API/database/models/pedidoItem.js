export default (sequelize, DataTypes) => {
    return sequelize.define('PedidoItem',{
        idPedidoItem:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPedido:{
            type: DataTypes.INTEGER,
            autoIncrement: false 
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cantidad:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}

//?No se si agregar tambien una descripción del producto o una imagen. Onda, por si les sirve a los del deposito o los repartidores.