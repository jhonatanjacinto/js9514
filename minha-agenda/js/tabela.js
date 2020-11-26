import * as moduloContatos from './contatos.js';

export function exibirContatos()
{
    let tr = '';
    const contatos = moduloContatos.getContatos();
    
    for (let contato of contatos)
    {
        tr += `
            <tr>
                <td>${contato.nome}</td>
                <td>${contato.telefone}</td>
            </tr>
        `;
    }

    tabelaContatos.innerHTML = tr;
}