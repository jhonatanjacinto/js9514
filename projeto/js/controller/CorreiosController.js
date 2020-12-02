import CorreiosError from "../model/CorreiosError.js";
import { buscarEndereco } from "../services/CorreiosService.js";

/**
 * Valida e busca as informações do CEP informado
 * @param {string} cep CEP a ser consultado
 * @returns {Promise<Object>}
 */
export async function getEndereco(cep)
{
    if (isNaN(cep) || cep.length < 8) {
        throw new CorreiosError('CEP inválido!', cep);
    }

    const dadosEndereco = await buscarEndereco(cep);
    if (dadosEndereco.erro) {
        throw new CorreiosError('Informações do CEP não foram encontradas!', cep);
    }

    return dadosEndereco;
}