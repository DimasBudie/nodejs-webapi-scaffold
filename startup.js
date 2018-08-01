const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
setupViewRoutes(app);
setupApiRoutes(app);
startHttpServer(app);

// Setup all routes to serve pages using EJS.
function setupViewRoutes(app) {

  // Parse body request as url encoded.
  app.use(bodyParser.urlencoded({ extended: true }));

  // Set EJS as view engine.
  app.set('view engine', 'ejs');

  // Define "/script" as base path to consume components
  app.use("/scripts", express.static(__dirname + "/node_modules/"));

  // Define "/assets" as base to consume themes
  app.use("/assets", express.static(__dirname + "/views/assets"));

  //--------------------
  app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    maxAge: 3600000 * 24
  }));

  // Authentication and Authorization Middleware
  const auth = function (req, res, next) {
    if (req.session && req.session.user === "admin" && req.session.admin)
      return next();
    else
      res.render('pages/login', { isAuthValid: true });
  };
  //--------------------

  // By default render the index page using EJS folder structure /views/pages/
  app.get('/', (req, res) => { res.render('pages/login', { isAuthValid: true }); });
  app.get('/home', auth, (req, res) => { res.render('pages/home'); });
  app.get('/cliente', auth, (req, res) => { res.render('pages/cliente-lista'); });
  app.get('/cliente-detalhe/:id', auth, (req, res) => { res.render('pages/cliente-detalhe'); });
  app.get('/emprestimo', auth, (req, res) => { res.render('pages/emprestimo-lista'); });
  app.get('/emprestimo-novo', auth, (req, res) => { res.render('pages/emprestimo-novo'); });
  app.get('/emprestimo-simula', auth, (req, res) => { res.render('pages/emprestimo-simula'); });
  app.get('/emprestimo-detalhe/:id', (req, res) => { res.render('pages/emprestimo-detalhe'); });
  app.get('/configuracao', auth, (req, res) => { res.render('pages/configuracao'); });

  app.post('/auth', (req, res, next) => {
    let input = req.body;

    if (!input.username || !input.password) {
      res.render('pages/login', { isAuthValid: false });
    }

    if (input.username === 'admin' || input.password === 'admin') {
      req.session.user = 'admin';
      req.session.admin = true;
      res.send('login success!');
    } else {
      res.render('pages/login', { isAuthValid: false });
    }

  });

}

// Setup all routes to serve api functions.
function setupApiRoutes(app) {

  // Parse body request as json.
  app.use(bodyParser.json());

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

  // Define "/docs" as base to consume api documentation
  app.use("/docs", express.static(__dirname + "/apidoc/"));
  app.get('/api', (req, res) => { res.render('pages/doc'); });

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