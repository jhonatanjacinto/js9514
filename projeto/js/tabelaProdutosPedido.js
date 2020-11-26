const moduloTabela = (function() {

    function exibirProdutosDoPedido()
    {
        let tr = '';
        const produtos = moduloPedido.getProdutos();
        produtos.forEach(p => {
            tr += `
                <tr>
                    <td width="10%">
                        <img src="imagens/pizzas/${p.foto}" width="100%" />
                    </td>
                    <td>${p.nome}</td>
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

    return {
        exibirProdutosDoPedido
    }

})();