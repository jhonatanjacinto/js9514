import * as ContatosController from '../controller/ContatosController.js';
import ContatoError from '../model/ContatoError.js';

const tabelaContatos = document.querySelector('#tabelaContatos');

exibirContatos();
export function exibirContatos()
{
    let tr = '';
    const contatos = ContatosController.getContatos();
    
    contatos.forEach((contato, indice) => {
        tr += `
            <tr>
                <td>${contato.nome}</td>
                <td>${contato.telefone}</td>
                <td>
                    <button data-indice="${indice}" class="btn btn-danger">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    tabelaContatos.innerHTML = tr;
}

tabelaContatos.addEventListener('click', (event) => {
    try {
        if (event.target.innerText.trim().toLowerCase() === 'excluir') {
            let indice = event.target.dataset.indice;
            ContatosController.removerContato(indice);
            exibirContatos();
        }
    }
    catch(e) {
        if (e instanceof ContatoError) {
            alert(e);
        }
        else {
            alert('Um erro inesperado ocorreu ao realizar a remoção do contato. Tente novamente mais tarde.');
            console.error(e);
        }
    }
});