import Contato from "../model/Contato.js";

const URL_BASE = 'http://localhost:8008/api/contatos';

/**
 * Envia um contato para ser salvo no servidor
 * @param {Contato} contato Objeto a ser salvo no servidor
 */
export async function salvarContato(contato)
{

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