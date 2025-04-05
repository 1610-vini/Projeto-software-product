const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Modelo de Cliente
const Cliente = sequelize.define('Cliente', {
  nome: { type: DataTypes.STRING, allowNull: false },
  idade: { type: DataTypes.INTEGER, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true, 
    validate: { isEmail: true } // Validação de email adicionada
  },
  telefone: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: true, // Ativa createdAt e updatedAt
});

// Modelo de Pacote
const Pacote = sequelize.define('Pacote', {
  nome: { type: DataTypes.STRING, allowNull: false },
  preco: { type: DataTypes.FLOAT, allowNull: false },
  parcelas: { type: DataTypes.INTEGER, allowNull: false },
}, {
  timestamps: false, // Desativa createdAt e updatedAt
});

// Modelo de Serviço
const Servico = sequelize.define('Servico', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
}, {
  timestamps: false, // Desativa createdAt e updatedAt
});

module.exports = { Cliente, Pacote, Servico };
