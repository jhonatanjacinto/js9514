import ValidacaoError from "../model/ValidacaoError.js";

/**
 * Valida se as informações dos campos estão no formato esperado
 * @param {Array<Element>} listaCamposObrigatorios  Array de elementos/campos HTML a serem validados 
 */
export function validarCampos(listaCamposObrigatorios)
{
    const validadorEmail = /^[a-zA-Z0-9_+-]+[a-zA-Z0-9._+-]*[a-zA-Z0-9_+-]+@[a-zA-Z0-9_+-]+[a-zA-Z0-9._+-]*[.]{1,1}[a-zA-Z]{2,}$/;

    for (let campo of listaCamposObrigatorios)
    {
        if (
            campo.value.trim() === '' ||
            campo.type === 'number' && isNaN(campo.value) ||
            campo.type === 'email' && !validadorEmail.test(campo.value)
        ) {
            throw new ValidacaoError(campo.dataset.mensagem, campo);
        }
    }
}