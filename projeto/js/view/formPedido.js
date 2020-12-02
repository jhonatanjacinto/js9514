import * as CorreiosController from '../controller/CorreiosController.js';
import * as ValidacaoController from '../controller/ValidacaoController.js';
import * as PedidoController from '../controller/PedidoController.js';
import CorreiosError from '../model/CorreiosError.js';
import ValidacaoError from '../model/ValidacaoError.js';

// guardar as referências da interface HTML
const btnEnviarPedido = document.querySelector('#btnEnviarPedido');
const todosOsCampos = document.querySelectorAll('#formPedido .form-control');
const camposObrigatorios = Array.from(todosOsCampos).filter(campo => campo.required == true);
const formPedido = {};

// montamos um objeto que guarda todos os campos em propriedades
// que terão o mesmo nome do ID do campo
todosOsCampos.forEach(campo => {
    formPedido[campo.id] = campo;
});

/**
 * Quando o usuário digitar algo no campo CEP, buscamos as informações 
 * relacionadas no viacep.com.br
 */
formPedido.input_cep.addEventListener('change', async () => {
    try 
    {
        let cep = formPedido.input_cep.value;
        const infoEndereco = await CorreiosController.getEndereco(cep);

        formPedido.input_endereco.value = infoEndereco.logradouro;
        formPedido.input_bairro.value = infoEndereco.bairro;
        formPedido.input_cidade.value = infoEndereco.localidade;
        formPedido.seletor_estado.value = infoEndereco.uf;
    }
    catch(e) 
    {
        if (e instanceof CorreiosError) {
            alert(e);
        }
        else {
            alert('Erro inesperado ao buscar informações do CEP!');
            console.error(e);
        }
    }
    finally 
    {
        Array.from(todosOsCampos).filter(campo => campo.disabled).forEach(campo => campo.disabled = false);
    }
});

/**
 * Quando o usuário clicar no botão de envio do pedido, pegamos as informações e validamos
 * antes de realizar o envio para o back-end da aplicação
 */
btnEnviarPedido.addEventListener('click', () => {
    try 
    {
        ValidacaoController.validarCampos(camposObrigatorios);
        PedidoController.enviarPedido(formPedido);
    }
    catch(e)
    {
        if (e instanceof ValidacaoError) {
            alert(e);
            e.campo.focus();
        }
        else {
            alert('Erro inesperado ao enviar informações do pedido. Tente novamente!');
            console.error(e);
        }
    }
});
