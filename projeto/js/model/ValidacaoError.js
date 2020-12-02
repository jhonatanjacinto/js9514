export default class ValidacaoError extends Error {
    constructor(mensagem, campo = null) {
        super(mensagem);
        this.campo = campo;
    }

    toString() {
        return this.message;
    }
}