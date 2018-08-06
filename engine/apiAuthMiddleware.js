const tokenService = require("../service/token.service");
const userService = require("../service/user.service");
const result = require("../engine/httpResponseHelper");

let apiAuthMiddleware = (req, res, next) => {
  try {

    // When performing a cross domain request, will recieve
    // a preflighted request first. This is to check if our the app is safe. 

    // Just skip the token outh for [OPTIONS] requests.
    // if(req.method == 'OPTIONS') next();
    
    let token = getRequestToken(req);
    if (!token) {
      result.badRequest(res, "Token not found")
      return;
    }

    // Decode the token in order to validate the content.
    var decoded = tokenService.decodeToken(token);

    // Check if the token is expired.
    if (decoded.exp <= Date.now()) {
      result.badRequest(res, "Token expired");
      return;
    }

    // Check if used inside of the token is valid.
    var dbUser = userService.getByUsername(decoded.user.name);
    if (!dbUser) {
      result.badRequest(res, "Invalid token");
      return;
    }

    // Check the authorization for the given user.
    // if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
    //   next(); // To move to next middleware
    // } else {
    //   result.badRequest(res, "Not authorized");
    //   return;
    // }

    // To move to next middleware
    next();
  } catch (ex) {
    result.internalError(res, "Oops something went wrong", ex);
    return;
  }
}

// Extract the token from the request.
function getRequestToken(req){
  return (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers["authorization"];
}

module.exports = apiAuthMiddleware;