import Produto from "./Produto.js";

export default class ProdutoError extends Error {
    /**
     * Construtor da classe ProdutoError
     * @param {string} mensagem Mensagem de erro
     * @param {Produto} produto Objeto Produto que gerou o erro
     */
    constructor(mensagem, produto = null) {
        super(mensagem);
        this.produto = produto;
    }

    toString() {
        return this.message;
    }
}