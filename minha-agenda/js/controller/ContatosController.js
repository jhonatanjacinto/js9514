import Contato from "../model/Contato.js";
import ContatoError from "../model/ContatoError.js";

const contatos = JSON.parse(localStorage.getItem('dados_contatos')) || [];

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

    localStorage.setItem('dados_contatos', JSON.stringify(contatos));
}

export function removerContato(indice)
{
    if (isNaN(indice) || indice < 0 || indice >= contatos.length) {
        throw new ContatoError('Contato inválido para remoção!');
    }

    contatos.splice(indice, 1);
    localStorage.setItem('dados_contatos', JSON.stringify(contatos));
}

/**
 * Retorna a lista de contatos salva na Agenda
 * @returns {Array<Contato>}
 */
export function getContatos()
{
    return contatos;
}
