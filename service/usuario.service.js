const repository = require('../repository/usuario.repository');

module.exports = {

    /**
     * Find user given the login credentials.
     */
    getByLogin: async (username, password) => {
        if (!username) {
            throw "username is mandatory"
        }

        if (!password) {
            throw "password is mandatory";
        }

        return await repository.findByLogin(username, password);        
    },

    /**
     * Check if informed username exists in database.
     */
    getByUsername: async (usuario) => {
        if (!usuario) {
            throw "username is mandatory";
        }

        let user = await repository.findByUsername(usuario);
        return user.usuario == usuario ? user : null;
    },

}