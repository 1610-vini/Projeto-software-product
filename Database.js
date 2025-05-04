const { Sequelize } = require('sequelize');

// Configuração do banco de dados PostgreSQL
const sequelize = new Sequelize('thays_laser', 'postgres', '2022', {
  host: 'localhost',
  dialect: 'postgres', // Certamente configurado para PostgreSQL
  logging: false,
});

module.exports = sequelize;
