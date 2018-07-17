const test = require("tape");
const tokenService = require("../app/service/tokenService");

test("when username invalid then throw exception", (t) => {
    try {
        tokenService.generateToken("");
    } catch (error) {
        t.assert(error, "username is mandatory");
        t.end();
    }
});

test("when username valid then generate token", (t) => {
    let result = tokenService.generateToken("any-username");
    t.assert(result.accessToken != "", "Token has been generated");
    t.assert(result.expiresIn > 0, "Expiration date set properly");
    t.assert(result.tokenType == "bearer", "Token type properly defined");
    t.end();
});

test("when token valid to decode then decode it", (t) => {
    let token = tokenService.generateToken("any-username").accessToken;
    let result = tokenService.decodeToken(token);
    t.assert(result.user == "any-username", "Token has been decoded");
    t.end();
});

test("when token invalid to decode then throw exception", (t) => {
    try {
        tokenService.decodeToken("")
    } catch (error) {
        t.assert(error, "Token is mandatory");
        t.end();
    }
});