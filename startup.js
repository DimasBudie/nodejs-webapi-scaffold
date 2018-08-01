const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
configPage(app);
configApi(app);
startServer(app);

// Configura todas as rodas de paginas.
function configPage(app) {

  // Parser para serializar formulários.
  app.use(bodyParser.urlencoded({ extended: true }));

  // Configura o EJS como view padrão.
  app.set('view engine', 'ejs');
  
  // Configura o path "/script" como base para os pacotes npm.
  app.use("/scripts", express.static(__dirname + "/node_modules/"));
  
  // Configura o path "/assets" como base para resolver css.
  app.use("/assets", express.static(__dirname + "/views/assets"));

  // Configuração do session-express usado para autenticação das páginas.
  app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    maxAge: 3600000 * 24  // Sessão de login expira em 24h
  }));
  
  // Adiciona as controlers de pagina ao pipeline.
  app.use('/', require('./controller-page'));
}

// Configuração das rotas de api.
function configApi(app) {
  
  // Parser utilziado nos requests.
  app.use(bodyParser.json());

  // Configura os header e CORS.
  app.all('/*', (req, res, next) => {    
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');

    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  // Middleware responsavel por validar o token recebido no request
  // somente rotas iniciadas em '/api/v1/*' serão verificadas com token.
  // Qualquer URL que não segue essa rota estará aberta para acesso.
  app.all('/api/v1/*', [require('./engine/apiAuthMiddleware')]);
  
  // Configura '/docs' como base para retornar a documentação da api gerada com apidoc.
  app.use("/docs", express.static(__dirname + "/apidoc/"));
  app.get('/api', (req, res) => { res.render('pages/doc'); });

  // Adiciona as controlers de api ao pipeline.
  app.use('/', require('./controller-api'));

  // Se a rota requisitada não resolver retorna 404
  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}

// Inicia o servidor
function startServer(app) {
  app.set('port', process.env.PORT || 3000);
  let server = app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + server.address().port);
  });
}