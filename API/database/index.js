import { Sequelize, DataTypes } from '@sequelize/core';
import process from 'process';
const env = process.env.NODE_ENV || 'development';
import config from '../config/config.cjs';
const db = {};
const envConfig = config[env]

import PedidoModel from './models/pedido.js';
import PedidoItemModel from './models/pedidoItem.js';
import UsuariosModel from './models/usuarios.js';


const sequelize = new Sequelize({
  database: envConfig.database, 
  user: envConfig.username, 
  password: envConfig.password,
  host: envConfig.host,
  port: envConfig.port,
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
const Usuario = UsuariosModel(sequelize, DataTypes);

Pedido.hasMany(PedidoItem, {
  foreignKey: 'idPedido',
  as: 'items'
});

PedidoItem.belongsTo(Pedido, {
  foreignKey: 'idPedido',
  as: 'pedido'
});

Usuario.hasMany(Pedido, {
  foreignKey: 'repartidorAsignado',
  as: 'pedidos'
});

Pedido.belongsTo(Usuario, {
  foreignKey: 'repartidorAsignado',
  as: 'usuario',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Pedido = Pedido;
db.PedidoItem = PedidoItem;
db.Usuario = Usuario;

export default db;