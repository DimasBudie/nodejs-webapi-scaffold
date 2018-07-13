let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');
let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

// Enable Cross Origin resource sharing.
app.all('/*', (req, res, next) => {
  // Set custom headers for CORS
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./engine/authMiddleware')]);

// The list of routes for the application. 
app.use('/', require('./controller'));

// If no route is matched by now, it must be a 404
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Start the server
app.set('port', process.env.PORT || 3000);
let server = app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + server.address().port);
});