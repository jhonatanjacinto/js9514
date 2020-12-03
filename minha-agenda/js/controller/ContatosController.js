import Contato from "../model/Contato.js";
import ContatoError from "../model/ContatoError.js";
import * as ContatosService from "../services/ContatosService.js";

let contatos = [];

/**
 * Adiciona um Contato à Agenda
 * @param {string} nome Nome do contato a ser registrado
 * @param {string} telefone Telefone do Contato a ser registrado
 * @returns {void}
 */
export function adicionarContato(nome, telefone) 
{
    if (nome === '') {
        throw new ContatoError('Nome é obrigatório!');
    }
    else if (telefone === '') {
        throw new ContatoError('Telefone é obrigatório!');
    }

    const infoContato = new Contato(nome, telefone);
    let posicaoContato = contatos.findIndex(c => c.nome.toUpperCase() === nome.toUpperCase());

    if (posicaoContato >= 0) {
        contatos[posicaoContato] = infoContato;
    }
    else {
        contatos.push(infoContato);
    }

    // ENVIAR O infoContato para o BACK-END
}

export function removerContato(indice)
{
    if (isNaN(indice) || indice < 0 || indice >= contatos.length) {
        throw new ContatoError('Contato inválido para remoção!');
    }

    contatos.splice(indice, 1);
    // REMOÇÃO da informação no BACK-END
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
