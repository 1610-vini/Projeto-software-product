document.addEventListener('DOMContentLoaded', () => {
    console.log('Site carregado!');
  
    // Verificar se as imagens carregaram corretamente
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('error', () => {
        console.error(`Erro ao carregar a imagem: ${img.src}`);
      });
    });
  
    window.agendar = function () {
      alert('Consulta agendada! Entraremos em contato em breve.');
    };
  
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Mensagem enviada com sucesso! Retornaremos em breve.');
        contactForm.reset();
      });
    }
  
    // Função para rolar até a seção correspondente
    window.scrollToSection = function (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    // Carrinho de compras
    const carrinho = {
      itens: [],
      total: 0,
      adicionarItem: function (nome, preco) {
        this.itens.push({ nome, preco });
        this.calcularTotal();
        this.atualizarCarrinho();
      },
      removerItem: function (index) {
        this.itens.splice(index, 1);
        this.calcularTotal();
        this.atualizarCarrinho();
      },
      calcularTotal: function () {
        this.total = this.itens.reduce((acc, item) => acc + item.preco, 0);
      },
      atualizarCarrinho: function () {
        const carrinhoContainer = document.getElementById('carrinho');
        carrinhoContainer.innerHTML = '<h2>Carrinho</h2>'; // Mantém o título fixo
  
        if (this.itens.length === 0) {
          carrinhoContainer.innerHTML += '<p>O carrinho está vazio.</p>';
          return;
        }
  
        const lista = document.createElement('ol'); // Lista ordenada para numeração
        lista.classList.add('carrinho-lista');
        this.itens.forEach((item, index) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <span class="carrinho-item-numero">${index + 1}.</span> 
            <span class="carrinho-item-nome">${item.nome}</span> 
            <span class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</span>
            <button class="btn-remover" onclick="removerItemCarrinho(${index})">
                🗑️
            </button>`;
          lista.appendChild(li);
        });
  
        const total = document.createElement('p');
        total.classList.add('carrinho-total');
        total.textContent = `Total: R$ ${this.total.toFixed(2)}`;
  
        carrinhoContainer.appendChild(lista);
        carrinhoContainer.appendChild(total);
      },
    };
  
    // Função para comprar um pacote
    window.comprarPacote = async function (area, precoParcela, parcelas) {
      const precoTotal =
        parseFloat(precoParcela.replace('R$', '').replace(',', '.')) * parcelas;
  
      // Atualizar o carrinho localmente
      carrinho.adicionarItem(area, precoTotal);
  
      try {
        const response = await fetch('http://localhost:3004/carrinho', { // Porta ajustada para 3004
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: area, preco: precoTotal }),
        });
        const data = await response.json();
        alert(data.message);
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    };
  
    // Função para remover um item do carrinho
    window.removerItemCarrinho = function (index) { // Adicionado ao escopo global
      carrinho.removerItem(index);
      alert('Item removido do carrinho.');
    };
  
    // Função para remover caracteres não numéricos de uma string
    const formatarParaNumeros = valor => valor.replace(/\D/g, '');
  
    // Lógica para o formulário de cadastro
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
      formCadastro.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const cpf = formatarParaNumeros(document.getElementById('cpf').value); // CPF no formato padrão
        const telefone = formatarParaNumeros(document.getElementById('numero').value); // Telefone no formato universal
  
        console.log('Enviando dados para cadastro:', { nome, email, senha, cpf, telefone }); // Log para depuração
  
        try {
          const response = await fetch('http://localhost:3004/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, cpf, telefone }),
          });
  
          const data = await response.json();
          console.log('Resposta do backend (cadastro):', data); // Log para depuração
  
          if (response.ok) {
            alert(data.message || 'Cadastro realizado com sucesso! Retornaremos em breve.');
            formCadastro.reset();
            fecharModal('modal-cadastro');
          } else {
            alert(data.error || 'Erro ao cadastrar cliente');
          }
        } catch (error) {
          console.error('Erro ao cadastrar cliente:', error);
          alert('Erro ao cadastrar cliente');
        }
      });
    }
  
    // Lógica para o formulário de agendamento
    const formAgendar = document.getElementById('form-agendar');
    if (formAgendar) {
      formAgendar.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const cpf = formatarParaNumeros(document.getElementById('cpf-agendar').value); // CPF no formato padrão
        const telefone = formatarParaNumeros(document.getElementById('telefone-agendar').value); // Telefone no formato universal
  
        console.log('Enviando dados para agendamento:', { cpf, telefone }); // Log para depuração
  
        try {
          const response = await fetch('http://localhost:3004/consultas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf, telefone }),
          });
  
          const data = await response.json();
          console.log('Resposta do backend (agendamento):', data); // Log para depuração
  
          if (response.ok) {
            alert(data.message || 'Agendamento realizado com sucesso! Retornaremos em breve.');
            formAgendar.reset();
            fecharModal('modal-agendar');
          } else {
            alert(data.error || 'Erro ao agendar consulta');
          }
        } catch (error) {
          console.error('Erro ao agendar consulta:', error);
          alert('Erro ao agendar consulta');
        }
      });
    }
  
    // Função para abrir o modal
    window.abrirModal = function (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('modal-open'); // Impede o scroll do fundo
      }
    };
  
    // Função para fechar o modal
    window.fecharModal = function (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open'); // Permite o scroll do fundo
      }
    };
  });
