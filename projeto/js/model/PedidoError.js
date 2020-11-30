import Pedido from "./Pedido.js";

export default class PedidoError extends Error {
    /**
     * Construtor da classe PedidoError
     * @param {string} mensagem Mensagem de erro
     * @param {Pedido} pedido Objeto Pedido que gerou o erro
     */
    constructor(mensagem, pedido = null) {
        super(mensagem);
        this.pedido = pedido;
    }

    toString() {
        return this.message;
    }
}