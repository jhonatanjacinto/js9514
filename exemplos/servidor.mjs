import http from 'http';
import url from 'url';

const app = http.createServer(function(request, response) {
    const urls_validas = {
        "/" : getPaginaHome,
        "/resultado" : getPaginaResultado
    };

    let url_acessada = url.parse(request.url).pathname;

    if (urls_validas[url_acessada]) {
        response.writeHead(200, {
            'Content-type' : 'text/html; charset=UTF-8'
        });
        
        const funcaoPagina = urls_validas[url_acessada];
        response.end(funcaoPagina(request));
    }

    // página 404
    else {
        response.writeHead(404, {
            'Content-type' : 'text/html; charset=UTF-8'
        });
        response.end(getPagina404());
    }
});

function getPaginaResultado(request)
{
    let resultado = '';
    let numero = parseInt(url.parse(request.url, true).query.numero);

    if (!numero) {
        resultado = 'Número informado é inválido!';
    }
    else 
    {
        for (let m = 1; m <= 10; m++)
        {
            resultado += `${numero} x ${m} = ${m * numero} <br>`;
        }
    }

    return `
    <div style="padding: 50px;">
        <h1>Resultado da Tabuada</h1>
        ${resultado}
        <hr>
        <a href="/">Voltar para a Home</a>
    </div>
    `;
}

function getPaginaHome()
{
    return `
        <div style="padding: 50px;">
            <h1>Tabuada</h1>
            <p>
                Informe um número no formulário abaixo para ver a tabuada correspondente:
            </p>
            
            <form method="GET" action="/resultado">
                Número: <br>
                <input type="number" name="numero" min="1" value="" />
                <button>
                    Ver Resultado
                </button>
            </form>
        </div>
    `;
}

function getPagina404()
{
    return `
        <div style="padding: 50px; text-align:center;">
            <h1>404 - Página não encontrada</h1>
            <p>
                O recurso que está procurando não existe ou
                não está mais disponível. :/

                <br><br>

                <a href="/">Voltar para a Home</a>
            </p>
        </div>
    `;
}

app.listen(8008);
console.log('Servidor node rodando na URL http://localhost:8008/');
