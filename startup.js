const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
setupViewRender(app);
setupRoutes(app);
startHttpServer(app);

// Setup all dependencies to render pages using EJS.
function setupViewRender(app) {
  // Set EJS as view engine.
  app.set('view engine', 'ejs');

  // Define "/script" as base path to consume components
  app.use("/scripts", express.static(__dirname + "/node_modules/"));

  // Define "/docs" as base to consume api documentation
  app.use("/docs", express.static(__dirname + "/apidoc/"));

  // Define "/assets" as base to consume themes
  app.use("/assets", express.static(__dirname + "/views/assets"));

  // By default render the index page using EJS folder structure /views/pages/
  app.get('/home', function (req, res) { res.render('pages/home'); });
  app.get('/api', function (req, res) { res.render('pages/doc'); });
  app.get('/cliente', function (req, res) { res.render('pages/cliente'); });
  app.get('/cliente-detalhe/:id', function (req, res) { res.render('pages/cliente-detalhe'); });
  app.get('/emprestimo', function (req, res) { res.render('pages/emprestimo'); });
  app.get('/emprestimo-novo/:id', function (req, res) { res.render('pages/emprestimo-novo'); });
  app.get('/emprestimo-simula', function (req, res) { res.render('pages/emprestimo-simula'); });
  app.get('/configuracao', function (req, res) { res.render('pages/configuracao'); });
  app.get('/', function (req, res) { res.render('pages/login'); });
}

// Setup all routes used by the application.
function setupRoutes(app) {
  app.all('/*', (req, res, next) => {
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');

    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  // Auth Middleware - This will check if the token is valid
  // Only the requests that start with /api/v1/* will be checked for the token.
  // Any URL's that do not follow the below pattern should be avoided unless you 
  // are sure that authentication is not needed.
  app.all('/api/v1/*', [require('./engine/authMiddleware')]);

  // The list of routes for the application. 
  app.use('/', require('./controller'));

  // If no route is matched by now, it must be a 404
  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}

// Start the express server.
function startHttpServer(app) {
  app.set('port', process.env.PORT || 3000);
  let server = app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + server.address().port);
  });
}