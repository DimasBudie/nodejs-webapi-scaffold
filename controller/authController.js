const result = require("../engine/httpResponseHelper");
const tokenService = require("../service/tokenService");
const userService = require("../service/userService");

let authController = {

  login: (req, res) => {
    try {

      let username = req.body.username || "";
      let password = req.body.password || "";

      let dbUser = userService.getByLogin(username, password);

      // If authentication is success will generate a token
      // and dispatch it to the client.
      if (dbUser) {
        result.data(res, tokenService.generateToken(dbUser));
      }

    } catch (ex) {
      result.badRequest(res, ex.message);
      return;
    }
  },

}
module.exports = authController;