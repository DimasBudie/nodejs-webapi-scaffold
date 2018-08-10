const repo = require('../repository/usuario.repository');

module.exports = {

    getByLogin: async (username, password) => {
        if (!username) {
            throw "username is mandatory"
        }

        if (!password) {
            throw "password is mandatory";
        }

        return await repo.getByLogin(username, password);        
    },

    getByUsername: async (usuario) => {
        if (!usuario) {
            throw "username is mandatory";
        }

        let user = await repo.getByUsername(usuario);
        return user.usuario == usuario ? user : null;
    },

    updatePassword: async (input) => {        
        if (!input.usuario) throw "Usuário é obrigatório";
        if (!input.senhaAntiga) throw "Senha antiga é obrigatória";
        if (!input.novaSenha) throw "Nova é obrigatória";
        if (!input.novaSenhaRepete) throw "Nova é obrigatória";        

        let model = await repo.getByUsername(input.usuario);
        model.senha = input.novaSenha;
        return await repo.update(model);
    },
}