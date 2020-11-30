import * as ContatosController from "../controller/ContatosController.js";
import { exibirContatos } from "./tabela.js";

const inputNome = document.querySelector('#inputNome');
const inputTelefone = document.querySelector('#inputTelefone');
const btnSalvar = document.querySelector('#btnSalvar');

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
        ContatosController.adicionarContato(nome, telefone);
        exibirContatos();
    }
});