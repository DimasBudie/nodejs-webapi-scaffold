let jwt = require('jwt-simple');
let secretKey = require('../engine/authSecretKey')();
let httpResponse = require('../engine/httpResponseHelper');

let authController = {

  login: function (req, res) {

    let username = req.body.username || "",
      password = req.body.password || "";

    // If the username or password is invalid/not present, we will throw a 401.
    if (username == "") {
      httpResponse.badRequest(res, "Field username is mandatory.");
      return;
    }

    if (password == "") {
      httpResponse.badRequest(res, "Field password is mandatory.");
      return;
    }

    // Fire a query to DB and check if the credentials are valid.
    let dbUser = authController.validateUser(username);

    // If authentication fails send a 401 back.
    if (!dbUser) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    // If authentication is success will generate a token
    // and dispatch it to the client.
    if (dbUser) {
      res.json(genToken(dbUser));
    }

  },

  validateUser: function (username) {

    // spoofing a userobject from the DB. 
    let dbUser = {
      name: 'admin',
      role: 'admin',
      username: 'admin@app.com'
    };

    return dbUser.name == username ? dbUser : null;
  },
}

function genToken(user) {
  let expires = expiresIn(1); // Days to expire
  let token = jwt.encode({
    exp: expires,
    user: user
  }, secretKey);

  return {
    access_token: token,
    expires_in: expires,
    token_type: 'bearer'
  };
}

function expiresIn(numDays) {
  let dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = authController;