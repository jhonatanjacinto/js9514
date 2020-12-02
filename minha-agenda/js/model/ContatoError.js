export default class ContatoError extends Error {
    constructor(mensagem, contato = null) {
        super(mensagem);
        this.contato = contato;
    }

    toString() {
        return this.message;
    }
}