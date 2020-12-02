/**
 * Busca as informações de endereço para o CEP informado
 * @param {string} cep CEP a ser consultado nos correios
 * @returns {Promise<Object>}
 */
export async function buscarEndereco(cep)
{
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    const dadosCep = await resposta.json();
    return dadosCep;
}