const { DataTypes } = require('sequelize');
const sequelize = require('./backend/database'); // Importa a instância configurada do Sequelize

// Modelo de Cliente
const Cliente = sequelize.define('Cliente', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING, allowNull: false },
});

// Modelo de Pacote
const Pacote = sequelize.define('Pacote', {
  nome: { type: DataTypes.STRING, allowNull: false },
  preco: { type: DataTypes.FLOAT, allowNull: false },
  parcelas: { type: DataTypes.INTEGER, allowNull: false },
});

// Modelo de Serviço
const Servico = sequelize.define('Servico', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = { Cliente, Pacote, Servico };
