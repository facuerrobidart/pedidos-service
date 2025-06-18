export default (sequelize, DataTypes) => {
    return sequelize.define('Pedido', {
        id: {     //?No sabría si deberiamos darle el id de VirtualPet o si simplemente le damos uno nuevo aca.
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    // Let the database generate IDs automatically
        },
        nombreCliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccionEntrega: {     //? Por el momento la junte toda en un string, no se si deberíamos dividirla en calle, numero, etc.
            type: DataTypes.STRING,
            allowNull: false
        },
        ciudad: {   //? Aca se podría tener Ciudad,Provincia, País.
            type: DataTypes.STRING,
            allowNull: false
        },
        telefonoCliente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado:{
            type:DataTypes.ENUM('confirmado','listo para enviar','entregado','cancelado', 'en camino'),
            defaultValue: 'Confirmado',
            allowNull: false
        },
        repartidorAsignado:{
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
}; 