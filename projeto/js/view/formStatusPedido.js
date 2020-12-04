import { getStatus } from "../controller/PedidoController.js";
import { default as PedidoError } from "../model/PedidoError.js";
import { exibirStatusPedido } from "./divStatusPedido.js";

const btnVerificar = document.querySelector('#btnVerificarStatus');
const inputCodigo = document.querySelector('#input_codigo');

btnVerificar.addEventListener('click', async () => {
    try 
    {
        let codigo = inputCodigo.value.trim();
        const respostaServidor = await getStatus(codigo);
        console.log(respostaServidor);
        exibirStatusPedido(respostaServidor.statusPedido, respostaServidor.mensagem)
    }
    catch(e) 
    {
        if (e instanceof PedidoError) {
            alert(e);
        }
        else {
            alert('Erro ao consultar o status do pedido no servidor!');
            console.error(e);
        }
    }
});