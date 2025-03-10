document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Captura os dados do formulário
    const productType = document.getElementById('productType').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value);

    // Valida se todos os campos foram preenchidos
    if (!productType || !productPrice || !productQuantity) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    // Calcula o valor total do produto (preço * quantidade)
    const totalPrice = productPrice * productQuantity;

    // Formata o preço com o símbolo R$
    const formattedPrice = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Cria um item na lista de carrinho
    const cartItem = document.createElement('li');
    cartItem.textContent = `${productType.charAt(0).toUpperCase() + productType.slice(1)} - ${formattedPrice}`;

    // Adiciona o item no carrinho
    document.getElementById('cartItems').appendChild(cartItem);

    // Atualiza o total
    updateTotalPrice(totalPrice);

    // Limpa os campos do formulário
    document.getElementById('productForm').reset();
});

// Função para atualizar o total do carrinho
function updateTotalPrice(price) {
    const currentTotal = parseFloat(document.getElementById('totalPrice').textContent.replace('R$', '').replace(',', '.'));
    const newTotal = currentTotal + price;
    document.getElementById('totalPrice').textContent = newTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
