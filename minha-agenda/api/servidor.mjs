import http from 'http';
import url from 'url';
import fs from 'fs';

const app = http.createServer((request, response) => {
    const urls_validas = [
        '/api/contatos'
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

        if (metodo === 'GET') 
        {
            // retorna a lista de contatos
            let listaContatosJson = fs.readFileSync('./db/contatos.json', 'utf-8');
            response.end(listaContatosJson);
        }

        else if (metodo === 'POST')
        {
            // grava um novo contato no arquivo json
            // api/contatos?contato=[OBJETO JSON]
            let listaContatosJson = fs.readFileSync('./db/contatos.json', 'utf-8');
            let jsonContato = url.parse(request.url, true).query.contato;

            const listaContatos = JSON.parse(listaContatosJson);
            const contato = JSON.parse(jsonContato);

            listaContatos.push(contato);

            listaContatosJson = JSON.stringify(listaContatos);
            fs.writeFileSync('./db/contatos.json', listaContatosJson, 'utf-8');

            const resposta = { status: 1, mensagem: 'Contato salvo com sucesso!' };
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