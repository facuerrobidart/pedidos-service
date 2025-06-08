export default (sequelize, DataTypes) => {
    return sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: DataTypes.ENUM('deposito', 'repartidor'),
            allowNull: false
        },
    });
}