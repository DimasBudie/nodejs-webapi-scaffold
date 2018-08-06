const test = require("tape");
const service = require("../service/token.service");

test("generateToken should throw exception if username invalid", (t) => {
    try {
        service.generateToken("");
    } catch (error) {
        t.assert(error, "username is mandatory");
        t.end();
    }
});

test("generateToken should return a valid token if username is valid", (t) => {
    let result = service.generateToken("any-username");
    t.assert(result.accessToken != "", "Token has been generated");
    t.assert(result.expiresIn > 0, "Expiration date set properly");
    t.assert(result.tokenType == "bearer", "Token type properly defined");
    t.end();
});

test("decodeToken should parse a valid token", (t) => {
    let token = service.generateToken("any-username").accessToken;
    let result = service.decodeToken(token);
    t.assert(result.user == "any-username", "Token has been decoded");
    t.end();
});

test("decodeToken should throw exception if token invalid", (t) => {
    try {
        service.decodeToken("")
    } catch (error) {
        t.assert(error, "Token is mandatory");
        t.end();
    }
});