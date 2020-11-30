export default function Produto(id = 0, nome = '', foto = '', preco = 0, quantidade = 1)
{
    this.id = id;
    this.nome = nome;
    this.foto = foto;
    this.preco = preco;
    this.quantidade = quantidade;
}

Produto.prototype.getSubtotal = function() {
    return this.preco * this.quantidade;
}