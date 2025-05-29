'use strict';

module.exports = {
 up:async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedidos', {
      idPedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
      },
      nombreCliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direccionEntrega: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ciudad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefonoCliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.ENUM('Confirmado', 'Listo para enviar', 'Entregado', 'Entrega cancelada'),
        defaultValue: 'Confirmado',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('PedidoItems', {
      idPedidoItem: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idPedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pedidos',
          key: 'idPedido'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async  (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PedidoItems');
    await queryInterface.dropTable('Pedidos');
  }
};
