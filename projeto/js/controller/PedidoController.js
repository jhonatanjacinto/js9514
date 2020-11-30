import Pedido from "../model/Pedido.js";
import Produto from "../model/Produto.js";

/** @type {Pedido} */
const pedido = JSON.parse(localStorage.getItem('dados_pedido')) ?? new Pedido();
Object.setPrototypeOf(pedido, Pedido.prototype);

/**
 * Função que adiciona um produto ao pedido do cliente
 * @param {Produto} produto Produto a ser adicionado no Pedido
 * @returns {void}
 */
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

/**
 * Retorna a lista de produtos contida no Pedido do cliente
 * @returns {Array<Produto>}
 */
export function getProdutos()
{
    return pedido.produtos.map(p => Object.setPrototypeOf(p, Produto.prototype));
}

/**
 * Retorna o total calculado do Pedido
 * @returns {number}
 */
export function getTotal()
{
    return pedido.getTotal();
}

/**
 * Exclui um produto da lista contida no Pedido do cliente
 * @param {number} indice Indice a ser removido do array de produtos
 * @returns {void}
 */
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