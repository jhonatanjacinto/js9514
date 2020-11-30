export default class Produto {
    constructor(id = 0, nome = '', foto = '', preco = 0, quantidade = 1) {
        this.id = id;
        this.nome = nome;
        this.foto = foto;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    getSubtotal() {
        return this.preco * this.quantidade;
    }
}