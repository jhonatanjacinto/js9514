import * as ContatosController from "../controller/ContatosController.js";
import ContatoError from "../model/ContatoError.js";
import { exibirContatos } from "./tabela.js";

const inputNome = document.querySelector('#inputNome');
const inputTelefone = document.querySelector('#inputTelefone');
const btnSalvar = document.querySelector('#btnSalvar');

btnSalvar.addEventListener('click', function() {
    try {
        let nome = inputNome.value.trim();
        let telefone = inputTelefone.value.trim();

        ContatosController.adicionarContato(nome, telefone);
        exibirContatos();
    }
    catch(e) {
        if (e instanceof ContatoError) {
            alert(e);
        }
        else {
            alert('Um erro inesperado ocorreu ao adicionar o novo contato. Tente novamente mais tarde!');
            console.error(e);
        }
    }
});