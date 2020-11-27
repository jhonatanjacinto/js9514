import { adicionarProduto } from './pedido.js';
import { exibirProdutosDoPedido } from './tabelaProdutosPedido.js';
import { formataMoeda } from './utils/formataMoeda.js';

const seletor_produto = document.querySelector('#seletor_produto');
const btnAdicionarProduto = document.querySelector('#btnAdicionarProduto');
const input_quantidade = document.querySelector('#input_quantidade');

const listaProdutos = [
    { id: 1, nome: 'Pizza de Calabresa', foto: 'pizza-calabresa.jpg', preco: 52.99 },
    { id: 2, nome: 'Pizza 4 Queijos', foto: 'pizza-4-queijos.jpg', preco: 65.82 },
    { id: 3, nome: 'Pizza de Frango Catupiry', foto: 'pizza-frango-catupiry.jpg', preco: 45.93 },
    { id: 4, nome: 'Pizza Marguerita', foto: 'pizza-marguerita.jpg', preco: 32.75 },
    { id: 5, nome: 'Pizza Portuguesa', foto: 'pizza-portuguesa.jpg', preco: 55.99 },
];

let opcoes_select = '';

listaProdutos.forEach(produto => {
    opcoes_select += `
        <option value="${produto.id}">
            ${produto.nome} - ${formataMoeda(produto.preco)}
        </option>
    `;
});

seletor_produto.innerHTML = opcoes_select;

btnAdicionarProduto.addEventListener('click', function() {
    let id_produto = parseInt(seletor_produto.value);
    let quantidade = parseInt(input_quantidade.value);

    const produtoSelecionado = listaProdutos.find(p => p.id === id_produto);

    if (!produtoSelecionado) {
        alert('ID do produto é inválido!');
    }
    else if (quantidade <= 0 || isNaN(quantidade)) {
        alert('Quantidade inválida! Por favor, informe uma quantidade maior ou igual a 1.');
    }
    else {
        produtoSelecionado.quantidade = quantidade;
        adicionarProduto(produtoSelecionado);
        exibirProdutosDoPedido();
    }
});