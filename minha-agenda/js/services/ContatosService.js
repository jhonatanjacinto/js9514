import Contato from "../model/Contato.js";

const URL_BASE = 'http://localhost:8008/api/contatos';

/**
 * Envia um contato para ser salvo no servidor
 * @param {Contato} contato Objeto a ser salvo no servidor
 * @returns {Promise<Object>}
 */
export async function salvarContato(contato)
{
    const parametros = new URLSearchParams();
    parametros.append('contato', JSON.stringify(contato));

    let urlPost = URL_BASE + '?' + parametros;
    const response = await fetch(urlPost, { method: 'POST' });
    const status = await response.json();
    return status;
}

/**
 * Retorna a lista de contatos salva no servidor
 * @returns {Promise<Array<Contato>>}
 */
export async function getContatos()
{
    const response = await fetch(URL_BASE);
    const listaDeContatos = await response.json();
    return listaDeContatos;
}

/**
 * Exclui um item da lista de contatos no servidor
 * @returns {Promise<Object>}
 */
export async function removerContato(posicao)
{
    const parametros = new URLSearchParams();
    parametros.append('posicao', posicao);

    let urlDelete = URL_BASE + '?' + parametros;
    const response = await fetch(urlDelete, { method: 'DELETE' });
    const status = await response.json();
    return status;
}