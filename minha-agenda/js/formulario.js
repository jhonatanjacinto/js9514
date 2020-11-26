import { adicionarContato } from "./contatos.js";
import { exibirContatos } from "./tabela.js";

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
        adicionarContato(nome, telefone);
        exibirContatos();
    }
});