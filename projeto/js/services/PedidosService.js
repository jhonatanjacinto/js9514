import Pedido from "../model/Pedido.js";

const URL_BASE = 'http://localhost:8008/api/pedidos';

/**
 * Envia os dados do pedido para ser salvo no servidor da aplicação
 * @param {Pedido} pedido Objeto contendo as informações do Pedido a ser salvo no servidor
 * @returns {Promise<Object>}
 */
export async function salvarPedido(pedido)
{
    const parametros = new URLSearchParams();
    parametros.append('pedido', JSON.stringify(pedido));

    let urlPost = URL_BASE + '?' + parametros;
    const resposta = await fetch(urlPost, { method: 'POST' });
    const statusServidor = await resposta.json();
    
    return statusServidor;
}
