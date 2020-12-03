import http from 'http';
import url from 'url';
import fs from 'fs';

const app = http.createServer((request, response) => {
    const urls_validas = [
        '/api/produtos', // retorna a lista de produtos
        '/api/pedidos', // retorna a lista de pedidos OU envia um pedido para ser salvo no servidor
        '/api/status-pedido' // retorna o status de um pedido específico
    ];

    let urlAcessada = url.parse(request.url).pathname;
    let metodo = request.method; // GET, POST, PUT, DELETE
    const responseConfig = {
        'Content-type' : 'application/json; charset=utf8',
        'Access-Control-Allow-Origin' : '*'
    }

    if (urls_validas.includes(urlAcessada))
    {
        response.writeHead(200, responseConfig);

        if (urlAcessada === '/api/produtos') 
        {
            let listaDeProdutosJson = fs.readFileSync('./db/produtos.json', 'utf-8');
            response.end(listaDeProdutosJson);
        }

        else if (urlAcessada === '/api/pedidos' && metodo === 'GET')
        {
            let listaDePedidosJson = fs.readFileSync('./db/pedidos.json', 'utf-8');
            response.end(listaDePedidosJson);
        }

        else if (urlAcessada === '/api/pedidos' && metodo === 'POST')
        {
            // api/pedidos?pedido=[DADOS EM JSON]
            let jsonDadosPedido = url.parse(request.url, true).query.pedido;
            let listaDePedidosJson = fs.readFileSync('./db/pedidos.json', 'utf-8');
            const listaDePedidos = JSON.parse(listaDePedidosJson);
            const pedido = JSON.parse(jsonDadosPedido);

            listaDePedidos.push(pedido);
            listaDePedidosJson = JSON.stringify(listaDePedidos);

            fs.writeFileSync('./db/pedidos.json', listaDePedidosJson, 'utf-8');
            const resposta = { status: 1, mensagem: 'Pedido salvo com sucesso!' };
            response.end(JSON.stringify(resposta));
        }
    }
    else 
    {
        response.writeHead(400, responseConfig); // Bad Request
        const data = { status: 0, message: 'Bad Request' };
        response.end(JSON.stringify(data));
    }
});

app.listen(8008);
console.log('Servidor da api está rodando na url http://localhost:8008/');