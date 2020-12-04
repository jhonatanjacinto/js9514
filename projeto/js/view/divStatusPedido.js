const divStatus = document.querySelector('#divStatusPedido');

export function exibirStatusPedido(status, mensagem)
{
    let classeCss = (status == 1) ? 'alert-warning' : 'alert-success';

    divStatus.innerHTML = `
        <div class="alert ${classeCss} text-center">
            <span>status do seu pedido é:</span>

            <h4 class="alert-heading display-3">
                ${mensagem}
            </h4>
        </div>
    `;
}