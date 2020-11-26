const moduloContatos = (function() {

    const contatos = [];

    function adicionarContato(nome, telefone) 
    {
        const infoContato = { nome, telefone };
        let contatoExiste = contatos.some(c => c.nome.toUpperCase() === nome.toUpperCase());

        if (contatoExiste) {
            alert('Contato já existe na sua agenda!');
        }
        else {
            contatos.push(infoContato);
        }
    }

    function getContatos()
    {
        return contatos;
    }

    return {
        adicionarContato,
        getContatos
    }

})();
