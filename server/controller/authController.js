var jwt = require('jwt-simple');

var authController = {

  login: function (req, res) {

    var username = req.body.username || '';
    var password = req.body.password || '';

    // If the username or password is invalid/not present, we will throw a 401.
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    // Fire a query to DB and check if the credentials are valid.
    var dbUserObj = authController.validate(username, password);

    // If authentication fails send a 401 back.
    if (!dbUserObj) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    // If authentication is success will generate a token
    // and dispatch it to the client.
    if (dbUserObj) {
      res.json(genToken(dbUserObj));
    }

  },

  validate: function (username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'admin',
      role: 'admin',
      username: 'admin@app.com'
    };

    return dbUserObj;
  },

  validateUser: function (username) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'admin',
      role: 'admin',
      username: 'admin@app.com'
    };

    return dbUserObj;
  },
}

// private method
function genToken(user) {
  var expires = expiresIn(1); // Days to expire
  var token = jwt.encode({
    exp: expires,
    user: user
  }, require('../config/secret')());

  return {
    access_token: token,
    expires_in: expires,
    token_type: 'bearer'
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = authController;