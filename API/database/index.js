import { Sequelize, DataTypes } from '@sequelize/core';
import process from 'process';
const env = process.env.NODE_ENV || 'development';
import config from '../config/config.cjs';
const db = {};
const envConfig = config[env]

import PedidoModel from './models/pedido.js';
import PedidoItemModel from './models/pedidoItem.js';


const sequelize = new Sequelize({
  database: config.development.database, 
  user: config.development.username, 
  password: config.development.password,
  host: config.development.host,
  dialect: "postgres",
  timezone: 'America/Argentina/Buenos_Aires',
  // dialectOptions: {
  //   useUTC: false, 
  // },
  logging: false,  // Disable SQL logging
});

/*
Aca debería ir toda la logica de la base de datos, como la creación de modelos, relaciones, etc relacionada a Pedidos.
*/

const Pedido = PedidoModel(sequelize, DataTypes);
const PedidoItem = PedidoItemModel(sequelize, DataTypes);

Pedido.hasMany(PedidoItem, {
  foreignKey: 'idPedido',
  as: 'items'
});

PedidoItem.belongsTo(Pedido, {
  foreignKey: 'idPedido',
  as: 'pedido'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Pedido = Pedido;
db.PedidoItem = PedidoItem;

export default db;