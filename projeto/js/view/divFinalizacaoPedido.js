const divFinalizacao = document.querySelector('#divFinalizacaoPedido');

export function exibirCodigoPedido(codigoPedido)
{
    divFinalizacao.innerHTML = `
        <div class="alert alert-success text-center">
            <span>código do pedido:</span>

            <h4 class="alert-heading display-3">
                ${codigoPedido}
            </h4>
            
            <hr>

            Seu pedido foi enviado com sucesso.
        </div>
    `;
}