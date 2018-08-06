const jwt = require("jwt-simple");
const secretKey = require("../engine/authSecretKey")();

let tokenService = {
    // Generates a new token hash based on user data informed.
    generateToken: (username) => {
        if (!username) {
            throw "username is mandatory";
        }

        let expires = tokenService.expiresIn(1); // Days to expire
        let token = jwt.encode({
            exp: expires,
            user: username
        }, secretKey);

        return {
            accessToken: token,
            expiresIn: expires,
            tokenType: "bearer"
        };
    },

    // Set expiration days given the input informed.
    expiresIn: (numDays) => {
        let dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    },

    // Decode a token.
    decodeToken: (token) => {
        if (!token) {
            throw "Token is mandatory";
        }

        return jwt.decode(token, secretKey);
    }

}
module.exports = tokenService;