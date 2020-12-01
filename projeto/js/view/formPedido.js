
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


