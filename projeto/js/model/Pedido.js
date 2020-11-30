export default class Pedido { 
    constructor() {
        this.nomeCompleto = null;
        this.email = null;
        this.telefone = null;
        this.cep = null;
        this.endereco = null;
        this.bairro = null;
        this.cidade = null;
        this.estado = null;
        this.numero = 0;
        this.complemento = null;
        this.observacoes = null;
        this.produtos = [];
        this.status = 1; // 1 = EM ANDAMENTO | 2 = FINALIZADO
    }

    getTotal() {
        return this.produtos.reduce((total, p) => total + (p.preco * p.quantidade), 0);
    }
}