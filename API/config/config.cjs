require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'localuser',
    password: process.env.DB_PASSWORD || 'localpass',
    database: process.env.DB_NAME || 'deposito_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5433',
    dialect: "postgres"
  },
  // You can add test/production environments similarly
};