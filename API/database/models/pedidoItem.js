export default (sequelize, DataTypes) => {
    return sequelize.define('PedidoItem',{
        id:{
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