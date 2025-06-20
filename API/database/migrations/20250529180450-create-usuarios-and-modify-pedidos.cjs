'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear tabla Usuarios
    await queryInterface.createTable('Usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rol: {
        type: Sequelize.ENUM('deposito', 'repartidor'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Agregar columna repartidorAsignado a Pedidos y definirla como FK
    await queryInterface.addColumn('Pedidos', 'repartidorAsignado', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET DEFAULT'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Pedidos', 'repartidorAsignado');
    await queryInterface.dropTable('Usuarios');
  }
};