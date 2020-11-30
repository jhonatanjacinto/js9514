import * as PedidoController from '../controller/PedidoController.js';
import { exibirProdutosDoPedido } from './tabelaProdutosPedido.js';
import { formataMoeda } from '../utils/formataMoeda.js';
import Produto from '../model/Produto.js';

const seletor_produto = document.querySelector('#seletor_produto');
const btnAdicionarProduto = document.querySelector('#btnAdicionarProduto');
const input_quantidade = document.querySelector('#input_quantidade');

const listaProdutos = [
    new Produto(1, 'Pizza de Calabresa', 'pizza-calabresa.jpg', 52.99),
    new Produto(2, 'Pizza 4 Queijos', 'pizza-4-queijos.jpg', 65.82),
    new Produto(3, 'Pizza de Frango Catupiry', 'pizza-frango-catupiry.jpg', 45.93),
    new Produto(4, 'Pizza Marguerita', 'pizza-marguerita.jpg', 32.75),
    new Produto(5, 'Pizza Portuguesa', 'pizza-portuguesa.jpg', 55.99),
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
        PedidoController.adicionarProduto(produtoSelecionado);
        exibirProdutosDoPedido();
    }
});