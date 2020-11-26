(function() {

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
            moduloContatos.adicionarContato(nome, telefone);
            moduloTabela.exibirContatos();
        }
    });

})();