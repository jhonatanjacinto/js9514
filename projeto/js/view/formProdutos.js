import * as PedidoController from '../controller/PedidoController.js';
import * as ProdutosController from '../controller/ProdutosController.js';
import { exibirProdutosDoPedido } from './tabelaProdutosPedido.js';
import { formataMoeda } from '../utils/formataMoeda.js';
import ProdutoError from '../model/ProdutoError.js';
import PedidoError from '../model/PedidoError.js';

const seletor_produto = document.querySelector('#seletor_produto');
const btnAdicionarProduto = document.querySelector('#btnAdicionarProduto');
const input_quantidade = document.querySelector('#input_quantidade');


(async () => {
    let opcoes_select = '';
    const listaProdutos = await ProdutosController.getListaProdutos();

    listaProdutos.forEach(produto => {
        opcoes_select += `
            <option value="${produto.id}">
                ${produto.nome} - ${formataMoeda(produto.preco)}
            </option>
        `;
    });

    seletor_produto.innerHTML = opcoes_select;
})();


btnAdicionarProduto.addEventListener('click', function() {
    try 
    {
        let id_produto = parseInt(seletor_produto.value);
        let quantidade = parseInt(input_quantidade.value);

        const produtoSelecionado = ProdutosController.getProdutoPorId(id_produto);
        produtoSelecionado.quantidade = quantidade;
        PedidoController.adicionarProduto(produtoSelecionado);
        exibirProdutosDoPedido();
    }
    catch(erro) 
    {
        if (erro instanceof ProdutoError || erro instanceof PedidoError) {
            alert(erro);
        }
        else {
            alert('Um erro inesperado ocorreu ao adicionar um produto ao seu pedido. Por favor, contate o administrador!');
            console.error(erro);
        }
    }
});