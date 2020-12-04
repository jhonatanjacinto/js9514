import Pedido from "../model/Pedido.js";
import Produto from "../model/Produto.js";
import PedidoError from "../model/PedidoError.js";
import { atualizarStatusPedido, getPedidos, getStatusPedido, salvarPedido } from "../services/PedidosService.js";

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
    if (produto.quantidade <= 0  || isNaN(produto.quantidade)) {
        throw new PedidoError('Quantidade do produto informada é inválida. Selecione um valor maior ou igual a 1.');
    }
    
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
        throw new PedidoError('Produto informado para remoção é inválido!');
    }
    else {
        pedido.produtos.splice(indice, 1);
        localStorage.setItem('dados_pedido', JSON.stringify(pedido));
    }
}

/**
 * Envia as informações do pedido para salvamento no back-end
 * @param {Array<Element>} formPedido Array de elementos HTML para coleta das informações do pedido
 * @returns {Promise<string>}
 */
export async function enviarPedido(formPedido)
{
    for (let propriedade in formPedido)
    {
        let propriedade_ref = propriedade.replace(/(input_|seletor_)/g, '');
        pedido[propriedade_ref] = formPedido[propriedade].value;
    }

    if (pedido.produtos.length < 1) 
    {
        throw new PedidoError('Seu pedido precisa pelo menos ter 1 produto adicionado!', pedido);
    }

    // Back-end
    const status = await salvarPedido(pedido);
    console.log(status);

    let codigoPedido = pedido.id;
    localStorage.removeItem('dados_pedido');
    
    // Transfere as propriedades de um objeto para outro
    Object.assign(pedido, new Pedido);

    return codigoPedido;
}

/**
 * Consulta um pedido e retorna o seu status atual
 * @param {string} codigo Código do Pedido a ser consultado no back-end
 * @returns {Promise<Object>}
 */
export async function getStatus(codigo)
{
    if (!codigo) {
        throw new PedidoError('Código do Pedido é obrigatório!');
    }

    const respostaServidor = await getStatusPedido(codigo);

    if (respostaServidor.status === 0) {
        throw new PedidoError(respostaServidor.mensagem);
    }

    return respostaServidor;
}

/**
 * Retorna uma lista de Pedidos registrados no servidor
 * @returns {Promise<Array<Pedido>>}
 */
export async function getListaPedidos()
{
    const listaPedidosServidor = await getPedidos();
    const listaPedidos = listaPedidosServidor.map(pe => Object.setPrototypeOf(pe, Pedido.prototype));
    return listaPedidos;
}

/**
 * Valida as informações de alteração e atualiza o status do pedido no back-end
 * @param {number} statusNovo Status novo do pedido
 * @param {string} codigoPedido Pedido a ser alterado
 * @returns {Promise<Object>}
 */
export async function alterarStatus(statusNovo, codigoPedido)
{
    if (!statusNovo) {
        throw new PedidoError('Status informado é inválido!');
    }

    if (!codigoPedido) {
        throw new PedidoError('Código do Pedido informado é inválido!');
    }

    const respostaServidor = await atualizarStatusPedido(statusNovo, codigoPedido);

    if (respostaServidor.status === 0) {
        throw new PedidoError(respostaServidor.mensagem);
    }

    return respostaServidor;
}