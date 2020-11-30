import Produto from "../model/Produto.js";
import ProdutoError from "../model/ProdutoError.js";

const listaProdutos = [
    new Produto(1, 'Pizza de Calabresa', 'pizza-calabresa.jpg', 52.99),
    new Produto(2, 'Pizza 4 Queijos', 'pizza-4-queijos.jpg', 65.82),
    new Produto(3, 'Pizza de Frango Catupiry', 'pizza-frango-catupiry.jpg', 45.93),
    new Produto(4, 'Pizza Marguerita', 'pizza-marguerita.jpg', 32.75),
    new Produto(5, 'Pizza Portuguesa', 'pizza-portuguesa.jpg', 55.99),
];

/**
 * @returns {Array<Produto>}
 */
export function getListaProdutos()
{
    return listaProdutos;
}

/**
 * Retorna um Produto específico por seu ID
 * @param {number} id ID do Produto a ser retornado
 * @returns {Produto}
 */
export function getProdutoPorId(id)
{
    const produto = listaProdutos.find(p => p.id === id);

    if (!produto) {
        throw new ProdutoError('Produto informado não foi encontrado!');
    }

    return produto;
}