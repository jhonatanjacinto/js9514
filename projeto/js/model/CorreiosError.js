export default class CorreiosError extends Error {
    constructor(mensagem, cep = null) {
        super(mensagem);
        this.cep = cep;
    }

    toString() {
        return this.message;
    }
}