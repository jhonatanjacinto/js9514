import Produto from "../model/Produto.js";
import ProdutoError from "../model/ProdutoError.js";
import { getProdutos } from "../services/ProdutosService.js";

let listaProdutos = [];

/**
 * Retorna a lista de produtos salva no servidor
 * @returns {Promise<Array<Produto>>}
 */
export async function getListaProdutos()
{
    const produtosServidor = await getProdutos();
    listaProdutos = produtosServidor.map(p => Object.setPrototypeOf(p, Produto.prototype));
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