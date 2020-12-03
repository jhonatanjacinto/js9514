/**
 * Retorna a lista de Produtos cadastrada no servidor da aplicação
 * @returns {Promise<Array>}
 */
export async function getProdutos()
{
    const resposta = await fetch('http://localhost:8008/api/produtos');
    const listaProdutos = await resposta.json();
    return listaProdutos;
}