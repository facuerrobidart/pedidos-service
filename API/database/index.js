import { Sequelize, DataTypes } from '@sequelize/core';
import process from 'process';
const env = process.env.NODE_ENV || 'development';
import config from '../config/config.cjs';
const db = {};
const envConfig = config[env]


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

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//db.pedido = Modelo del pedido aun no definido

export default db;