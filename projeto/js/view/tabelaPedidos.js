import * as PedidoController from '../controller/PedidoController.js';
import PedidoError from '../model/PedidoError.js';
import { formataMoeda } from '../utils/formataMoeda.js';

const tbodyPedidos = document.querySelector('#tbodyPedidos');

exibirPedidos();
export async function exibirPedidos()
{
    const listaDePedidos = await PedidoController.getListaPedidos();
    let tr = '';

    for (let pedido of listaDePedidos)
    {
        tr += `
            <tr>
                <td>${pedido.id}</td>
                <td>${pedido.nomeCompleto}</td>
                <td>${pedido.telefone}</td>
                <td>${formataMoeda(pedido.getTotal())}</td>
                <td>
                    <select data-codigo="${ pedido.id }" class="form-control custom-select">
                        <option value="1" ${ pedido.status == 1 && 'selected' }>EM ANDAMENTO</option>
                        <option value="2" ${ pedido.status == 2 && 'selected' }>FINALIZADO</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-danger">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    }

    tbodyPedidos.innerHTML = tr;
}

/**
 * Adiciona um evento change na tabela e monitora especificamente os <select>
 */
tbodyPedidos.addEventListener('change', async (event) => {
    try 
    {
        if (event.target.tagName === 'SELECT')
        {
            let statusNovo = parseInt(event.target.value);
            let codigoPedido = event.target.dataset.codigo;
            event.target.disabled = true;
            event.target.innerHTML = "<option>Aguarde...</option>";
            const statusServidor = await PedidoController.alterarStatus(statusNovo, codigoPedido);
            console.log(statusServidor);
            await exibirPedidos();
        }
    }
    catch(e) {
        if (e instanceof PedidoError) {
            alert(e);
        }
        else {
            console.error(e);
            alert('Erro ao alterar status do pedido no servidor!');
        }
    }   
});