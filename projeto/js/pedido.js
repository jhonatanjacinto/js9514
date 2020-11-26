const pedido = {
    produtos: []
}

export function adicionarProduto(produto)
{
    if (!pedido.produtos.includes(produto)) {
        pedido.produtos.push(produto);
    }
}

export function getProdutos()
{
    return pedido.produtos;
}

export function getTotal()
{
    return pedido.produtos.reduce((totalPedido, p) => totalPedido + (p.preco * p.quantidade), 0);
}