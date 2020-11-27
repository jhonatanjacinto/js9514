import * as PedidoController from "../controller/PedidoController.js";
import { formataMoeda } from "../utils/formataMoeda.js";

const tdTotalPedido = document.querySelector('#tdTotalPedido');
const tbodyProdutos = document.querySelector('#tbodyProdutos');

exibirProdutosDoPedido();
export function exibirProdutosDoPedido()
{
    let tr = '';
    const produtos = PedidoController.getProdutos();
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

    let total = PedidoController.getTotal();
    tdTotalPedido.innerHTML = formataMoeda(total);
    tbodyProdutos.innerHTML = tr;
}

tbodyProdutos.addEventListener('click', ({ target: { innerText, dataset: { indice } } }) => {
    if (innerText.trim().toLowerCase() === 'remover') {
        PedidoController.removerProduto(indice);
        exibirProdutosDoPedido();
    }
});