import Contato from "../model/Contato.js";

const contatos = JSON.parse(localStorage.getItem('dados_contatos')) || [];

/**
 * Adiciona um Contato à Agenda
 * @param {string} nome Nome do contato a ser registrado
 * @param {string} telefone Telefone do Contato a ser registrado
 * @returns {void}
 */
export function adicionarContato(nome, telefone) 
{
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
        alert('Posição informada é inválida!');
        return;
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
