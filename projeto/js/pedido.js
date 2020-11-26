const moduloPedido = (function() {

    const pedido = {
        produtos: []
    }

    function adicionarProduto(produto)
    {
        if (!pedido.produtos.includes(produto)) {
            pedido.produtos.push(produto);
        }
    }

    function getProdutos()
    {
        return pedido.produtos;
    }

    function getTotal()
    {
        return pedido.produtos.reduce((totalPedido, p) => totalPedido + (p.preco * p.quantidade), 0);
    }

    return {
        pedido,
        adicionarProduto,
        getProdutos,
        getTotal
    }

})();
