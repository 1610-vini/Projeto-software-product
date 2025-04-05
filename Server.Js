const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const sequelize = require('./database');
const { Cliente, Pacote, Servico } = require('./models');

const app = express();
const PORT = 3004; 

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sincronizar o banco de dados
sequelize.sync({ force: true }).then(() => { // Recria as tabelas no PostgreSQL
  console.log('Banco de dados sincronizado e tabelas recriadas!');
  // Inserir um cliente
  Cliente.create({
    nome: 'João Silva',
    idade: 30,
    cpf: '123.456.789-00',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    createdAt: new Date(),
    updatedAt: new Date(),
  }).then(() => {
    console.log('Cliente inserido com sucesso!');
  });
});

// Rotas para clientes
app.get('/clientes', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

app.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json({
      message: 'Cliente criado com sucesso',
      cliente: {
        id: cliente.id,
        nome: cliente.nome,
        idade: cliente.idade,
        cpf: cliente.cpf,
        email: cliente.email,
        telefone: cliente.telefone,
        createdAt: cliente.createdAt, // Inclui o campo createdAt
        updatedAt: cliente.updatedAt, // Inclui o campo updatedAt
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    await cliente.update(req.body);
    res.json({ message: 'Cliente atualizado com sucesso', cliente });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    await cliente.destroy();
    res.json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint para cadastro de clientes
app.post('/auth/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o email já está em uso
    const clienteExistente = await Cliente.findOne({ where: { email } });
    if (clienteExistente) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    // Criptografar a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar o cliente
    const cliente = await Cliente.create({ nome, email, senha: senhaHash });
    res.status(201).json({ message: 'Cliente cadastrado com sucesso', cliente });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
});

// Endpoint para login de clientes
app.post('/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o cliente existe
    const cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Retornar uma mensagem de sucesso (simulação de token)
    res.status(200).json({ message: 'Login realizado com sucesso', clienteId: cliente.id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

// Rotas para pacotes
app.get('/pacotes', async (req, res) => {
  const pacotes = await Pacote.findAll();
  res.json(pacotes);
});

app.post('/pacotes', async (req, res) => {
  try {
    const pacote = await Pacote.create(req.body);
    res.status(201).json({ message: 'Pacote criado com sucesso', pacote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/pacotes/:id', async (req, res) => {
  try {
    const pacote = await Pacote.findByPk(req.params.id);
    if (!pacote) {
      return res.status(404).json({ error: 'Pacote não encontrado' });
    }
    await pacote.update(req.body);
    res.json({ message: 'Pacote atualizado com sucesso', pacote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/pacotes/:id', async (req, res) => {
  try {
    const pacote = await Pacote.findByPk(req.params.id);
    if (!pacote) {
      return res.status(404).json({ error: 'Pacote não encontrado' });
    }
    await pacote.destroy();
    res.json({ message: 'Pacote removido com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas para serviços
app.get('/servicos', async (req, res) => {
  const servicos = await Servico.findAll();
  res.json(servicos);
});

app.post('/servicos', async (req, res) => {
  try {
    const servico = await Servico.create(req.body);
    res.status(201).json({ message: 'Serviço criado com sucesso', servico });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/servicos/:id', async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    await servico.update(req.body);
    res.json({ message: 'Serviço atualizado com sucesso', servico });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/servicos/:id', async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    await servico.destroy();
    res.json({ message: 'Serviço removido com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para carrinho
app.post('/carrinho', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3004/carrinho', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao processar o carrinho:', error);
    res.status(500).json({ error: 'Erro ao processar o carrinho' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
