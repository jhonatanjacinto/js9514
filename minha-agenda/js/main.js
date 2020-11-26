const contatos = [];

btnSalvar.addEventListener('click', function() {
    let nome = inputNome.value.trim();
    let telefone = inputTelefone.value.trim();

    if (nome === '') {
        alert('Nome é obrigatório!');
    }
    else if (telefone === '') {
        alert('Telefone é obrigatório!');
    }
    else {
        const infoContato = { nome, telefone };
        let contatoExiste = contatos.some(c => c.nome.toUpperCase() === nome.toUpperCase());

        if (contatoExiste) {
            alert('Contato já existe na sua agenda!');
        }
        else {
            contatos.push(infoContato);
            exibirContatos();
        }
    }
});

function exibirContatos()
{
    let tr = '';
    
    
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