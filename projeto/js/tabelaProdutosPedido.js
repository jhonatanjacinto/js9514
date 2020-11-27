import * as moduloPedido from "./pedido.js";
import { formataMoeda } from "./utils/formataMoeda.js";

const tdTotalPedido = document.querySelector('#tdTotalPedido');
const tbodyProdutos = document.querySelector('#tbodyProdutos');

exibirProdutosDoPedido();
export function exibirProdutosDoPedido()
{
    let tr = '';
    const produtos = moduloPedido.getProdutos();
    produtos.forEach((p, indice) => {
        tr += `
            <tr>
                <td width="10%">
                    <img src="imagens/pizzas/${p.foto}" width="100%" />
                </td>
                <td>
                    ${p.nome} <br>
                    <button data-indice="${indice}" class="btn btn-danger btn-sm">
                        Remover
                    </button>
                </td>
                <td>${p.quantidade}</td>
                <td>${formataMoeda(p.preco)}</td>
                <td>${formataMoeda(p.preco * p.quantidade)}</td>
            </tr>
        `;
    });

    let total = moduloPedido.getTotal();
    tdTotalPedido.innerHTML = formataMoeda(total);
    tbodyProdutos.innerHTML = tr;
}

tbodyProdutos.addEventListener('click', (event) => {
    if (event.target.innerText.trim().toLowerCase() === 'remover') {
        let indice = event.target.dataset.indice;
        moduloPedido.removerProduto(indice);
        exibirProdutosDoPedido();
    }
});