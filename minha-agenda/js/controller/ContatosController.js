import Contato from "../model/Contato.js";
import ContatoError from "../model/ContatoError.js";
import * as ContatosService from "../services/ContatosService.js";

let contatos = [];

/**
 * Adiciona um Contato à Agenda
 * @param {string} nome Nome do contato a ser registrado
 * @param {string} telefone Telefone do Contato a ser registrado
 * @returns {Promise<void>}
 */
export async function adicionarContato(nome, telefone) 
{
    if (nome === '') {
        throw new ContatoError('Nome é obrigatório!');
    }
    else if (telefone === '') {
        throw new ContatoError('Telefone é obrigatório!');
    }

    const infoContato = new Contato(nome, telefone);
    const status = await ContatosService.salvarContato(infoContato);
    console.log(status);
}

/**
 * Remove um contato na base de dados do servidor
 * @param {number} indice Posição do contato a ser removido
 * @returns {Promise<void>}
 */
export async function removerContato(indice)
{
    const respostaServidor = await ContatosService.removerContato(indice);
    if (respostaServidor.status === 0) {
        throw new ContatoError(respostaServidor.mensagem);
    }
    console.log(respostaServidor);
}

/**
 * Retorna a lista de contatos salva na Agenda
 * @returns {Promise<Array<Contato>>}
 */
export async function getContatos()
{
    // CONSULTAR OS DADOS NO BACK-END
    contatos = await ContatosService.getContatos();
    return contatos;
}
