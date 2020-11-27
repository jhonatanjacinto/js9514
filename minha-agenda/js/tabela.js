import * as moduloContatos from './contatos.js';

const tabelaContatos = document.querySelector('#tabelaContatos');

exibirContatos();
export function exibirContatos()
{
    let tr = '';
    const contatos = moduloContatos.getContatos();
    
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
    if (event.target.innerText.trim().toLowerCase() === 'excluir') {
        let indice = event.target.dataset.indice;
        moduloContatos.removerContato(indice);
        exibirContatos();
    }
});