let userService = {
    // Gets an user given his username and password.
    getByLogin: (username, password) => {
        if (!username) {
            throw "username is mandatory"
        }

        if (!password) {
            throw "password is mandatory";
        }

        // spoofing a userobject from the DB. 
        let dbUser = getDbUser();

        if (dbUser.name == username) {
            return dbUser;
        } else {
            throw "Invalid credentials";
        }
    },

    // Check if informed username exists in database.
    getByUsername: (username) => {
        let dbUser = getDbUser();
        return dbUser.name == username ? dbUser : null;
    },

}

function getDbUser() {
    return {
        name: 'admin',
        role: 'admin',
        username: 'admin@app.com'
    };
}

module.exports = userService;