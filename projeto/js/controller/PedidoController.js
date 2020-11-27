import Pedido from "../model/Pedido.js";

const pedido = JSON.parse(localStorage.getItem('dados_pedido')) ?? new Pedido();

export function adicionarProduto(produto)
{
    let posicaoProduto = pedido.produtos.findIndex(p => p.id === produto.id);

    if (posicaoProduto >= 0) {
        pedido.produtos[posicaoProduto] = produto;
    }
    else {
        pedido.produtos.push(produto);
    }

    localStorage.setItem('dados_pedido', JSON.stringify(pedido));
}

export function getProdutos()
{
    return pedido.produtos;
}

export function getTotal()
{
    return pedido.produtos.reduce((totalPedido, p) => totalPedido + (p.preco * p.quantidade), 0);
}

export function removerProduto(indice)
{
    if (isNaN(indice) || indice < 0 || indice >= pedido.produtos.length) {
        alert('Posição informada é inválida!');
    }
    else {
        pedido.produtos.splice(indice, 1);
        localStorage.setItem('dados_pedido', JSON.stringify(pedido));
    }
}